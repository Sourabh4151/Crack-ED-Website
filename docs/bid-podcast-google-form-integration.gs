/**
 * Badhta India Dekho guest form → Crack-ED PostgreSQL
 *
 * Bound script for the Google Sheet "BID LEAD FORM QS (Responses)".
 * An installable form-submit trigger forwards each new response to:
 *   POST /api/webhooks/bid-podcast/google-form/
 *
 * This script only reads the response row. It does not edit, sort, or delete
 * sheet cells.
 *
 * Sheet headers come from the linked form "Badhta India Dekho | Guest Onboarding Form":
 *   Timestamp
 *   Email Address                         (only if the form collects email)
 *   What is your current designation?
 *   Which best describes your business?
 *   Why would you like to feature on Badhta India Dekho?
 *   Are you comfortable with this being a paid podcast guest opportunity?
 *   Are you available to travel to Gurugram for the podcast recording?
 *   What is your company or startup name?
 *
 * The script sends whatever headers are actually on row 1 of the response
 * sheet, and also the mapped fields above when those headers are present.
 *
 * ---------------------------------------------------------------------------
 * Install the trigger
 * ---------------------------------------------------------------------------
 * 1. Open the response spreadsheet "BID LEAD FORM QS (Responses)".
 * 2. Extensions → Apps Script. Confirm the project uses the V8 runtime.
 * 3. Replace the default Code.gs contents with this file. Save.
 * 4. Project Settings (gear) → Script properties → Add script property:
 *      BID_PODCAST_WEBHOOK_URL
 *        https://api.crack-ed.com/api/webhooks/bid-podcast/google-form/
 *        Use http://127.0.0.1:8000/api/webhooks/bid-podcast/google-form/
 *        only for a local Django server that Apps Script can reach.
 *      BID_PODCAST_WEBHOOK_SECRET
 *        The same value as Django's BID_PODCAST_WEBHOOK_SECRET.
 *        Do not paste the secret into this source file.
 * 5. Select the function installBidPodcastFormTrigger in the toolbar and Run.
 *    Approve the requested permissions (read this spreadsheet, call an
 *    external URL).
 * 6. Triggers (clock icon) → confirm one trigger:
 *      Function: onBidPodcastFormSubmit
 *      Event source: From spreadsheet
 *      Event type: On form submit
 * 7. Submit one test response on the Google Form. The new row must remain in
 *    this sheet, and the same response must appear in Django admin under
 *    BID podcast guest submissions.
 * 8. Executions shows failures. A non-2xx response is logged there and the
 *    sheet row is left unchanged. 5xx and network errors are rethrown so
 *    Google can retry the trigger. Retries reuse the same submission id.
 *
 * Do not add a simple trigger named onFormSubmit. UrlFetchApp requires this
 * installable trigger.
 */

var BID_HEADERS = {
  TIMESTAMP: 'Timestamp',
  EMAIL: 'Email Address',
  DESIGNATION: 'What is your current designation?',
  BUSINESS: 'Which best describes your business?',
  REASON: 'Why would you like to feature on Badhta India Dekho?',
  PAID: 'Are you comfortable with this being a paid podcast guest opportunity?',
  TRAVEL: 'Are you available to travel to Gurugram for the podcast recording?',
  COMPANY: 'What is your company or startup name?'
};

/**
 * Creates the installable form-submit trigger for this spreadsheet.
 * Replaces only a previous trigger for onBidPodcastFormSubmit.
 * Does not change sheet data or other triggers.
 */
function installBidPodcastFormTrigger() {
  var spreadsheet = SpreadsheetApp.getActive();
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'onBidPodcastFormSubmit') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  ScriptApp.newTrigger('onBidPodcastFormSubmit')
    .forSpreadsheet(spreadsheet)
    .onFormSubmit()
    .create();
  console.log('Installed onBidPodcastFormSubmit for spreadsheet ' + spreadsheet.getId());
}

/**
 * Installable spreadsheet form-submit handler.
 * @param {GoogleAppsScript.Events.SheetsOnFormSubmit} e
 */
