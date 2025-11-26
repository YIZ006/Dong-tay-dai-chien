# 🚀 Hướng Dẫn Deploy Lên Render

## ⚠️ QUAN TRỌNG: Chọn Đúng Service Type

Game này cần **Web Service** (không phải Static Site) vì có server Node.js với Socket.io.

## Cách Deploy Đúng

### Bước 1: Chọn Service Type

1. Trên Render Dashboard, click **"+ New"**
2. Chọn **"Web Service"** (KHÔNG phải Static Site)
3. Connect GitHub repository: `YIZ006/Dong-tay-dai-chien`

### Bước 2: Cấu Hình Web Service

**Name:** `dong-tay-dai-chien` (hoặc tên bạn muốn)

**Environment:** `Node`

**Build Command:** 
```
npm install
```

**Start Command:**
```
npm start
```

**Branch:** `main`

**Root Directory:** (Để trống)

**Auto-Deploy:** Yes (tự động deploy khi có code mới)

### Bước 3: Deploy

1. Click **"Create Web Service"**
2. Render sẽ tự động:
   - Clone code từ GitHub
   - Chạy `npm install`
   - Chạy `npm start`
   - Deploy service
3. Đợi 5-10 phút để deploy xong

### Bước 4: Lấy URL

Sau khi deploy xong, bạn sẽ có URL như:
```
https://dong-tay-dai-chien.onrender.com
```

## Sử Dụng URL Trong Game

1. Mở game: `index_chess_socketio.html`
2. Chọn chế độ **"🌍 Global (Online)"**
3. Nhập server URL: `https://dong-tay-dai-chien.onrender.com`
4. Tạo phòng và chơi!

## ⚠️ Lưu Ý Render Free Tier

- Service có thể **sleep** sau 15 phút không dùng
- Lần đầu wake up có thể mất 30-60 giây
- Nếu muốn không sleep, cần upgrade lên paid plan

## 🐛 Troubleshooting

### Service không start được
- Kiểm tra logs trong Render Dashboard
- Đảm bảo `package.json` có script `start`
- Kiểm tra port: Render tự động set PORT environment variable

### Không kết nối được
- Đảm bảo dùng URL đầy đủ với `https://`
- Kiểm tra service đã running chưa
- Xem logs để biết lỗi

## 📝 File render.yaml (Đã có sẵn)

File `render.yaml` đã được tạo và push lên GitHub. Bạn có thể:
- Dùng Blueprint để deploy tự động từ `render.yaml`
- Hoặc deploy thủ công như hướng dẫn trên

---

**Chúc bạn deploy thành công! 🎉**

