# API Documentation

Base URL: `http://localhost:5000/api`

All protected endpoints require the header:
```
Authorization: Bearer <token>
```

## Authentication

### Register
```
POST /auth/register
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": { "_id": "...", "name": "John Doe", "email": "john@example.com", "role": "user" },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Login
```
POST /auth/login
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Logout
```
POST /auth/logout
```
Requires authentication. Client should remove stored token.

### Get Current User
```
GET /auth/me
```

---

## User Profile

### Update Profile
```
PUT /users/profile
```

**Body:**
```json
{
  "name": "John Doe",
  "dateOfBirth": "1990-05-15",
  "timeOfBirth": "14:30",
  "placeOfBirth": "Mumbai, India",
  "gender": "male"
}
```

### Get All Users (Admin)
```
GET /users/admin/users
```

### Delete User (Admin)
```
DELETE /users/admin/users/:id
```

---

## Recommendations

### Create Recommendation
```
POST /recommendations
```

**Body:**
```json
{
  "dateOfBirth": "1990-05-15",
  "timeOfBirth": "14:30",
  "placeOfBirth": "Mumbai, India",
  "gender": "male"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Recommendation generated successfully",
  "data": {
    "recommendation": {
      "_id": "...",
      "zodiacSign": "Taurus",
      "gemstoneName": "Emerald",
      "confidenceScore": 100,
      "reportSummary": "Based on your birth details...",
      "gemstoneId": { "name": "Emerald", "planet": "Mercury", "benefits": [...] }
    }
  }
}
```

### Get Recommendation History
```
GET /recommendations?q=emerald&page=1&limit=10
```

Query parameters:
- `q` — Search by gemstone name, zodiac sign, or report text
- `page` — Page number (default: 1)
- `limit` — Items per page (default: 10)

### Get Recommendation by ID
```
GET /recommendations/:id
```

### Export as PDF
```
GET /recommendations/:id/export/pdf
```
Returns `application/pdf` file download.

### Export as JSON
```
GET /recommendations/:id/export/json
```
Returns JSON file download.

### Get All Recommendations (Admin)
```
GET /recommendations/admin/all?page=1&limit=20
```

### Get Analytics (Admin)
```
GET /recommendations/admin/analytics
```

**Response:**
```json
{
  "success": true,
  "data": {
    "analytics": {
      "totalUsers": 25,
      "totalRecommendations": 48,
      "averageConfidenceScore": 92,
      "recommendationsByZodiac": [{ "_id": "Taurus", "count": 8 }],
      "recommendationsByGemstone": [{ "_id": "Emerald", "count": 12 }],
      "recentRecommendations": [...]
    }
  }
}
```

---

## Gemstones

### Get All Gemstones
```
GET /gemstones
```

### Get Gemstone by ID
```
GET /gemstones/:id
```

### Update Gemstone (Admin)
```
PUT /gemstones/:id
```

**Body (all fields optional):**
```json
{
  "planet": "Mercury",
  "benefits": ["Improved communication"],
  "wearingMethod": "Set in gold on little finger",
  "recommendedMetal": "Gold",
  "recommendedFinger": "Little finger",
  "recommendedDay": "Wednesday"
}
```

---

## Health Check

```
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "Gemstone API is running"
}
```

---

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

Validation errors include field details:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "body.email", "message": "Invalid email address" }
  ]
}
```

| Status | Meaning |
|--------|---------|
| 400 | Bad request / validation error |
| 401 | Unauthorized / invalid token |
| 403 | Forbidden / admin required |
| 404 | Resource not found |
| 409 | Conflict (duplicate email) |
| 500 | Internal server error |
