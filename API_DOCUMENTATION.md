# API Documentation

Dokumentasi API untuk LelangMobil Platform (Future Implementation)

## Base URL
```
Development: http://localhost:3000/api
Production: https://api.lelangmobil.com
```

## Authentication

Semua endpoint yang memerlukan autentikasi harus menyertakan token JWT di header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### POST /api/auth/register
Registrasi user baru
```json
Request:
{
  "email": "user@example.com",
  "phone": "081234567890",
  "name": "John Doe",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "jwt-token"
  }
}
```

#### POST /api/auth/login
Login user
```json
Request:
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "data": {
    "user": { ... },
    "wallet": { ... },
    "kyc": { ... },
    "token": "jwt-token"
  }
}
```

#### POST /api/auth/logout
Logout user (requires auth)

### KYC

#### POST /api/kyc/submit
Submit KYC verification (requires auth)
```json
Request (multipart/form-data):
{
  "ktpNumber": "3171234567890001",
  "ktpImage": File,
  "selfieImage": File
}

Response:
{
  "success": true,
  "data": {
    "id": "kyc-123",
    "status": "PENDING",
    ...
  }
}
```

#### GET /api/kyc/status
Get KYC status (requires auth)

#### POST /api/admin/kyc/:id/approve
Approve KYC (requires admin)

#### POST /api/admin/kyc/:id/reject
Reject KYC (requires admin)

### Wallet

#### GET /api/wallet
Get wallet balance (requires auth)

#### POST /api/wallet/deposit
Submit deposit request (requires auth)
```json
Request (multipart/form-data):
{
  "amount": 1000000,
  "bankName": "BCA",
  "proofImage": File
}
```

#### POST /api/wallet/withdraw
Submit withdraw request (requires auth)
```json
Request:
{
  "amount": 500000,
  "bankName": "BCA",
  "bankAccountNumber": "1234567890",
  "bankAccountName": "John Doe"
}
```

#### GET /api/wallet/transactions
Get transaction history (requires auth)

### Auctions

#### GET /api/auctions
Get all auctions
```
Query params:
- status: LIVE | UPCOMING | ENDED
- brand: string
- location: string
- minPrice: number
- maxPrice: number
- page: number
- limit: number
```

#### GET /api/auctions/:id
Get auction detail

#### POST /api/auctions/:id/bid
Place a bid (requires auth & KYC approved)
```json
Request:
{
  "amount": 200000000
}

Response:
{
  "success": true,
  "data": {
    "bid": { ... },
    "auction": { ... }
  }
}
```

#### GET /api/auctions/:id/bids
Get bid history for auction

#### POST /api/admin/auctions
Create new auction (requires admin)

#### PUT /api/admin/auctions/:id
Update auction (requires admin)

#### DELETE /api/admin/auctions/:id
Delete auction (requires admin)

### Cars

#### GET /api/cars
Get all cars

#### GET /api/cars/:id
Get car detail

#### POST /api/admin/cars
Create new car (requires admin)

#### PUT /api/admin/cars/:id
Update car (requires admin)

#### DELETE /api/admin/cars/:id
Delete car (requires admin)

### Users

#### GET /api/users/me
Get current user profile (requires auth)

#### PUT /api/users/me
Update profile (requires auth)

#### GET /api/admin/users
Get all users (requires admin)

#### GET /api/admin/users/:id
Get user detail (requires admin)

#### PUT /api/admin/users/:id
Update user (requires admin)

### Notifications

#### GET /api/notifications
Get user notifications (requires auth)

#### PUT /api/notifications/:id/read
Mark notification as read (requires auth)

#### PUT /api/notifications/read-all
Mark all notifications as read (requires auth)

### Admin

#### GET /api/admin/dashboard
Get admin dashboard stats (requires admin)

#### GET /api/admin/reports/financial
Get financial reports (requires admin)

#### GET /api/admin/reports/auctions
Get auction reports (requires admin)

#### POST /api/admin/transactions/:id/approve
Approve transaction (requires admin)

#### POST /api/admin/transactions/:id/reject
Reject transaction (requires admin)

## WebSocket Events

### Connection
```javascript
const socket = io('wss://api.lelangmobil.com', {
  auth: { token: 'jwt-token' }
})
```

### Events

#### auction:update
Real-time auction updates
```json
{
  "auctionId": "auction-123",
  "currentPrice": 200000000,
  "totalBids": 15,
  "timeRemaining": 3600
}
```

#### bid:placed
New bid notification
```json
{
  "auctionId": "auction-123",
  "bidAmount": 200000000,
  "bidder": "User***"
}
```

#### auction:ended
Auction ended notification
```json
{
  "auctionId": "auction-123",
  "winnerId": "user-123",
  "finalPrice": 250000000
}
```

#### notification:new
New notification
```json
{
  "type": "OUTBID",
  "title": "Anda Telah Terkalahkan!",
  "message": "...",
  "data": { ... }
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation error",
  "details": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "Forbidden",
  "message": "You don't have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
```

## Rate Limiting

- Public endpoints: 100 requests per 15 minutes
- Authenticated endpoints: 1000 requests per 15 minutes
- Admin endpoints: Unlimited

## Pagination

Endpoints yang mengembalikan list menggunakan pagination:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

## File Upload

- Maximum file size: 5MB
- Allowed formats: JPG, PNG, JPEG
- Files are uploaded to AWS S3
- CDN URL is returned in response

## Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Unprocessable Entity
- 429: Too Many Requests
- 500: Internal Server Error

## Notes

- Semua timestamp menggunakan ISO 8601 format
- Semua amount dalam Rupiah (IDR)
- Token JWT expired dalam 7 hari
- Refresh token expired dalam 30 hari
- WebSocket connection timeout: 60 detik
