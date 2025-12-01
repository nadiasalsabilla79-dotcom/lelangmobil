# Testing Guide - LelangMobil

## 🧪 Manual Testing Checklist

### 1. Authentication & Authorization

#### Registration
- [ ] User dapat mendaftar dengan email valid
- [ ] Validasi email format
- [ ] Validasi password minimal 8 karakter
- [ ] Validasi password harus ada huruf besar, kecil, dan angka
- [ ] Validasi nomor telepon format Indonesia
- [ ] Error jika email sudah terdaftar
- [ ] Wallet otomatis dibuat dengan balance 0
- [ ] Redirect ke dashboard/kyc setelah registrasi

#### Login
- [ ] User dapat login dengan kredensial valid
- [ ] Error jika email tidak terdaftar
- [ ] Error jika password salah
- [ ] Token JWT disimpan di cookie
- [ ] Redirect ke dashboard untuk USER
- [ ] Redirect ke admin panel untuk ADMIN
- [ ] Session persisten setelah refresh

#### Logout
- [ ] User dapat logout
- [ ] Token dihapus dari cookie
- [ ] Redirect ke homepage
- [ ] Tidak bisa akses protected routes setelah logout

---

### 2. KYC Verification

#### Submission
- [ ] User dapat upload foto KTP
- [ ] User dapat upload foto selfie dengan KTP
- [ ] Validasi format file (JPG, PNG, WebP)
- [ ] Validasi ukuran file maksimal 5MB
- [ ] Preview gambar sebelum upload
- [ ] Status berubah menjadi PENDING setelah submit

#### Admin Approval
- [ ] Admin dapat melihat list KYC pending
- [ ] Admin dapat approve KYC
- [ ] Admin dapat reject KYC dengan alasan
- [ ] User mendapat notifikasi setelah approval/rejection
- [ ] Bonus Rp 1.000.000 otomatis masuk setelah KYC approved
- [ ] Status KYC berubah menjadi APPROVED/REJECTED

---

### 3. Wallet Management

#### Deposit
- [ ] User dapat request deposit
- [ ] Input amount minimal Rp 50.000
- [ ] Input amount maksimal Rp 100.000.000
- [ ] Pilih bank (BCA, Mandiri, BRI, BNI)
- [ ] Upload bukti transfer
- [ ] Status PENDING setelah submit
- [ ] Admin dapat approve/reject deposit
- [ ] Balance bertambah setelah approved
- [ ] Notifikasi setelah approved/rejected

#### Withdraw
- [ ] User dapat request withdraw
- [ ] Input amount minimal Rp 50.000
- [ ] Input amount maksimal Rp 50.000.000
- [ ] Validasi saldo mencukupi
- [ ] Input nomor rekening (10-16 digit)
- [ ] Input nama pemilik rekening
- [ ] Status PENDING setelah submit
- [ ] Admin dapat approve/reject withdraw
- [ ] Balance berkurang setelah approved
- [ ] Notifikasi setelah approved/rejected

#### Transaction History
- [ ] User dapat melihat riwayat transaksi
- [ ] Filter by type (deposit, withdraw, bonus)
- [ ] Filter by status
- [ ] Pagination berfungsi
- [ ] Detail transaksi lengkap

---

### 4. Auction & Bidding

#### Browse Auctions
- [ ] User dapat melihat list lelang aktif
- [ ] Filter by brand
- [ ] Filter by location
- [ ] Filter by price range
- [ ] Search by keyword
- [ ] Pagination berfungsi
- [ ] Countdown timer akurat

#### Auction Detail
- [ ] Detail mobil lengkap (spesifikasi, foto, dll)
- [ ] Current price update real-time
- [ ] Bid history terlihat
- [ ] Countdown timer
- [ ] Status lelang (upcoming, live, ended)

#### Place Bid
- [ ] User harus login untuk bid
- [ ] User harus KYC approved untuk bid
- [ ] Validasi saldo mencukupi
- [ ] Bid minimal = current price + minimum increment
- [ ] Hold balance otomatis
- [ ] Bid history update
- [ ] Notifikasi jika outbid
- [ ] Notifikasi jika menang

#### Auction Management (Admin)
- [ ] Admin dapat create auction
- [ ] Admin dapat edit auction
- [ ] Admin dapat delete auction
- [ ] Admin dapat change status
- [ ] Validasi waktu mulai dan selesai
- [ ] Validasi durasi lelang (1 jam - 30 hari)

---

### 5. Notifications

#### Real-time Notifications
- [ ] Notifikasi KYC approved/rejected
- [ ] Notifikasi deposit approved/rejected
- [ ] Notifikasi withdraw completed
- [ ] Notifikasi outbid
- [ ] Notifikasi auction won
- [ ] Notifikasi auction started
- [ ] Notifikasi bonus received

#### Notification Center
- [ ] Badge unread count
- [ ] Mark as read
- [ ] Mark all as read
- [ ] Filter by type
- [ ] Pagination
- [ ] Link to related page

---

### 6. Admin Panel

