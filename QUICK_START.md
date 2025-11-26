# 🚀 Hướng Dẫn Nhanh - Chơi Game Online

## Sau Khi Chạy Server

### Bước 1: Kiểm tra Server đã chạy

Mở browser và truy cập:
```
http://localhost:3000
```

Bạn sẽ thấy thư mục files hoặc có thể mở trực tiếp:
```
http://localhost:3000/index_chess_socketio.html
```

### Bước 2: Tạo Phòng Chơi

1. Mở `index_chess_socketio.html` trong browser
2. Click nút **"Tạo Phòng Mới"**
3. Bạn sẽ thấy **mã phòng** (ví dụ: `ABC123`)
4. **Copy mã phòng này** để gửi cho bạn chơi

### Bước 3: Người Chơi 2 Tham Gia

**Cách 1: Cùng mạng LAN (Local)**
- Người chơi 2 mở browser trên máy khác
- Truy cập: `http://[IP-CỦA-MÁY-BẠN]:3000/index_chess_socketio.html`
  - Ví dụ: `http://192.168.1.100:3000/index_chess_socketio.html`
- Nhập mã phòng và click **"Tham Gia Phòng"**

**Cách 2: Test trên cùng máy**
- Mở tab mới trong browser
- Truy cập: `http://localhost:3000/index_chess_socketio.html`
- Nhập mã phòng và click **"Tham Gia Phòng"**

### Bước 4: Chơi Game

- Khi có 2 người chơi, game sẽ tự động bắt đầu
- Mỗi người sẽ được phân phe (Cờ Vua hoặc Cờ Tướng)
- Lượt chơi sẽ hiển thị ở trên cùng
- Di chuyển quân cờ như bình thường

## 🔍 Kiểm Tra Kết Nối

### Xem Server Logs

Trong terminal nơi bạn chạy `npm start`, bạn sẽ thấy:
```
Server running on http://localhost:3000
User connected: [socket-id]
Room created: ABC123 by [socket-id]
User connected: [socket-id]
Room joined: ABC123
Game started in room: ABC123
```

### Xem Browser Console

Nhấn **F12** trong browser để mở Developer Tools:
- Tab **Console** sẽ hiển thị:
  - `Connected to server: [socket-id]`
  - `Room created: ABC123`
  - Các messages khác

## 🌐 Chơi Online (Deploy Server)

### Option 1: Railway (Miễn phí, Dễ nhất)

1. Đăng ký tại https://railway.app
2. Tạo project mới
3. Deploy từ GitHub hoặc upload code
4. Railway sẽ cho bạn URL như: `https://your-app.railway.app`
5. Update `SERVER_URL` trong `index_chess_socketio.html`:
   ```javascript
   const SERVER_URL = 'https://your-app.railway.app';
   ```

### Option 2: Render (Miễn phí)

1. Đăng ký tại https://render.com
2. Tạo Web Service
3. Connect GitHub repo
4. Deploy và lấy URL

### Option 3: Ngrok (Test nhanh)

1. Cài đặt ngrok: https://ngrok.com
2. Chạy: `ngrok http 3000`
3. Ngrok sẽ cho URL như: `https://abc123.ngrok.io`
4. Gửi URL này cho bạn chơi

## 🐛 Troubleshooting

### Server không chạy
```bash
# Kiểm tra port 3000 đã được dùng chưa
netstat -ano | findstr :3000

# Hoặc thay đổi port trong server.js
const PORT = 3001; // hoặc port khác
```

### Không kết nối được
- Kiểm tra server đã chạy chưa
- Kiểm tra firewall không chặn port 3000
- Thử mở `http://localhost:3000` xem có hiển thị gì không

### Lỗi CORS
- Đã được xử lý trong `server.js`
- Nếu vẫn lỗi, kiểm tra lại CORS config

### Không thấy mã phòng
- Kiểm tra browser console (F12) xem có lỗi không
- Kiểm tra Socket.io đã load chưa
- Thử refresh trang

## 📱 Test với Mobile

1. Tìm IP của máy tính:
   - Windows: `ipconfig` (tìm IPv4 Address)
   - Mac/Linux: `ifconfig` hoặc `ip addr`
2. Trên điện thoại (cùng WiFi), mở:
   ```
   http://[IP]:3000/index_chess_socketio.html
   ```
   Ví dụ: `http://192.168.1.100:3000/index_chess_socketio.html`

## ✅ Checklist

- [ ] Server đã chạy (`npm start`)
- [ ] Mở được `http://localhost:3000/index_chess_socketio.html`
- [ ] Tạo phòng thành công và thấy mã phòng
- [ ] Người chơi 2 có thể tham gia
- [ ] Game bắt đầu khi có 2 người
- [ ] Di chuyển quân cờ sync giữa 2 người chơi

## 🎮 Tips

- **Test nhanh**: Mở 2 tab cùng lúc để test
- **Xem logs**: Luôn mở terminal để xem server logs
- **Debug**: Dùng F12 Console để debug
- **Restart**: Nếu có lỗi, restart server (`Ctrl+C` rồi `npm start` lại)

## 🚀 Next Steps

Sau khi test thành công local:
1. Deploy lên Railway/Render để chơi online
2. Share link với bạn bè
3. Enjoy! 🎉

