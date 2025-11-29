# 🚀 Hướng Dẫn Deploy Nhanh Lên GitHub

## Cách 1: Dùng Script Tự Động (Khuyến nghị)

### Windows:
1. **Double-click** vào file `push-to-github.bat`
2. Nhập commit message (hoặc Enter để dùng mặc định)
3. Đợi script tự động deploy!

### Linux/Mac:
```bash
chmod +x deploy-to-github.sh
./deploy-to-github.sh
```

## Cách 2: Deploy Thủ Công

### Bước 1: Kiểm tra trạng thái
```bash
git status
```

### Bước 2: Thêm file vào staging
```bash
git add .
```

### Bước 3: Commit với message
```bash
git commit -m "Your commit message here"
```

### Bước 4: Push lên GitHub
```bash
git push origin main
```

## ⚙️ Cấu Hình Git (Chỉ cần làm 1 lần)

Nếu chưa cấu hình Git, chạy các lệnh sau:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 🔐 Xác Thực GitHub

### Tạo Personal Access Token:
1. Vào: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Chọn quyền: `repo` (full control)
4. Copy token

### Sử dụng Token:
- Khi push, nhập **username** của bạn
- Password: nhập **token** vừa tạo (không phải password GitHub)

## 📝 Commit Message Mẫu

- `Update: Thêm tính năng mới`
- `Fix: Sửa lỗi không vào được trận đấu`
- `Improve: Nâng cao trình độ bot AI`
- `Add: Thêm nhãn số và chữ cho bàn cờ`

## ❓ Xử Lý Lỗi

### Lỗi: "Authentication failed"
- Kiểm tra lại token GitHub
- Đảm bảo token có quyền `repo`

### Lỗi: "Repository not found"
- Kiểm tra URL remote: `git remote -v`
- Đảm bảo bạn có quyền truy cập repository

### Lỗi: "Nothing to commit"
- Không có thay đổi nào để commit
- Kiểm tra lại với `git status`

## 🎯 Tips

- **Commit thường xuyên**: Mỗi khi có thay đổi quan trọng
- **Commit message rõ ràng**: Mô tả ngắn gọn những gì đã thay đổi
- **Push ngay sau commit**: Tránh mất code

---

**Repository:** https://github.com/YIZ006/Dong-tay-dai-chien