#### Dashboard
- [ ] Statistics overview
- [ ] Recent activities
- [ ] Charts & graphs
- [ ] Quick actions

#### User Management
- [ ] List all users
- [ ] Search users
- [ ] Filter by role
- [ ] View user details
- [ ] Edit user
- [ ] Delete user (soft delete)

#### KYC Management
- [ ] List pending KYC
- [ ] View KYC documents
- [ ] Approve KYC
- [ ] Reject KYC with reason
- [ ] Filter by status

#### Transaction Management
- [ ] List all transactions
- [ ] Filter by type
- [ ] Filter by status
- [ ] Approve deposit
- [ ] Reject deposit
- [ ] Approve withdraw
- [ ] View proof images

#### Auction Management
- [ ] List all auctions
- [ ] Create new auction
- [ ] Edit auction
- [ ] Delete auction
- [ ] Change status
- [ ] View bids

#### Reports
- [ ] Financial reports
- [ ] User statistics
- [ ] Auction statistics
- [ ] Export to CSV/Excel

---

### 7. UI/UX Testing

#### Responsive Design
- [ ] Mobile (320px - 767px)
- [ ] Tablet (768px - 1023px)
- [ ] Desktop (1024px+)
- [ ] Touch-friendly buttons
- [ ] Mobile navigation drawer

#### Cross-browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Accessibility
- [ ] Keyboard navigation
- [ ] Screen reader compatible
- [ ] Color contrast (WCAG AA)
- [ ] Focus indicators
- [ ] Alt text for images

#### Performance
- [ ] Page load < 3s
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Images optimized

---

### 8. Security Testing

#### Authentication
- [ ] JWT token expiration
- [ ] HTTP-only cookies
- [ ] Secure cookies in production
- [ ] CSRF protection
- [ ] XSS protection

#### Authorization
- [ ] Protected routes require auth
- [ ] Admin routes require admin role
- [ ] API endpoints check permissions
- [ ] User can only access own data

#### Input Validation
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] File upload validation
- [ ] Rate limiting works

---

### 9. Error Handling

#### User Errors
- [ ] Friendly error messages
- [ ] Form validation errors
- [ ] Network error handling
- [ ] 404 page
- [ ] 500 error page

#### API Errors
- [ ] Consistent error format
- [ ] Proper HTTP status codes
- [ ] Error logging
- [ ] Stack traces in development only

---

### 10. Integration Testing

#### Database
- [ ] Connection pooling
- [ ] Query optimization
- [ ] Transaction rollback
- [ ] Data integrity

#### External Services
- [ ] Image upload
- [ ] Email notifications (if implemented)
- [ ] Payment gateway (if implemented)

---

## 🔧 Automated Testing

### Unit Tests
```bash
# Run unit tests
pnpm test

# Run with coverage
pnpm test:coverage
```

### E2E Tests
```bash
# Run E2E tests
pnpm test:e2e

# Run in headless mode
pnpm test:e2e:headless
```

### Performance Tests
```bash
# Run Lighthouse
pnpm lighthouse

# Run load tests
pnpm test:load
```

---

## 📊 Test Results Template

### Test Session Info
- **Date**: [Date]
- **Tester**: [Name]
- **Environment**: [Development/Staging/Production]
- **Browser**: [Browser & Version]
- **Device**: [Desktop/Mobile/Tablet]

### Results Summary
- **Total Tests**: [Number]
- **Passed**: [Number]
- **Failed**: [Number]
- **Blocked**: [Number]

### Failed Tests
| Test Case | Expected | Actual | Priority | Notes |
|-----------|----------|--------|----------|-------|
| [Test]    | [Result] | [Result] | [H/M/L] | [Notes] |

### Issues Found
| Issue | Severity | Steps to Reproduce | Screenshot |
|-------|----------|-------------------|------------|
| [Issue] | [Critical/High/Medium/Low] | [Steps] | [Link] |

---

## 🐛 Bug Report Template

### Bug Information
- **Title**: [Short description]
- **Severity**: [Critical/High/Medium/Low]
- **Priority**: [High/Medium/Low]
- **Status**: [New/In Progress/Fixed/Closed]

### Environment
- **URL**: [URL]
- **Browser**: [Browser & Version]
- **OS**: [Operating System]
- **Device**: [Device Type]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Expected Result
[What should happen]

### Actual Result
[What actually happened]

### Screenshots/Videos
[Attach screenshots or videos]

### Additional Notes
[Any additional information]

---

## ✅ Sign-off Checklist

Before marking testing as complete:

- [ ] All critical tests passed
- [ ] All high-priority bugs fixed
- [ ] Performance metrics meet targets
- [ ] Security vulnerabilities addressed
- [ ] Cross-browser testing completed
- [ ] Mobile responsiveness verified
- [ ] Accessibility standards met
- [ ] Documentation updated
- [ ] Stakeholder approval obtained

---

**Testing Status**: [Not Started / In Progress / Completed]
**Sign-off Date**: [Date]
**Approved By**: [Name]
