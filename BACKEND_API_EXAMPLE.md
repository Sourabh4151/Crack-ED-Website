# Backend API Setup Guide

## Security Best Practice: Use Backend API

**NEVER expose your AuthToken in frontend code!**

## Recommended Architecture

```
Frontend (React) → Your Backend API → CRM API
```

## Backend API Endpoint Example

Create an endpoint at `/api/submit-lead` that handles the CRM submission:

### Python (Flask/FastAPI) Example:

```python
from flask import Flask, request, jsonify
import requests
import json

app = Flask(__name__)

# Program to Center mapping (same as frontend)
PROGRAM_TO_CENTER_MAP = {
    'AURUM Bankers Relationship Manager': '1',
    'AURUM Bankers Relationship Officer': '2',
    'AURUM Bankers Bank Officer': '3',
    'AURUM Bankers Sales Officer': '4',
    'AURUM Bankers Transaction Officer': '5',
    'AURUM Bankers Deputy Center Manager': '6',
    'AURUM Bankers Customer Service Officer': '7',
    'AURUM Bankers Late Recovery Officer': '8',
    'AURUM Bankers Money Officer': '9',
    'AURUM Bankers Customer Service Officer Valuation': '10',
    'Lenskart Clinical Technician Program': '11',
    'Lenskart Retail Sales Associate Program': '12',
}

def get_center_by_program(program):
    return PROGRAM_TO_CENTER_MAP.get(program, '1')

def split_name(full_name):
    name_parts = full_name.strip().split()
    if len(name_parts) == 1:
        return name_parts[0], ''
    return ' '.join(name_parts[:-1]), name_parts[-1]

@app.route('/api/submit-lead', methods=['POST'])
def submit_lead():
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['firstName', 'lastName', 'email', 'mobile', 'program']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Get center based on program
        center = get_center_by_program(data['program'])
        
        # Prepare CRM payload
        payload = {
            "Source": "crack-ed",
            "AuthToken": "crack-ed_29-01-2025",  # ✅ Secure on backend
            "FirstName": data['firstName'],
            "LastName": data['lastName'],
            "Email": data['email'],
            "MobileNumber": int(data['mobile'].replace(' ', '').replace('-', '')),
            "City": data.get('city', ''),
            "Center": center,
        }
        
        # Call CRM API
        response = requests.post(
            'https://publisher.extraaedge.com/api/Webhook/addPublisherLead',
            headers={'Content-Type': 'application/json'},
            data=json.dumps(payload),
            timeout=10
        )
        
        if response.status_code == 200:
            return jsonify({
                'success': True,
                'message': 'Lead submitted successfully'
            }), 200
        else:
            return jsonify({
                'error': 'Failed to submit lead to CRM',
                'details': response.text
            }), response.status_code
            
    except Exception as e:
        return jsonify({
            'error': 'Internal server error',
            'message': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
```

### Node.js (Express) Example:

```javascript
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const PROGRAM_TO_CENTER_MAP = {
  'AURUM Bankers Relationship Manager': '1',
  // ... same mapping as frontend
};

const getCenterByProgram = (program) => {
  return PROGRAM_TO_CENTER_MAP[program] || '1';
};

app.post('/api/submit-lead', async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, program } = req.body;
    
    // Validate
    if (!firstName || !email || !mobile || !program) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const center = getCenterByProgram(program);
    
    const payload = {
      Source: 'crack-ed',
      AuthToken: 'crack-ed_29-01-2025', // ✅ Secure on backend
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      MobileNumber: parseInt(mobile.replace(/\D/g, ''), 10),
      City: req.body.city || '',
      Center: center,
    };
    
    const response = await axios.post(
      'https://publisher.extraaedge.com/api/Webhook/addPublisherLead',
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    res.json({ success: true, message: 'Lead submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to submit lead' });
  }
});

app.listen(3001, () => {
  console.log('Backend API running on port 3001');
});
```

## CORS Configuration

Make sure your backend allows requests from your frontend domain:

### Flask:
```python
from flask_cors import CORS
CORS(app, origins=['http://localhost:5173', 'https://yourdomain.com'])
```

### Express:
```javascript
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:5173', 'https://yourdomain.com']
}));
```

## Environment Variables

Store sensitive data in environment variables:

```python
import os
AUTH_TOKEN = os.getenv('CRM_AUTH_TOKEN', 'crack-ed_29-01-2025')
```

## Testing

Test your backend API:

```bash
curl -X POST http://localhost:3001/api/submit-lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "mobile": "1234567890",
    "program": "AURUM Bankers Relationship Manager"
  }'
```
