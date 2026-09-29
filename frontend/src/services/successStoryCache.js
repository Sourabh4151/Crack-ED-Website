/**
 * Last published homepage success stories, kept in the browser.
 * If the backend is down on a later visit, these cards still render.
 */
import { getApiBase } from './crmService'

const DB_NAME = 'crack-ed-success-stories'
const STORE = 'snapshot'
const KEY = 'latest'

function openDb () {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB unavailable'))
      return
    }
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) {
        request.result.createObjectStore(STORE)
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

function requestResult (request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function fetchImageBlob (row) {
  const base = getApiBase()
  const urls = [
    row.photo_url,
    base && row.id != null ? `${base}/api/success-stories/${row.id}/photo/` : '',
  ].filter(Boolean)

  for (const url of urls) {
    try {
      const response = await fetch(url)
      if (!response.ok) continue
      const blob = await response.blob()
      if (blob.size > 0) return blob
    } catch {
      // Try the next URL. A media host without CORS still has the API photo route.
    }
  }
  return null
}

export function mapSuccessStories (rows) {
  if (!Array.isArray(rows)) return []
  return rows
    .filter((row) => row && row.photo_url && row.name)
    .map((row) => ({
      id: row.id,
      image: row.photo_url,
      name: row.name,
      title: row.role || '',
      description: row.quote || '',
      compactTitle: Boolean(row.compact_role),
    }))
}

export async function loadCachedSuccessStories () {
  try {
    const db = await openDb()
    const snapshot = await requestResult(db.transaction(STORE, 'readonly').objectStore(STORE).get(KEY))
    db.close()
    if (!snapshot?.stories?.length) return []
    return snapshot.stories
      .filter((story) => story?.name && story.imageBlob instanceof Blob && story.imageBlob.size > 0)
      .map((story) => ({
        id: story.id,
        image: URL.createObjectURL(story.imageBlob),
        name: story.name,
        title: story.role || '',
        description: story.quote || '',
        compactTitle: Boolean(story.compact_role),
      }))
  } catch {
    return []
  }
}

export async function saveSuccessStoryCache (rows) {
  if (!Array.isArray(rows) || rows.length === 0) return
  try {
    const stories = []
    for (const row of rows) {
      if (!row?.name) continue
      const imageBlob = await fetchImageBlob(row)
      if (!imageBlob) continue
      stories.push({
        id: row.id,
        name: row.name,
        role: row.role || '',
        quote: row.quote || '',
        compact_role: Boolean(row.compact_role),
        imageBlob,
      })
    }
    if (!stories.length) return
    const db = await openDb()
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).put({ savedAt: Date.now(), stories }, KEY)
    await new Promise((resolve, reject) => {
      tx.oncomplete = resolve
      tx.onerror = () => reject(tx.error)
      tx.onabort = () => reject(tx.error)
    })
    db.close()
  } catch {
    // A failed cache write still leaves the live API cards on screen.
  }
}