function onBidPodcastFormSubmit(e) {
  if (!e || !e.range) {
    console.error('BID podcast trigger called without a form-submit event. Run it from a form submission, not the editor.');
    return;
  }

  var properties = PropertiesService.getScriptProperties();
  var webhookUrl = (properties.getProperty('BID_PODCAST_WEBHOOK_URL') || '').trim();
  var secret = (properties.getProperty('BID_PODCAST_WEBHOOK_SECRET') || '').trim();
  if (!webhookUrl || !secret) {
    throw new Error('Set script properties BID_PODCAST_WEBHOOK_URL and BID_PODCAST_WEBHOOK_SECRET.');
  }

  var sheet = e.range.getSheet();
  var raw = readSubmittedRow(sheet, e.range);
  var spreadsheetId = e.range.getSheet().getParent().getId();
  var submissionId = sha256Hex(canonicalSubmission(spreadsheetId, raw));
  var submittedAt = raw[BID_HEADERS.TIMESTAMP] || '';
  if (!submittedAt) {
    throw new Error('Submitted row has no Timestamp value.');
  }

  var body = {
    submission_id: submissionId,
    submitted_at: submittedAt,
    respondent_email: raw[BID_HEADERS.EMAIL] || raw.Email || '',
    designation: raw[BID_HEADERS.DESIGNATION] || '',
    business_type: raw[BID_HEADERS.BUSINESS] || '',
    feature_reason: raw[BID_HEADERS.REASON] || '',
    paid_opportunity: raw[BID_HEADERS.PAID] || '',
    gurugram_travel: raw[BID_HEADERS.TRAVEL] || '',
    company_name: raw[BID_HEADERS.COMPANY] || '',
    raw_response: raw
  };

  var response;
  try {
    response = UrlFetchApp.fetch(webhookUrl, {
      method: 'post',
      contentType: 'application/json',
      headers: {
        'X-BID-Webhook-Secret': secret
      },
      payload: JSON.stringify(body),
      muteHttpExceptions: true,
      followRedirects: false
    });
  } catch (err) {
    console.error('BID podcast webhook request failed: ' + err.message);
    throw err;
  }

  var code = response.getResponseCode();
  if (code >= 200 && code < 300) {
    console.log('BID podcast webhook accepted submission ' + submissionId + ' status ' + code);
    return;
  }

  var responseText = response.getContentText() || '';
  console.error('BID podcast webhook failed status=' + code + ' body=' + responseText.substring(0, 500));
  if (code >= 500) {
    throw new Error('BID podcast webhook returned ' + code);
  }
}

/**
 * Reads header row 1 and the submitted row. Does not write to the sheet.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet
 * @param {GoogleAppsScript.Spreadsheet.Range} submittedRange
 * @return {Object<string, string>}
 */
function readSubmittedRow(sheet, submittedRange) {
  var lastColumn = Math.max(sheet.getLastColumn(), submittedRange.getLastColumn());
  var headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  var values = submittedRange.getValues()[0];
  var startColumn = submittedRange.getColumn();
  var raw = {};
  for (var i = 0; i < values.length; i++) {
    var header = String(headers[startColumn - 1 + i] || '').trim();
    if (!header) {
      continue;
    }
    raw[header] = cellToString(values[i]);
  }
  return raw;
}

/**
 * @param {*} value
 * @return {string}
 */
function cellToString(value) {
  if (value === null || value === undefined || value === '') {
    return '';
  }
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime())) {
    return value.toISOString();
  }
  return String(value).trim();
}

/**
 * Stable input for the submission id. Same row always hashes the same way.
 * @param {string} spreadsheetId
 * @param {Object<string, string>} raw
 * @return {string}
 */
function canonicalSubmission(spreadsheetId, raw) {
  var keys = Object.keys(raw).sort();
  var lines = [spreadsheetId];
  for (var i = 0; i < keys.length; i++) {
    lines.push(keys[i] + '\t' + raw[keys[i]]);
  }
  return lines.join('\n');
}

/**
 * @param {string} text
 * @return {string} lowercase hex SHA-256
 */
function sha256Hex(text) {
  var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, text, Utilities.Charset.UTF_8);
  var hex = [];
  for (var i = 0; i < bytes.length; i++) {
    var value = bytes[i];
    if (value < 0) {
      value += 256;
    }
    var pair = value.toString(16);
    hex.push(pair.length === 1 ? '0' + pair : pair);
  }
  return hex.join('');
}
