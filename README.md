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
- 🔒 **Bảo mật**: Validation và rate limiting

## 🚀 Quick Start

### Yêu Cầu

- Node.js 14+ 
- npm hoặc yarn

### Cài Đặt

```bash
# Clone repository
git clone https://github.com/your-username/dong-tay-dai-chien.git
cd dong-tay-dai-chien

# Cài đặt dependencies
npm install

# Chạy server
npm start
```

### Sử Dụng

1. Mở browser và vào: `http://localhost:3000/index_chess_socketio.html`
2. Chọn chế độ:
   - **Mạng LAN**: Chơi với người cùng WiFi
   - **Global**: Chơi qua internet (cần deploy server)
3. Tạo phòng hoặc tham gia phòng
4. Chơi!

## 📁 Cấu Trúc Project

```
dong-tay-dai-chien/
├── server.js                 # Node.js server với Socket.io
├── package.json             # Dependencies
├── index_chess_socketio.html # Client HTML (Online mode)
├── index_chess.html         # Client HTML (Offline mode)
├── .gitignore              # Git ignore rules
├── README.md               # File này
├── SETUP_SOCKETIO.md       # Hướng dẫn setup chi tiết
├── QUICK_START.md          # Hướng dẫn nhanh
├── NETWORK_MODE_GUIDE.md   # Hướng dẫn chế độ mạng
└── ALTERNATIVE_SOLUTIONS.md # Các giải pháp thay thế
```

## 🌐 Deploy Online

### Railway (Khuyến nghị - Miễn phí)

1. Fork repository này
2. Đăng ký tại [Railway](https://railway.app)
3. Tạo project mới → Deploy from GitHub
4. Chọn repository
5. Railway tự động detect và deploy
6. Lấy URL và dùng trong game (Global mode)

### Render

1. Đăng ký tại [Render](https://render.com)
2. Tạo Web Service mới
3. Connect GitHub repository
4. Build command: `npm install`
5. Start command: `npm start`
6. Deploy!

### Heroku

1. Đăng ký tại [Heroku](https://heroku.com)
2. Cài Heroku CLI
3. Login: `heroku login`
4. Tạo app: `heroku create your-app-name`
5. Deploy: `git push heroku main`
6. Mở app: `heroku open`

## 🎮 Cách Chơi

### Mạng LAN (Local)

1. Chọn "🌐 Mạng LAN (Local)"
2. Tạo phòng → Copy mã phòng
3. Người chơi 2 vào: `http://[IP-CỦA-BẠN]:3000/index_chess_socketio.html`
4. Nhập mã phòng và chơi

### Global (Online)

1. Deploy server lên Railway/Render
2. Chọn "🌍 Global (Online)"
3. Nhập server URL
4. Tạo phòng → Chia sẻ mã phòng + URL
5. Người chơi 2 nhập cùng URL và mã phòng

## 📚 Tài Liệu

- [SETUP_SOCKETIO.md](SETUP_SOCKETIO.md) - Hướng dẫn setup chi tiết
- [QUICK_START.md](QUICK_START.md) - Hướng dẫn nhanh
- [NETWORK_MODE_GUIDE.md](NETWORK_MODE_GUIDE.md) - Hướng dẫn chế độ mạng
- [ALTERNATIVE_SOLUTIONS.md](ALTERNATIVE_SOLUTIONS.md) - Các giải pháp thay thế

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

