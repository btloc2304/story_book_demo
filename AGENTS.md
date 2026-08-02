# AGENTS.md — Quy tắc dành cho AI Agent trong dự án này

## 1. Quy tắc Verify bắt buộc

**Mỗi lần hoàn thành một task (tạo component, sửa bug, thay đổi config, v.v.), Agent PHẢI tự verify lại kết quả trước khi báo cáo hoàn thành.**

### Cách verify:

1. **Dùng Playwright MCP (ưu tiên cao nhất):**
   - Mở trang Storybook local (`http://localhost:6008/`) hoặc trang deploy (`https://btloc2304.github.io/story_book_demo/`).
   - Dùng `navigate_page`, `take_snapshot`, `take_screenshot` để kiểm tra giao diện thực tế.
   - Click vào từng component vừa thay đổi trong sidebar, xác nhận nó render đúng.
   - Kiểm tra console log bằng `evaluate_script` để đảm bảo không có runtime error.

2. **Dùng Puppeteer script (phương án thay thế):**
   - Viết script Node.js sử dụng Puppeteer để tự động mở trình duyệt headless.
   - Điều hướng tới từng story URL (`/iframe.html?id=...&viewMode=story`).
   - Lắng nghe `page.on('console')` và `page.on('pageerror')` để phát hiện lỗi.
   - Chụp screenshot làm bằng chứng.

3. **Chạy lệnh build/test:**
   - `npm run build-storybook` — đảm bảo build không lỗi.
   - `npx test-storybook` — chạy interaction tests (nếu có).

### Những gì cần verify:

- [ ] Component render trên Storybook mà không bị lỗi trắng trang.
- [ ] Không có `Error` trong browser console (warning chấp nhận được).
- [ ] Sidebar Storybook hiển thị đúng tên component dưới nhóm `Lucent UI/`.
- [ ] Các controls (knobs) trong Storybook panel hoạt động đúng.
- [ ] Screenshot chụp được component hiển thị rõ ràng (không blank).

## 2. Quy tắc chung

- **Không được báo "done" mà chưa verify.** Nếu verify thất bại, phải sửa và verify lại.
- **Luôn commit với message rõ ràng** theo format: `feat:`, `fix:`, `chore:`, `ci:`.
- **Giữ sidebar Storybook gọn gàng:** Tất cả component đặt dưới nhóm `Lucent UI/` (title trong stories).
- **Dùng `--legacy-peer-deps`** khi chạy `npm ci` hoặc `npm install` do conflict giữa Storybook và Angular.
- **Sau khi push, kiểm tra GitHub Actions** bằng `gh run list` để đảm bảo CI/CD không fail.

## 3. URLs quan trọng

| Mục đích | URL |
|---|---|
| Storybook Local | `http://localhost:6008/` |
| Storybook Deploy (GitHub Pages) | `https://btloc2304.github.io/story_book_demo/` |
| GitHub Repo | `https://github.com/btloc2304/story_book_demo` |
| Figma Design | `https://www.figma.com/design/Njpq1ncXsldoHXqVOKgFWo/Lucent-UI` |
