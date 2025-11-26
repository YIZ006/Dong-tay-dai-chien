# 🌐 Hướng Dẫn Chế Độ Mạng LAN và Global

## Tổng Quan

Game hiện hỗ trợ 2 chế độ kết nối:
- **🌐 Mạng LAN (Local)**: Chơi với người cùng WiFi
- **🌍 Global (Online)**: Chơi với người ở bất kỳ đâu qua internet

## Chế Độ Mạng LAN (Local)

### Khi Nào Dùng?
- Chơi với bạn bè cùng WiFi
- Test game trên cùng mạng
- Không cần deploy server online

### Cách Sử Dụng:

1. **Chọn chế độ**: Click nút **"🌐 Mạng LAN (Local)"**
2. **Tạo phòng**: Click "Tạo Phòng Mới"
3. **Lấy mã phòng**: Copy mã phòng hiển thị
4. **Người chơi 2**:
   - Cùng WiFi với bạn
   - Mở browser và vào: `http://[IP-CỦA-BẠN]:3000/index_chess_socketio.html`
   - Nhập mã phòng và tham gia

### Tìm IP của bạn:

**Windows:**
```bash
ipconfig
```
Tìm "IPv4 Address" (ví dụ: `192.168.1.100`)

**Mac/Linux:**
```bash
ifconfig
# hoặc
ip addr
```

### Ví dụ:
- Máy bạn có IP: `192.168.1.100`
- Người chơi 2 vào: `http://192.168.1.100:3000/index_chess_socketio.html`

## Chế Độ Global (Online)

### Khi Nào Dùng?
- Chơi với người ở xa
- Chơi qua internet
- Đã deploy server online (Railway, Render, Heroku...)

### Cách Sử Dụng:

1. **Chọn chế độ**: Click nút **"🌍 Global (Online)"**
2. **Nhập Server URL**:
   - Nếu đã deploy: Nhập URL server (ví dụ: `https://your-app.railway.app`)
   - Để trống: Sẽ dùng server mặc định (localhost)
3. **Tạo phòng**: Click "Tạo Phòng Mới"
4. **Chia sẻ**: Gửi mã phòng và server URL cho bạn chơi
5. **Người chơi 2**:
   - Mở game
   - Chọn "Global"
   - Nhập cùng server URL
   - Nhập mã phòng và tham gia

### Deploy Server Online:

#### Railway (Khuyến nghị - Miễn phí)
1. Đăng ký: https://railway.app
2. Tạo project mới
3. Deploy từ GitHub hoặc upload code
4. Lấy URL: `https://your-app.railway.app`
5. Nhập URL này vào game

#### Render (Miễn phí)
1. Đăng ký: https://render.com
2. Tạo Web Service
3. Connect GitHub repo
4. Deploy và lấy URL

#### Ngrok (Test nhanh)
1. Cài ngrok: https://ngrok.com
2. Chạy: `ngrok http 3000`
3. Copy URL: `https://abc123.ngrok.io`
4. Nhập URL này vào game

## So Sánh 2 Chế Độ

| Tính năng | LAN (Local) | Global (Online) |
|-----------|-------------|-----------------|
| Phạm vi | Cùng WiFi | Toàn cầu |
| Tốc độ | ⚡ Rất nhanh | ⚡ Nhanh (tùy server) |
| Setup | ✅ Đơn giản | ⚠️ Cần deploy |
| Chi phí | ✅ Miễn phí | ✅ Miễn phí (free tier) |
| Bảo mật | ⚠️ Local network | ✅ HTTPS |

## Chuyển Đổi Giữa 2 Chế Độ

Bạn có thể chuyển đổi bất cứ lúc nào:
1. Click nút chế độ khác
2. Game sẽ tự động reconnect
3. Tạo phòng mới hoặc tham gia phòng

## Troubleshooting

### LAN Mode không kết nối được

**Kiểm tra:**
- ✅ Cùng WiFi chưa?
- ✅ Firewall có chặn port 3000 không?
- ✅ IP đúng chưa?
- ✅ Server đã chạy chưa?

**Giải pháp:**
```bash
# Windows: Mở port trong Firewall
netsh advfirewall firewall add rule name="Node.js Server" dir=in action=allow protocol=TCP localport=3000

# Hoặc tắt Firewall tạm thời để test
```

### Global Mode không kết nối được

**Kiểm tra:**
- ✅ Server URL đúng chưa?
- ✅ Server đã deploy và chạy chưa?
- ✅ URL có `http://` hoặc `https://` chưa?

**Giải pháp:**
- Kiểm tra server logs
- Test URL trong browser: `https://your-server.com/api/ip`
- Đảm bảo CORS đã được cấu hình trong server

### Lỗi "Cannot connect to server"

1. Kiểm tra server đã chạy chưa
2. Kiểm tra URL đúng chưa
3. Xem browser console (F12) để biết lỗi chi tiết
4. Thử reconnect bằng cách chuyển chế độ

## Tips

### LAN Mode:
- ⚡ Tốc độ nhanh nhất
- 🎮 Lý tưởng cho LAN party
- 🔒 Chỉ người cùng WiFi mới vào được

### Global Mode:
- 🌍 Chơi với bạn bè ở xa
- 📱 Có thể chơi từ mobile
- 🔐 An toàn hơn với HTTPS

## Ví Dụ Sử Dụng

### Scenario 1: Chơi với bạn cùng phòng
```
1. Chọn "Mạng LAN"
2. Tạo phòng → Mã: ABC123
3. Bạn vào: http://192.168.1.100:3000/index_chess_socketio.html
4. Nhập mã: ABC123
5. Chơi!
```

### Scenario 2: Chơi với bạn ở xa
```
1. Deploy server lên Railway → URL: https://chess-game.railway.app
2. Chọn "Global"
3. Nhập URL: https://chess-game.railway.app
4. Tạo phòng → Mã: XYZ789
5. Gửi URL và mã cho bạn
6. Bạn cũng chọn "Global", nhập URL và mã
7. Chơi!
```

## Lưu Ý

- ⚠️ LAN mode chỉ hoạt động khi cùng WiFi
- ⚠️ Global mode cần server đã deploy online
- ✅ Có thể test cả 2 chế độ trên cùng máy (mở 2 tab)
- ✅ Server URL được lưu khi bạn nhập (chỉ Global mode)

