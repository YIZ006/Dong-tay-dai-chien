# Hướng Dẫn Setup Game Online với Socket.io

## Giải Pháp Không Cần Firebase

Game này sử dụng **Socket.io + Node.js** thay vì Firebase, hoàn toàn tự do và không phụ thuộc vào service bên ngoài.

## Yêu Cầu

- Node.js (phiên bản 14 trở lên)
- npm hoặc yarn

## Cài Đặt

### Bước 1: Cài đặt dependencies

Mở terminal trong thư mục project và chạy:

```bash
npm install
```

Hoặc nếu dùng yarn:

```bash
yarn install
```

### Bước 2: Chạy Server

```bash
npm start
```

Hoặc để chạy với auto-reload (development):

```bash
npm run dev
```

Server sẽ chạy tại: `http://localhost:3000`

### Bước 3: Mở Game

Mở file `index_chess_socketio.html` trong browser hoặc truy cập:
- `http://localhost:3000/index_chess_socketio.html`

## Cách Chơi

1. **Tạo Phòng**: Click "Tạo Phòng Mới" để tạo phòng và nhận mã phòng
2. **Tham Gia**: Người chơi khác nhập mã phòng và click "Tham Gia Phòng"
3. **Chơi**: Khi có 2 người chơi, game sẽ tự động bắt đầu

## Deploy Online (Tùy chọn)

### Railway (Khuyến nghị - Miễn phí)

1. Đăng ký tại https://railway.app
2. Tạo project mới
3. Connect GitHub repository
4. Railway sẽ tự động detect Node.js và deploy
5. Update `SERVER_URL` trong HTML nếu cần

### Render (Miễn phí)

1. Đăng ký tại https://render.com
2. Tạo Web Service mới
3. Connect repository
4. Build command: `npm install`
5. Start command: `npm start`

### Heroku

1. Đăng ký tại https://heroku.com
2. Tạo app mới
3. Deploy từ Git
4. Set PORT trong environment variables

## Cấu Hình

### Thay đổi Port

Trong `server.js`, thay đổi:

```javascript
const PORT = process.env.PORT || 3000; // Thay 3000 bằng port bạn muốn
```

### Thay đổi Server URL

Trong `index_chess_socketio.html`, tìm dòng:

```javascript
const SERVER_URL = window.location.origin; // Tự động detect
```

Hoặc set cứng:

```javascript
const SERVER_URL = 'http://your-server-url.com';
```

## So Sánh với Firebase

| Tính năng | Socket.io | Firebase |
|-----------|-----------|----------|
| Setup | ⭐⭐⭐ | ⭐⭐ |
| Chi phí | ✅ Miễn phí | ⚠️ Free tier có giới hạn |
| Tự do | ✅ Hoàn toàn | ❌ Phụ thuộc Google |
| Real-time | ✅✅✅ | ✅✅✅ |
| Server cần | ✅ Có | ❌ Không |

## Troubleshooting

### Lỗi "Cannot find module"
```bash
npm install
```

### Port đã được sử dụng
Thay đổi PORT trong `server.js` hoặc kill process đang dùng port đó

### Không kết nối được
- Kiểm tra server đã chạy chưa
- Kiểm tra firewall/antivirus
- Kiểm tra SERVER_URL trong HTML

### CORS errors
Đã được xử lý trong `server.js` với CORS config. Nếu vẫn lỗi, kiểm tra lại.

## File Structure

```
project/
├── server.js                 # Node.js server với Socket.io
├── package.json             # Dependencies
├── index_chess_socketio.html # Client HTML với Socket.io
├── index_chess.html         # Version offline (gốc)
└── SETUP_SOCKETIO.md        # File này
```

## Lưu Ý

- Server cần chạy để game online hoạt động
- Có thể chơi offline với `index_chess.html` (không cần server)
- Socket.io tự động reconnect nếu mất kết nối
- Server tự động cleanup rooms cũ (sau 1 giờ)

## Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra console trong browser (F12)
2. Kiểm tra server logs trong terminal
3. Đảm bảo đã cài đặt đúng dependencies

