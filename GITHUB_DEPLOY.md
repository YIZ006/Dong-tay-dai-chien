# 🚀 Hướng Dẫn Deploy Lên GitHub

## Bước 1: Tạo Repository trên GitHub

1. Đăng nhập vào [GitHub](https://github.com)
2. Click nút **"+"** ở góc trên bên phải → **"New repository"**
3. Đặt tên repository (ví dụ: `dong-tay-dai-chien`)
4. Chọn **Public** hoặc **Private**
5. **KHÔNG** tích "Initialize with README" (vì đã có code)
6. Click **"Create repository"**

## Bước 2: Khởi Tạo Git trong Project

Mở terminal trong thư mục project và chạy:

```bash
# Khởi tạo git repository
git init

# Thêm tất cả files
git add .

# Commit lần đầu
git commit -m "Initial commit: Đông Tây Đại Chiến game"
```

## Bước 3: Kết Nối với GitHub

```bash
# Thêm remote repository (thay YOUR_USERNAME và REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Đổi tên branch thành main (nếu cần)
git branch -M main

# Push code lên GitHub
git push -u origin main
```

## Bước 4: Kiểm Tra

Vào GitHub repository của bạn, bạn sẽ thấy tất cả files đã được upload.

## 🔄 Cập Nhật Code Sau Này

Khi có thay đổi code:

```bash
# Xem thay đổi
git status

# Thêm files đã thay đổi
git add .

# Commit với message mô tả
git commit -m "Mô tả thay đổi của bạn"

# Push lên GitHub
git push
```

## 🌐 Deploy Từ GitHub

Sau khi code đã trên GitHub, bạn có thể deploy lên các platform:

### Railway (Khuyến nghị)

1. Đăng ký tại [Railway](https://railway.app)
2. Click **"New Project"**
3. Chọn **"Deploy from GitHub repo"**
4. Chọn repository của bạn
5. Railway tự động detect Node.js và deploy
6. Lấy URL và dùng trong game!

### Render

1. Đăng ký tại [Render](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub account
4. Chọn repository
5. Settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Click **"Create Web Service"**
7. Đợi deploy xong và lấy URL

### Heroku

1. Cài [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Login: `heroku login`
3. Tạo app: `heroku create your-app-name`
4. Deploy: `git push heroku main`
5. Mở: `heroku open`

## 📋 Checklist Trước Khi Push

- [ ] Đã tạo `.gitignore` (đã có sẵn)
- [ ] Đã tạo `README.md` (đã có sẵn)
- [ ] Đã test code chạy được (`npm start`)
- [ ] Không có file nhạy cảm (API keys, passwords)
- [ ] Code đã được format đẹp

## 🔒 Bảo Mật

**QUAN TRỌNG**: Không commit các file sau:
- `.env` (nếu có)
- `node_modules/`
- API keys hoặc passwords
- File cá nhân

File `.gitignore` đã được cấu hình để tự động bỏ qua các file này.

## 🐛 Troubleshooting

### Lỗi "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
```

### Lỗi authentication
```bash
# Sử dụng Personal Access Token thay vì password
# Hoặc setup SSH key
```

### Lỗi "failed to push"
```bash
# Pull code mới nhất trước
git pull origin main --rebase

# Sau đó push lại
git push
```

## 📖 Git Commands Hữu Ích

```bash
# Xem status
git status

# Xem lịch sử commit
git log

# Xem thay đổi
git diff

# Tạo branch mới
git checkout -b feature-name

# Merge branch
git merge feature-name

# Xóa file khỏi git (nhưng giữ file local)
git rm --cached filename
```

## 🎯 Next Steps

Sau khi deploy lên GitHub:
1. ✅ Share link repository với bạn bè
2. ✅ Deploy lên Railway/Render để chơi online
3. ✅ Thêm GitHub Pages nếu muốn host static files
4. ✅ Tạo Issues và Pull Requests để cải thiện

## 📚 Tài Liệu Tham Khảo

- [GitHub Docs](https://docs.github.com)
- [Git Basics](https://git-scm.com/book)
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)

---

**Chúc bạn deploy thành công! 🎉**

