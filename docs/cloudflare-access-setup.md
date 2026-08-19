# Hướng Dẫn Toàn Diện: Cấu Hình Cloudflare Pages + Google SSO Cho Storybook

> **Tài liệu tổng hợp thực chiến** — Đã ghi nhận và giải quyết toàn bộ các vướng mắc, lỗi phát sinh và thay đổi giao diện thực tế từ Cloudflare và Google Cloud.

---

## 📌 Mục lục

1. [Tổng quan kiến trúc & Cách hoạt động](#1-tổng-quan-kiến-trúc--cách-hoạt-động)
2. [Bước 1: Cấu hình Repo (`.npmrc`) tránh lỗi build ERESOLVE](#bước-1-cấu-hình-repo-npmrc-tránh-lỗi-build-eresolve)
3. [Bước 2: Tạo Cloudflare Pages Project (Tránh nhầm sang Worker)](#bước-2-tạo-cloudflare-pages-project-tránh-nhầm-sang-worker)
4. [Bước 3: Tạo Google OAuth Credentials (Google Auth Platform mới)](#bước-3-tạo-google-oauth-credentials-google-auth-platform-mới)
5. [Bước 4: Khởi tạo Cloudflare Zero Trust & Thêm Google IdP](#bước-4-khởi-tạo-cloudflare-zero-trust--thêm-google-idp)
6. [Bước 5: Tạo Access Policy khóa Storybook (Chi tiết từng ô giao diện)](#bước-5-tạo-access-policy-khóa-storybook-chi-tiết-từng-ô-giao-diện)
7. [Bước 6: Cơ chế Đăng xuất (Logout) & Nút Logout tích hợp](#bước-6-cơ-chế-đăng-xuất-logout--nút-logout-tích-hợp)
8. [Tổng hợp các câu hỏi & lỗi thường gặp (FAQ & Troubleshooting)](#tổng-hợp-các-câu-hỏi--lỗi-thường-gặp-faq--troubleshooting)

---

## 1. Tổng quan kiến trúc & Cách hoạt động

```
[ Người Dùng (Sếp / Dev / QA) ]
              ⬇️
Truy cập: https://lucent-storybook.pages.dev (hoặc custom domain)
              ⬇️
Cloudflare Access (Kiểm tra Cookie CF_Authorization ở Edge)
       ├── ĐÃ ĐĂNG NHẬP ───> Cho phép xem Storybook (Render đầy đủ)
       └── CHƯA ĐĂNG NHẬP ─> Hiển thị trang chặn Cloudflare Access
                                      ⬇️
                             Bấm "Sign in with Google"
                                      ⬇️
                        Google OAuth 2.0 xác thực danh tính
                                      ⬇️
                        Cloudflare đối chiếu email với Whitelist:
                        - Nếu có trong danh sách -> Cấp Cookie -> Vào trang ✅
                        - Nếu ngoài danh sách -> Access Denied ❌
```

---

## Bước 1: Cấu hình Repo (`.npmrc`) tránh lỗi build ERESOLVE

### Vấn đề:
Khi Cloudflare Pages clone code về, nó tự động chạy `npm clean-install` (`npm ci`). Do Storybook và Angular có xung đột peer dependencies (`@storybook/test-runner` vs `storybook`), build sẽ bị văng lỗi `npm error code ERESOLVE`.

### Giải pháp:
Tạo file [`.npmrc`](file:///Users/lucas/Workspace/Repos/Sandbox/story_book_demo/.npmrc) ngay tại thư mục gốc của repository:

```ini
legacy-peer-deps=true
```

Commit và push lên GitHub:
```bash
git add .npmrc
git commit -m "chore: add .npmrc for legacy peer deps"
git push origin master
```

---

## Bước 2: Tạo Cloudflare Pages Project (Tránh nhầm sang Worker)

1. Đăng nhập [Cloudflare Dashboard](https://dash.cloudflare.com/) > Sidebar trái chọn **Compute** > **Workers & Pages**.
2. Bấm nút màu xanh **Create application**.
3. ⚠️ **BẪY GIAO DIỆN CẦN TRÁNH:** 
   - Không bấm vào nút **Connect GitHub** to ở giữa màn hình (nút đó sẽ tạo *Cloudflare Worker* chạy code serverless).
   - Hãy nhìn xuống **đáy của khung trắng**, tìm dòng chữ nhỏ:
     > **`Looking to deploy Pages? Get started`**
   - Click vào chữ **`Get started`** (hoặc mở trực tiếp link `/pages/new`).
4. Chọn **Pages** > **Connect to Git** > Chọn repo `btloc2304/story_book_demo`.
5. Cấu hình thông số build:
   - **Project name**: `lucent-storybook`
   - **Production branch**: `master`
   - **Framework preset**: `None`
   - **Build command**: `npm run build-storybook`
   - **Build output directory**: `storybook-static`
6. Mở rộng mục **Environment variables (advanced)** > Thêm 2 biến:
   - `NODE_VERSION` = `20`
   - `NPM_CONFIG_LEGACY_PEER_DEPS` = `true`
7. Bấm **Save and Deploy**. Khi build xong, bạn sẽ nhận được URL: `https://lucent-storybook.pages.dev`.

---

## Bước 3: Tạo Google OAuth Credentials (Google Auth Platform mới)

> 💡 *Giao diện Google Cloud gần đây đã đổi tên `OAuth consent screen` thành `Google Auth Platform`.*

1. Mở [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. **Tab `Branding`** (sidebar trái):
   - **App name**: `Storybook Access`
   - **User support email**: Chọn email của bạn.
   - **Developer contact information**: Nhập email của bạn.
   - **Authorized domains**: Thêm `cloudflareaccess.com`.
   - Bấm **Save**.
3. **Tab `Audience`** (sidebar trái):
   - **User type**: Chọn **`External`** *(Do dùng Gmail cá nhân/trường học, không có tổ chức Google Workspace nên không chọn được Internal)*.
   - Mục **Test users**: Bấm **+ Add users** > Nhập email của bạn và email của sếp > Bấm **Save**.
4. **Tab `Clients`** (hoặc *+ CREATE CREDENTIALS* > *OAuth client ID*):
   - **Application type**: Chọn **`Web application`**.
   - **Name**: `Cloudflare Access`.
   - Mục **Authorized redirect URIs** > Bấm **+ Add URI** > Nhập chính xác:
     ```text
     https://lucent-storybook.cloudflareaccess.com/cdn-cgi/access/callback
     ```
     *(Thay `lucent-storybook` bằng Team Name Cloudflare Zero Trust của bạn)*.
   - Bấm **Create** > **Copy `Client ID` và `Client Secret`** hiển thị trên popup.

---

## Bước 4: Khởi tạo Cloudflare Zero Trust & Thêm Google IdP

1. Trên Cloudflare Dashboard > Sidebar trái chọn **Zero Trust** (hoặc vào `one.dash.cloudflare.com`).
2. Nếu là lần đầu khởi tạo:
   - Đặt **Team name**: `lucent-storybook` (tạo ra domain `lucent-storybook.cloudflareaccess.com`).
   - Chọn gói: **Free ($0/tháng cho 50 users)**.
   - ⚠️ *Cloudflare yêu cầu nhập thẻ ngân hàng/PayPal để chống bot spam danh tính, nhưng không trừ tiền hàng tháng.*
3. Trong Zero Trust Dashboard > Sidebar trái > Tìm mục **`Integrations`** ➡️ chọn **`Identity providers`**.
4. Bấm **Add new identity provider** (hoặc *Add new*) > Chọn **`Google`**.
5. Dán **Client ID** và **Client Secret** (đã lấy ở Bước 3).
6. Bấm **Save**.

---

## Bước 5: Tạo Access Policy khóa Storybook (Chi tiết từng ô giao diện)

1. Trong Zero Trust Dashboard > Sidebar trái > Tìm mục **`Access controls`** ➡️ chọn **`Applications`**.
2. Bấm **Add an application** > Modal hiện ra chọn tab đầu tiên **Self-hosted and private** > Bấm nút màu xanh **`Continue with Self-hosted and private`** *(Mấy tab như Public DNS, Workers chỉ là hình minh họa, không cần quan tâm)*.
3. **Mục `Destinations`**:
   - Nếu dùng domain mặc định `lucent-storybook.pages.dev`: Bấm vào dòng chữ xanh **`Switch to custom input`** (dưới ô Subdomain) ➡️ Nhập: `lucent-storybook.pages.dev`.
   - Nếu dùng custom domain `storybook.buitaloc.tech`: Ô Subdomain gõ `storybook`, ô Domain chọn dropdown `buitaloc.tech`.
4. **Mục `Access policies`**:
   - Ở góc phải trên của bảng, bấm vào nút **`Builder`** (bên cạnh *Policy list*).
   - **Cột bên phải (Policy details)**:
     - Policy Name: `Allow Team`
     - Action: `Allow`
   - **Cột bên trái (Policy rules - dưới chữ tím OR Include)**:
     - Ô dropdown `Selector is...`: Chọn **`Emails`**.
     - Ô `Value is...`: Nhập các email được phép truy cập (email của bạn, email của sếp...).
   - Bấm nút màu xanh **`Save policy`** ở góc dưới bên phải card.
5. Kéo xuống đáy trang > Bấm **`Save application`** (hoặc *Create application*).

---

## Bước 6: Cơ chế Đăng xuất (Logout) & Nút Logout tích hợp

### Cách hoạt động của Logout:
Cloudflare Access xác thực người dùng qua cookie `CF_Authorization`. Khi truy cập endpoint `/cdn-cgi/access/logout`, Cloudflare sẽ xóa cookie này và hủy session.

### 3 Cách để Đăng xuất:

#### 1. Nút "🚪 Đăng xuất" tích hợp sẵn trong Storybook:
Dự án đã được cấu hình file [`.storybook/manager-head.html`](file:///Users/lucas/Workspace/Repos/Sandbox/story_book_demo/projects/lucent-ui/.storybook/manager-head.html). Nút **`🚪 Đăng xuất`** màu đỏ sẽ tự động xuất hiện ở góc trên thanh công cụ Storybook. Click vào nút này sẽ tự động đăng xuất ra màn hình Google Login.

#### 2. Truy cập URL Logout trực tiếp:
```text
https://lucent-storybook.pages.dev/cdn-cgi/access/logout
```

#### 3. Đóng cửa sổ ẩn danh (Incognito) hoặc xóa cookie:
Xóa cookie `CF_Authorization` trong DevTools hoặc đóng trình duyệt ẩn danh.

---

## Tổng hợp các câu hỏi & lỗi thường gặp (FAQ & Troubleshooting)

### ❓ Q1: Tại sao chọn gói Free mà Cloudflare vẫn bắt nhập thẻ Credit Card?
**A:** Đây là chính sách chống tạo tài khoản ảo và bot spam của Cloudflare Zero Trust. Số tiền thanh toán là $0.00 / tháng cho team dưới 50 người. Bạn không bị tính phí.

### ❓ Q2: Tôi chưa có email công ty riêng (@buitaloc.tech) thì có làm Google SSO được không?
**A:** Được 100%! Trong Google Cloud Console bạn chọn User type là **External** và thêm email cá nhân (Gmail) của bạn và sếp vào mục **Test users** ở tab Audience.

### ❓ Q3: Lỗi `npm error code ERESOLVE` khi Cloudflare build?
**A:** Kiểm tra xem file `.npmrc` với nội dung `legacy-peer-deps=true` đã được push lên branch `master` chưa, và thêm biến môi trường `NPM_CONFIG_LEGACY_PEER_DEPS=true` vào cài đặt của Pages project.

### ❓ Q4: Lỗi `redirect_uri_mismatch` khi bấm Sign in with Google?
**A:** Do URL trong mục *Authorized redirect URIs* bên Google Cloud không khớp với Team domain Cloudflare. Hãy đảm bảo format chuẩn:
`https://<team-name>.cloudflareaccess.com/cdn-cgi/access/callback`.

### ❓ Q5: Không tìm thấy mục Identity providers hay Applications trong Zero Trust?
**A:** Cloudflare đã đổi vị trí menu:
- Identity providers nằm tại: **`Integrations` ➡️ `Identity providers`**.
- Applications nằm tại: **`Access controls` ➡️ `Applications`**.
