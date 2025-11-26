# 🔒 Hướng Dẫn Bảo Mật Game Online

## Tổng Quan

Game đã được tích hợp các tính năng bảo mật để bảo vệ khỏi các cuộc tấn công và lạm dụng.

## Các File Bảo Mật

### 1. `firebase-database-rules.json`
**Mục đích**: Database Rules cho Firebase Realtime Database
- Validate cấu trúc dữ liệu
- Kiểm soát quyền đọc/ghi
- Giới hạn số lượng players

**Cách sử dụng**:
```bash
1. Copy nội dung file
2. Vào Firebase Console > Realtime Database > Rules
3. Paste và click Publish
```

### 2. `firebase-security-config.js`
**Mục đích**: Client-side validation và security helpers
- Validate room codes
- Validate moves
- Rate limiting
- Sanitize input

**Đã được tự động load** trong `index_chess_online.html`

### 3. `SECURITY_SETUP.md`
**Mục đích**: Hướng dẫn chi tiết setup bảo mật

## Tính Năng Bảo Mật Đã Triển Khai

### ✅ Database Rules
- Chỉ cho phép đọc/ghi khi có quyền hợp lệ
- Validate cấu trúc dữ liệu (pieces, moves, game state)
- Giới hạn số lượng players trong room (max 2)
- Validate turn order và game state

### ✅ Client-side Validation
- **Room Code Validation**: Chỉ chấp nhận mã phòng 6 ký tự chữ hoa/số
- **Move Validation**: Kiểm tra move hợp lệ trước khi gửi
- **Game State Validation**: Validate game state trước khi sync
- **Piece Validation**: Kiểm tra piece data hợp lệ

### ✅ Rate Limiting
- Giới hạn tần suất di chuyển (minimum 100ms giữa các moves)
- Chống spam moves
- Tự động cleanup old timestamps

### ✅ Input Sanitization
- Sanitize player names (max 50 ký tự)
- Validate và filter invalid data

### ✅ Error Handling
- Try-catch cho tất cả Firebase operations
- User-friendly error messages
- Console logging cho debugging

## Cách Setup

### Bước 1: Cấu hình Database Rules

1. Mở `firebase-database-rules.json`
2. Copy toàn bộ nội dung
3. Vào Firebase Console: https://console.firebase.google.com/
4. Chọn project > Realtime Database > Rules
5. Paste và click **Publish**

### Bước 2: Kiểm tra Security Config

File `firebase-security-config.js` đã được tự động load trong HTML. Đảm bảo file này tồn tại trong cùng thư mục với `index_chess_online.html`.

### Bước 3: Test

1. Mở `index_chess_online.html` trong browser
2. Mở Developer Console (F12)
3. Test các scenarios:
   - Tạo phòng với mã hợp lệ
   - Thử nhập mã phòng không hợp lệ
   - Test rate limiting bằng cách di chuyển nhanh
   - Kiểm tra error handling

## Security Checklist

- [x] Database Rules đã được cấu hình
- [x] Client-side validation đã được thêm
- [x] Rate limiting đã được implement
- [x] Input sanitization đã được thêm
- [x] Error handling đã được cải thiện
- [ ] Firebase Authentication (tùy chọn - xem SECURITY_SETUP.md)
- [ ] Monitoring và alerts (tùy chọn)

## Nâng Cấp Bảo Mật (Tùy chọn)

### Thêm Authentication

Xem hướng dẫn trong `SECURITY_SETUP.md` để thêm Firebase Authentication.

### Monitoring

1. Vào Firebase Console > Realtime Database > Usage
2. Monitor số lượng connections và data transfer
3. Set up alerts cho unusual activity

### Production Checklist

Trước khi deploy production:

- [ ] Thêm Firebase Authentication
- [ ] Cập nhật Database Rules để yêu cầu auth
- [ ] Enable Firebase App Check
- [ ] Set up monitoring và alerts
- [ ] Review và test tất cả security rules
- [ ] Backup Database Rules

## Troubleshooting

### Lỗi "Permission denied"
- Kiểm tra Database Rules đã publish chưa
- Kiểm tra rules có đúng format JSON không
- Xem Firebase Console > Realtime Database > Rules > Simulator

### Validation errors
- Kiểm tra `firebase-security-config.js` đã load chưa
- Xem browser console để biết field nào fail
- Kiểm tra data structure có đúng không

### Rate limiting quá strict
- Điều chỉnh `minInterval` trong `firebase-security-config.js`
- Hoặc disable trong development mode

## Liên Hệ & Hỗ Trợ

Nếu gặp vấn đề về bảo mật:
1. Kiểm tra browser console để xem error messages
2. Xem Firebase Console > Realtime Database > Rules > Simulator
3. Review file `SECURITY_SETUP.md` để biết thêm chi tiết

## Tài Liệu Tham Khảo

- [Firebase Realtime Database Security Rules](https://firebase.google.com/docs/database/security)
- [Firebase Security Best Practices](https://firebase.google.com/docs/database/usage/security)
- File `SECURITY_SETUP.md` - Hướng dẫn chi tiết
- File `SETUP_FIREBASE.md` - Hướng dẫn setup Firebase cơ bản

