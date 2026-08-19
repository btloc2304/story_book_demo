# Cloudflare Pages + Google SSO Setup Guide — Lucent Storybook

> **Tài liệu hướng dẫn thực tế** dựa trên giao diện Cloudflare & Google Cloud mới nhất, đã được kiểm chứng qua quá trình setup thực tế.

---

## 📌 Mục lục

1. [Tổng quan kiến trúc & Yêu cầu](#1-tổng-quan-kiến-trúc--yêu-cầu)
2. [Bước 1: Cấu hình Repo (.npmrc)](#bước-1-cấu-hình-repo-npmrc)
3. [Bước 2: Tạo Cloudflare Pages Project](#bước-2-tạo-cloudflare-pages-project)
4. [Bước 3: Tạo Google OAuth Credentials (Google Auth Platform)](#bước-3-tạo-google-oauth-credentials-google-auth-platform)
5. [Bước 4: Khởi tạo Cloudflare Zero Trust & Thêm Google IdP](#bước-4-khởi-tạo-cloudflare-zero-trust--thêm-google-idp)
6. [Bước 5: Tạo Access Policy bảo vệ Storybook](#bước-5-tạo-access-policy-bảo-vệ-storybook)
7. [Bước 6: Gắn Custom Domain (Tùy chọn)](#bước-6-gắn-custom-domain-tùy-chọn)
8. [Xử lý sự cố thường gặp (Troubleshooting)](#xử-lý-sự-cố-thường-gặp-troubleshooting)

---

## 1. Tổng quan kiến trúc & Yêu cầu

```
Người dùng (Sếp / Dev / QA) 
       ⬇️
Truy cập: https://lucent-storybook.pages.dev (hoặc custom domain)
       ⬇️
Cloudflare Access (chặn ở Edge Server - không thể bypass)
       ⬇️
Yêu cầu "Sign in with Google" (Google OAuth 2.0)
       ⬇️
Chỉ Email nằm trong whitelist (bạn, sếp, team) mới được cấp quyền
       ⬇️
Xem Storybook đầy đủ tính năng
```

### Yêu cầu chuẩn bị:
- [x] Tài khoản Cloudflare (gói Free).
- [x] Tài khoản Google Cloud (dùng Gmail cá nhân hoặc email công ty đều được).
- [x] GitHub repo chứa Storybook (`btloc2304/story_book_demo`).

---

## Bước 1: Cấu hình Repo (.npmrc)

Do Storybook 8 và Angular 18 có xung đột peer dependencies, Cloudflare Pages sẽ chạy `npm ci` và báo lỗi `ERESOLVE`.

Tạo file `.npmrc` ở thư mục gốc repo:
```ini
legacy-peer-deps=true
```
Commit và push lên branch `master`:
```bash
git add .npmrc
git commit -m "chore: add .npmrc for legacy peer deps"
git push origin master
```

---

## Bước 2: Tạo Cloudflare Pages Project

1. Đăng nhập [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Sidebar trái > **Compute** > **Workers & Pages**.
3. Bấm **Create application** (nút màu xanh).
4. ⚠️ **LƯU Ý QUAN TRỌNG:** Ở màn hình chọn phương thức, **không bấm nút Connect GitHub ở trên** (đó là tạo Worker). Hãy nhìn xuống đáy khung trắng và click vào dòng chữ:
   > **`Looking to deploy Pages? Get started`**
5. Chọn tab **Pages** > **Connect to Git** > Chọn repo `btloc2304/story_book_demo`.
6. Điền thông số build:
   - **Project name**: `lucent-storybook`
   - **Production branch**: `master`
   - **Framework preset**: `None`
   - **Build command**: `npm run build-storybook`
   - **Build output directory**: `storybook-static`
7. Mở rộng **Environment variables (advanced)** > Thêm:
   - `NODE_VERSION` = `20`
   - `NPM_CONFIG_LEGACY_PEER_DEPS` = `true`
8. Bấm **Save and Deploy**. Khi hoàn tất, bạn sẽ có URL: `https://lucent-storybook.pages.dev`.

---

## Bước 3: Tạo Google OAuth Credentials (Google Auth Platform)

1. Mở [Google Cloud Console](https://console.cloud.google.com/).
2. Menu ☰ góc trái > **APIs & Services** (hoặc truy cập trực tiếp mục *Google Auth Platform*).
3. **Mục `Branding`**:
   - App name: `Storybook Access`
   - User support email: Email của bạn.
   - Developer contact info: Email của bạn.
   - Authorized domains: `cloudflareaccess.com`
   - Bấm **Save**.
4. **Mục `Audience`**:
   - User type: Chọn **`External`**.
   - Phần **Test users**: Bấm **+ Add users** > Nhập email của bạn và email của sếp > Bấm **Save**.
5. **Mục `Clients`** (hoặc Credentials > + Create Credentials > OAuth client ID):
   - Application type: **`Web application`**
   - Name: `Cloudflare Access`
   - Mục **Authorized redirect URIs** > Bấm **+ Add URI** > Nhập:
     ```text
     https://lucent-storybook.cloudflareaccess.com/cdn-cgi/access/callback
     ```
     *(Thay `lucent-storybook` bằng Team Name của bạn ở Bước 4)*.
   - Bấm **Create** > **Copy `Client ID` và `Client Secret`**.

---

## Bước 4: Khởi tạo Cloudflare Zero Trust & Thêm Google IdP

1. Trên Cloudflare Dashboard > Sidebar trái > **Zero Trust** (hoặc truy cập `one.dash.cloudflare.com`).
2. Nếu là lần đầu: Bấm **Get started** > Đặt **Team name** (ví dụ: `lucent-storybook`) > Chọn gói **Free ($0)** > Điền thông tin xác minh.
3. Trong Zero Trust Dashboard > Sidebar trái > Chọn **`Integrations`** > **`Identity providers`**.
4. Bấm **Add new identity provider** > Chọn **Google**.
5. Dán **Client ID** và **Client Secret** (từ Bước 3).
6. Bấm **Save** (có thể bấm *Test* để xác thực kết nối).

---

## Bước 5: Tạo Access Policy bảo vệ Storybook

1. Trong Zero Trust Dashboard > Sidebar trái > **`Access`** > **`Applications`**.
2. Bấm **Add an application** > Chọn **Self-hosted**.
3. **Trang Overview**:
   - Application name: `Storybook POC`
   - Session Duration: `24 hours`
   - Application domain: `lucent-storybook.pages.dev` (hoặc custom domain của bạn).
   - Identity providers: Chọn **Google**.
   - Bấm **Next**.
4. **Trang Policies**:
   - Policy name: `Allow Team Members`
   - Action: **Allow**
   - Mục **Configure rules** > **Include**:
     - *Selector*: **Emails** (nhập từng email: bạn, sếp) HOẶC **Emails ending in** (nếu có domain công ty như `@company.com`).
   - Bấm **Next** > Bấm **Add application**.

---

## Bước 6: Gắn Custom Domain (Tùy chọn)

Nếu bạn có domain riêng (ví dụ: `buitaloc.tech`):

1. Vào Cloudflare Dashboard > **Workers & Pages** > Chọn project `lucent-storybook`.
2. Tab **Custom domains** > Bấm **Set up a custom domain**.
3. Nhập: `storybook.buitaloc.tech` > Bấm **Continue** > Cloudflare tự động cấu hình DNS CNAME.
4. Quay lại Zero Trust > **Access** > **Applications** > Sửa Application domain thành `storybook.buitaloc.tech`.

---

## 🧪 Kiểm tra kết quả

1. Mở **Trình duyệt ẩn danh (Incognito Window)**.
2. Truy cập: `https://lucent-storybook.pages.dev` (hoặc `https://storybook.buitaloc.tech`).
3. ✅ Trang chuyển hướng sang màn hình Cloudflare Access có nút **"Sign in with Google"**.
4. Đăng nhập bằng email ngoài danh sách test ➡️ **Access Denied**.
5. Đăng nhập bằng email đã whitelist (bạn / sếp) ➡️ **Truy cập Storybook thành công!** 🎉

---

## 🛠️ Troubleshooting

| Lỗi | Nguyên nhân | Cách khắc phục |
|---|---|---|
| `npm error code ERESOLVE` | Xung đột peer dependencies giữa Storybook & Angular | Đảm bảo file `.npmrc` có `legacy-peer-deps=true` đã được push lên `master`. |
| `redirect_uri_mismatch` khi login Google | URI trong Google Cloud Console khác với Team domain Cloudflare | Kiểm tra mục *Authorized redirect URIs* trong GCP: phải đúng định dạng `https://<team-name>.cloudflareaccess.com/cdn-cgi/access/callback`. |
| `Access Denied` sau khi login Google | Email chưa được thêm vào Test Users hoặc Access Policy | 1. GCP Console > Audience > Thêm email vào Test Users.<br>2. Cloudflare Zero Trust > Applications > Policy > Include email. |
| Bấm Create app bị ra Worker thay vì Pages | Giao diện Cloudflare gộp chung Workers & Pages | Tìm dòng chữ *"Looking to deploy Pages? Get started"* ở đáy trang hoặc vào thẳng `/pages/new`. |
