# 🎮 Đông Tây Đại Chiến - Online Multiplayer Chess Game

Game cờ vua online multiplayer với Socket.io, hỗ trợ chơi qua mạng LAN hoặc Internet.

![Game Preview](https://img.shields.io/badge/Status-Active-success)
![Node.js](https://img.shields.io/badge/Node.js-14+-green)
![Socket.io](https://img.shields.io/badge/Socket.io-4.6+-blue)

## ✨ Tính Năng

- 🎯 **Multiplayer Online**: Chơi với bạn bè qua internet
- 🌐 **Mạng LAN**: Chơi với người cùng WiFi
- 🌍 **Global Mode**: Chơi với người ở bất kỳ đâu
- ⚡ **Real-time Sync**: Đồng bộ nước đi real-time
- 🎨 **UI Đẹp**: Giao diện hiện đại, dễ sử dụng
- 🤖 **Bot AI**: Chơi với bot có 3 mức độ khó
- ⌨️ **Phím Tắt**: Z (đi lại), R (reset), S (đầu hàng), D (xin hòa)
- 🔒 **Bảo mật**: Validation và rate limiting

## 🚀 Quick Start

### Yêu Cầu

- Node.js 14+ 
- npm hoặc yarn

### Cài Đặt

```bash
# Clone repository
git clone https://github.com/YIZ006/Dong-tay-dai-chien.git
cd Dong-tay-dai-chien

# Cài đặt dependencies
npm install

# Chạy server
npm start
```

### Sử Dụng

1. Mở browser và vào: `http://localhost:3000/index_chess_socketio.html`
2. Chọn chế độ:
   - **Chơi với BOT**: Chọn độ khó và bắt đầu chơi
   - **Mạng LAN**: Chơi với người cùng WiFi
   - **Global**: Chơi qua internet (cần deploy server)
3. Tạo phòng hoặc tham gia phòng
4. Chơi!

## 📁 Cấu Trúc Project

```
Dong-tay-dai-chien/
├── server.js                 # Node.js server với Socket.io
├── package.json             # Dependencies
├── index_chess_socketio.html # Client HTML (Online mode)
├── index_chess.html         # Client HTML (Offline mode)
├── push-to-github.bat       # Script deploy tự động (Windows)
├── deploy-to-github.bat     # Script deploy (Windows)
├── .gitignore              # Git ignore rules
└── README.md               # File này
```

## 🚀 Deploy Lên GitHub

### Cách 1: Dùng Script Tự Động (Khuyến nghị)

#### Windows:
1. **Double-click** vào file `push-to-github.bat`
2. Nhập commit message (hoặc Enter để dùng mặc định)
3. Đợi script tự động deploy!

#### Linux/Mac:
```bash
chmod +x deploy-to-github.sh
./deploy-to-github.sh
```

### Cách 2: Deploy Thủ Công

```bash
# Kiểm tra trạng thái
git status

# Thêm file vào staging
git add .

# Commit với message
git commit -m "Your commit message here"

# Push lên GitHub
git push origin main
```

### ⚙️ Cấu Hình Git (Chỉ cần làm 1 lần)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 🔐 Xác Thực GitHub

1. Tạo Personal Access Token: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Chọn quyền: `repo` (full control)
4. Copy token
5. Khi push, nhập **username** và **token** (không phải password)

### 📝 Commit Message Mẫu

- `Update: Thêm tính năng mới`
- `Fix: Sửa lỗi không vào được trận đấu`
- `Improve: Nâng cao trình độ bot AI`
- `Add: Thêm nhãn số và chữ cho bàn cờ`

**Repository:** https://github.com/YIZ006/Dong-tay-dai-chien

## 🌐 Deploy Online

### Railway (Khuyến nghị - Miễn phí)

1. Fork repository này
2. Đăng ký tại [Railway](https://railway.app)
3. Tạo project mới → Deploy from GitHub
4. Chọn repository
5. Railway tự động detect và deploy
6. Lấy URL và dùng trong game (Global mode)

### Render

⚠️ **QUAN TRỌNG**: Chọn **Web Service** (không phải Static Site) vì có server Node.js với Socket.io.

#### Cách Deploy:

1. Trên Render Dashboard, click **"+ New"**
2. Chọn **"Web Service"** (KHÔNG phải Static Site)
3. Connect GitHub repository: `YIZ006/Dong-tay-dai-chien`

#### Cấu Hình:

- **Name:** `dong-tay-dai-chien`
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Branch:** `main`
- **Auto-Deploy:** Yes

#### Lấy URL:

Sau khi deploy xong, bạn sẽ có URL như:
```
https://dong-tay-dai-chien.onrender.com
```

#### Sử Dụng:

1. Mở game: `index_chess_socketio.html`
2. Chọn chế độ **"🌍 Global (Online)"**
3. Nhập server URL: `https://dong-tay-dai-chien.onrender.com`
4. Tạo phòng và chơi!

⚠️ **Lưu ý Render Free Tier:**
- Service có thể **sleep** sau 15 phút không dùng
- Lần đầu wake up có thể mất 30-60 giây
- Nếu muốn không sleep, cần upgrade lên paid plan

### Heroku

1. Đăng ký tại [Heroku](https://heroku.com)
2. Cài Heroku CLI
3. Login: `heroku login`
4. Tạo app: `heroku create your-app-name`
5. Deploy: `git push heroku main`
6. Mở app: `heroku open`

## 📱 Kết Nối Điện Thoại với Máy Tính

### Yêu Cầu

- ✅ Máy tính và điện thoại **cùng WiFi**
- ✅ Server đang chạy trên máy tính (`npm start`)
- ✅ Firewall cho phép kết nối port 3000

### Bước 1: Tìm IP của Máy Tính

#### Windows:
```bash
ipconfig
```
Tìm dòng **"IPv4 Address"** (ví dụ: `192.168.1.100`)

#### Hoặc xem trong game:
- Mở game trên máy tính
- Chọn chế độ **"Mạng LAN (Local)"**
- IP sẽ hiển thị trong phần thông tin

### Bước 2: Mở Firewall (Nếu Cần)

#### Windows:
1. Mở **Windows Defender Firewall**
2. Click **"Advanced settings"**
3. **Inbound Rules** → **New Rule**
4. Chọn **Port** → **Next**
5. TCP, Specific local ports: `3000` → **Next**
6. **Allow the connection** → **Next**
7. Tích tất cả → **Next**
8. Đặt tên: "Node.js Server" → **Finish**

#### Hoặc chạy lệnh nhanh:
```bash
netsh advfirewall firewall add rule name="Node.js Server" dir=in action=allow protocol=TCP localport=3000
```

### Bước 3: Truy Cập Từ Điện Thoại

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

### Bước 4: Chơi Game

1. **Máy tính**: Tạo phòng → Lấy mã phòng
2. **Điện thoại**: Nhập mã phòng → Tham gia
3. Chơi!

### 🔍 Kiểm Tra Kết Nối

#### Nếu không kết nối được:

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

### 📱 Tips Cho Điện Thoại

- **Sử dụng Chrome** hoặc **Safari** (tốt nhất)
- **Xoay ngang** để màn hình rộng hơn
- **Pin to Home Screen** để dễ truy cập lại
- **Đảm bảo WiFi ổn định** (không dùng mobile data)

## 🎮 Cách Chơi

### Chơi với BOT

1. Chọn **"🤖 Chơi với BOT"**
2. Chọn bên của bạn (Cờ Vua hoặc Cờ Tướng)
3. Chọn độ khó bot (Dễ/Trung Bình/Khó)
4. Nhấn **"Bắt Đầu Chơi Với BOT"**
5. Tung xúc xắc để quyết định ai đi trước
6. Chơi!

**Phím tắt:**
- **Z**: Đi lại (undo) - chỉ trong chế độ bot
- **R**: Reset game
- **S**: Đầu hàng
- **D**: Xin hòa

### Mạng LAN (Local)

1. Chọn **"🌐 Chơi Online"** → **"🌐 Mạng LAN (Local)"**
2. Tạo phòng → Copy mã phòng
3. Người chơi 2 vào: `http://[IP-CỦA-BẠN]:3000/index_chess_socketio.html`
4. Nhập mã phòng và chơi

### Global (Online)

#### Chuẩn Bị:
- ✅ Server đã deploy trên Render: `https://dong-tay-dai-chien.onrender.com`
- ✅ Cả 2 người đều có internet
- ✅ Cả 2 đều mở được URL trên

#### Người Chơi 1 (Tạo Phòng):
1. Mở game: `https://dong-tay-dai-chien.onrender.com`
2. Chọn **"🌍 Global (Online)"**
3. Nhập Server URL: `https://dong-tay-dai-chien.onrender.com` (hoặc để trống)
4. Click **"Tạo Phòng Mới"**
5. Copy mã phòng và gửi cho bạn chơi

#### Người Chơi 2 (Tham Gia):
1. Mở cùng URL: `https://dong-tay-dai-chien.onrender.com`
2. Chọn **"🌍 Global (Online)"**
3. Nhập Server URL: `https://dong-tay-dai-chien.onrender.com` (phải GIỐNG người chơi 1)
4. Nhập mã phòng từ người chơi 1
5. Click **"Tham Gia Phòng"**

#### Lưu Ý:
- ⚠️ Server URL phải **GIỐNG NHAU** cho cả 2 người
- ⚠️ Render Free Tier có thể sleep sau 15 phút, lần đầu wake up mất 30-60 giây
- ✅ Mã phòng 6 ký tự (chữ hoa)

## 🐛 Troubleshooting

### Lỗi "Authentication failed" (GitHub)
- Kiểm tra lại token GitHub
- Đảm bảo token có quyền `repo`

### Lỗi "Repository not found"
- Kiểm tra URL remote: `git remote -v`
- Đảm bảo bạn có quyền truy cập repository

### Lỗi "Không thể kết nối" (Mobile)
- ✅ Kiểm tra cùng WiFi
- ✅ Kiểm tra IP đúng
- ✅ Kiểm tra Firewall
- ✅ Kiểm tra server đang chạy

### Lỗi "Connection refused"
- ✅ Firewall đang chặn
- ✅ Server chưa chạy
- ✅ Port 3000 bị dùng bởi app khác

### Service không start được (Render)
- Kiểm tra logs trong Render Dashboard
- Đảm bảo `package.json` có script `start`
- Kiểm tra port: Render tự động set PORT environment variable

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express
- **Real-time**: Socket.io
- **Deploy**: Railway, Render, Heroku (tùy chọn)

## 📝 Scripts

```bash
npm start      # Chạy server
npm run dev    # Chạy với auto-reload (cần nodemon)
```

## 🤝 Đóng Góp

Contributions are welcome! Feel free to:
- Fork the project
- Create a feature branch
- Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

Created with ❤️ for chess enthusiasts

## 🙏 Acknowledgments

- Socket.io for real-time communication
- Express.js for the server framework
- All contributors and testers

---

⭐ **Star this repo if you find it helpful!**
