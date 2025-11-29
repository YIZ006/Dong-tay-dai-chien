# HƯỚNG DẪN THAY ẢNH BÀN CỜ

## Cách thay ảnh bàn cờ:

### Bước 1: Chuẩn bị ảnh
1. Chuẩn bị file ảnh bàn cờ của bạn (định dạng: `.jpg`, `.png`, `.jpeg`, `.webp`)
2. Đặt tên file (ví dụ: `board-image.jpg`, `ban-co-cua-toi.png`, v.v.)
3. **Đặt file ảnh vào cùng thư mục với file `index_chess_socketio.html`**

### Bước 2: Thay đổi trong code

Mở file `index_chess_socketio.html` và tìm dòng này (khoảng dòng 13):

```css
--board-image: url('board-image.jpg'); /* Thay 'board-image.jpg' bằng tên file ảnh của bạn */
```

Thay `'board-image.jpg'` bằng tên file ảnh của bạn, ví dụ:
- `url('ban-co-cua-toi.png')`
- `url('my-board.jpg')`
- `url('chess-board.webp')`

### Bước 3: Tùy chỉnh hiển thị (tùy chọn)

Nếu muốn điều chỉnh cách hiển thị ảnh, tìm dòng này (khoảng dòng 146):

```css
background-size: cover; /* Hoặc 'contain' tùy bạn muốn */
```

- `cover`: Ảnh sẽ phủ đầy bàn cờ, có thể bị cắt một phần
- `contain`: Ảnh sẽ hiển thị đầy đủ trong bàn cờ, có thể có khoảng trống
- Hoặc bạn có thể đặt kích thước cụ thể: `background-size: 540px 600px;` (9x10 cells × 60px)

### Ví dụ:

Nếu bạn có file ảnh tên `ban-co-dep.jpg`:

1. Đặt file `ban-co-dep.jpg` vào thư mục project
2. Sửa dòng 13 thành:
   ```css
   --board-image: url('ban-co-dep.jpg');
   ```

### Lưu ý:

- **Kích thước ảnh khuyến nghị**: Khoảng 540px × 600px (hoặc tỷ lệ 9:10) để vừa với bàn cờ 9×10 ô
- **Định dạng ảnh**: `.jpg`, `.png`, `.jpeg`, `.webp` đều được hỗ trợ
- **Nếu ảnh không hiển thị**: Kiểm tra lại đường dẫn file và đảm bảo file ảnh ở đúng thư mục
- **Màu nền dự phòng**: Nếu ảnh không load được, sẽ hiển thị màu nâu nhạt (`#deb887`)

### Nếu muốn dùng ảnh từ URL online:

Thay vì đường dẫn file local, bạn có thể dùng URL:
```css
--board-image: url('https://example.com/path/to/board-image.jpg');
```

### Nếu muốn quay lại dùng màu nền:

Xóa hoặc comment dòng `background-image` và chỉ dùng:
```css
background: var(--board-bg);
```

