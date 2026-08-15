# DirectAdmin Deployment Guide

This application is fully optimized for deployment on **DirectAdmin** (Apache / LiteSpeed / Nginx web servers).

---

## Quick Deployment Steps

### 1. Build the Production Bundle
In your project terminal, run:
```bash
npm run build
```
This will compile all React code, styles, optimized images, and copy the `.htaccess` configuration into the `dist/` folder.

---

### 2. Upload to DirectAdmin

#### Option A: Using DirectAdmin File Manager (Recommended)
1. Log in to your **DirectAdmin Control Panel**.
2. Under **System Info & Files**, click on **File Manager**.
3. Navigate to:
   ```
   domains -> yourdomain.com -> public_html
   ```
   *(Or just `/public_html` if you only have one domain).*
4. Zip the contents of your local `dist` folder:
   - Select all files **inside** the `dist/` folder (`index.html`, `assets/`, `.htaccess`, etc.) and create a `.zip` archive.
5. In DirectAdmin File Manager, click **Upload File** and select your `.zip` archive.
6. Right-click the uploaded `.zip` in DirectAdmin and click **Extract**.
7. Ensure `index.html` and `.htaccess` sit directly in `public_html/`.

---

#### Option B: Using FTP / FileZilla
1. Connect to your DirectAdmin server using your FTP client (Host, Username, Password, Port `21` or `22` for SFTP).
2. Open the remote folder `/public_html` (or `domains/yourdomain.com/public_html`).
3. Upload all files and folders from inside your local `dist/` folder directly into `public_html`.

---

## Included DirectAdmin Configurations

The build includes a ready-to-use `.htaccess` file in `public/` that handles:
- **SPA URL Rewriting**: Prevents 404 errors on page reload or direct links.
- **Gzip & Deflate Compression**: Accelerates site load speed for visitors.
- **Browser Caching**: Sets 1-year immutable caching for static assets and immediate freshness for `index.html`.
- **Security Headers**: Includes `X-Frame-Options`, `X-Content-Type-Options`, and `Referrer-Policy`.
- **MIME Types**: Configured for modern image and font formats (`.webp`, `.woff2`, `.svg`).

---

## Verification
Visit your domain (e.g., `https://yourdomain.com`). The website will load instantly with all images, navigation, and contact forms functioning smoothly.
