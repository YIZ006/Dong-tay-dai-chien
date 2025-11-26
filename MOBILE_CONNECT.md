# 📱 Hướng Dẫn Kết Nối Điện Thoại với Máy Tính

## Yêu Cầu

- ✅ Máy tính và điện thoại **cùng WiFi**
- ✅ Server đang chạy trên máy tính (`npm start`)
- ✅ Firewall cho phép kết nối port 3000

## Bước 1: Tìm IP của Máy Tính

### Windows:
```bash
ipconfig
```
Tìm dòng **"IPv4 Address"** (ví dụ: `192.168.1.100`)

### Hoặc xem trong game:
- Mở game trên máy tính
- Chọn chế độ **"Mạng LAN (Local)"**
- IP sẽ hiển thị trong phần thông tin

## Bước 2: Mở Firewall (Nếu Cần)

### Windows:
1. Mở **Windows Defender Firewall**
2. Click **"Advanced settings"**
3. **Inbound Rules** → **New Rule**
4. Chọn **Port** → **Next**
5. TCP, Specific local ports: `3000` → **Next**
6. **Allow the connection** → **Next**
7. Tích tất cả → **Next**
8. Đặt tên: "Node.js Server" → **Finish**

### Hoặc chạy lệnh nhanh:
```bash
netsh advfirewall firewall add rule name="Node.js Server" dir=in action=allow protocol=TCP localport=3000
```

## Bước 3: Truy Cập Từ Điện Thoại

1. **Đảm bảo điện thoại và máy tính cùng WiFi**
2. Mở **browser trên điện thoại** (Chrome, Safari, Firefox...)
3. Nhập địa chỉ:
   ```
   http://[IP-CỦA-MÁY-TÍNH]:3000/index_chess_socketio.html
   ```
   
   Ví dụ:
   ```
   http://192.168.1.100:3000/index_chess_socketio.html
   ```

4. Game sẽ load và bạn có thể chơi!

## Bước 4: Chơi Game

1. **Máy tính**: Tạo phòng → Lấy mã phòng
2. **Điện thoại**: Nhập mã phòng → Tham gia
3. Chơi!

## 🔍 Kiểm Tra Kết Nối

### Nếu không kết nối được:

1. **Kiểm tra cùng WiFi:**
   - Máy tính: Settings → Network → Xem WiFi name
   - Điện thoại: Settings → WiFi → Xem WiFi name
   - Phải **GIỐNG NHAU**

2. **Kiểm tra IP đúng chưa:**
   - Chạy lại `ipconfig` trên máy tính
   - Đảm bảo IP không thay đổi

3. **Kiểm tra server đang chạy:**
   - Terminal phải hiển thị: `Server running on http://localhost:3000`
   - Không có lỗi

4. **Kiểm tra Firewall:**
   - Tắt Firewall tạm thời để test
   - Nếu được thì mở lại và thêm rule như trên

5. **Thử ping từ điện thoại:**
   - Cài app "Network Tools" hoặc "Fing"
   - Ping IP của máy tính
   - Nếu ping được thì network OK

## 📱 Tips Cho Điện Thoại

- **Sử dụng Chrome** hoặc **Safari** (tốt nhất)
- **Xoay ngang** để màn hình rộng hơn
- **Pin to Home Screen** để dễ truy cập lại
- **Đảm bảo WiFi ổn định** (không dùng mobile data)

## 🌐 Test Nhanh

1. Trên máy tính: `http://localhost:3000/index_chess_socketio.html` → Phải mở được
2. Trên điện thoại: `http://[IP]:3000/index_chess_socketio.html` → Phải mở được
3. Nếu cả 2 đều mở được → OK!

## 🐛 Troubleshooting

### Lỗi "Không thể kết nối"
- ✅ Kiểm tra cùng WiFi
- ✅ Kiểm tra IP đúng
- ✅ Kiểm tra Firewall
- ✅ Kiểm tra server đang chạy

### Lỗi "Connection refused"
- ✅ Firewall đang chặn
- ✅ Server chưa chạy
- ✅ Port 3000 bị dùng bởi app khác

### Lỗi "Timeout"
- ✅ WiFi yếu
- ✅ IP sai
- ✅ Router chặn local connections

## 💡 Mẹo

- **Lưu bookmark** trên điện thoại để dễ truy cập
- **Dùng IP tĩnh** cho máy tính (tránh IP thay đổi)
- **Test trước** bằng cách mở 2 tab trên máy tính

---

**Chúc bạn chơi vui vẻ! 🎮**

