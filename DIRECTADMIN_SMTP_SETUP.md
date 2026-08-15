# DirectAdmin SMTP Email Configuration & Dynamic Mail Guide

This guide explains how to configure and run the dynamic PHP SMTP mailer for **Asmatullah & Brothers Construction Co.** on your DirectAdmin hosting server.

---

## 1. How the Mail Architecture Works

- **Frontend**: The React website (`TenderRFQForm.tsx` & `ContactSection.tsx`) dispatches tender documents, BOQ specs, and inquiries via asynchronous POST requests to `/api/send-mail.php`.
- **Backend**: `/api/send-mail.php` loads the credentials from `.env`, formats a branded HTML email + plain text alternative, attaches any uploaded BOQ/drawings, and securely sends the email via pure PHP SMTP socket connection (`/api/smtp-client.php`).
- **Auto-Acknowledgement**: The system sends an instant branded confirmation email with an inquiry ticket reference ID (e.g. `ABCC-2026-XXXX`) to the client.
- **Security**: The `.htaccess` file blocks direct public downloads of the `.env` file containing your passwords.

---

## 2. Step-by-Step Setup on DirectAdmin

### Step 1: Create an Email Account in DirectAdmin
1. Log in to your **DirectAdmin Control Panel**.
2. Under **E-Mail Manager**, click **E-mail Accounts**.
3. Click **Create Account**.
4. Enter:
   - **Username**: `info` (or `tenders`, `contact`)
   - **Password**: Create a strong password and save it.
   - **E-Mail Quota**: Set as desired (or unlimited).
5. Click **Create Account**.

---

### Step 2: Configure Your `.env` File
1. In DirectAdmin **File Manager**, navigate to your website folder:
   ```
   /public_html/api/
   ```
   *(Or in `/public_html/` root)*.
2. You will find `.env.example`. Rename or copy it to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and fill in your SMTP details:

```env
# ==============================================================================
# SMTP Mail Server Configuration
# ==============================================================================

# Your DirectAdmin mail server host (usually mail.yourdomain.com)
SMTP_HOST=mail.yourdomain.com

# SMTP Port: 587 (TLS / STARTTLS - Recommended) or 465 (SSL)
SMTP_PORT=587

# Encryption: 'tls' for port 587, 'ssl' for port 465
SMTP_SECURE=tls

# Enable SMTP Authentication: 'true'
SMTP_AUTH=true

# The DirectAdmin email account username and password
SMTP_USERNAME=info@yourdomain.com
SMTP_PASSWORD=YourSecureEmailPasswordHere

# Sender information (Must match SMTP_USERNAME on shared hosting)
SMTP_FROM_EMAIL=info@yourdomain.com
SMTP_FROM_NAME=Asmatullah & Brothers Construction Co.

# The inbox where you want to receive client inquiries & tender notifications
SMTP_TO_EMAIL=info@asmatullahbrothers.com

# Optional CC / BCC
SMTP_CC_EMAIL=
SMTP_BCC_EMAIL=

# Automatically send confirmation receipt email to client
SEND_AUTOREPLY=true
```

---

### Step 3: (Alternative) Using Gmail / Google Workspace / Office 365

If you prefer sending emails using Gmail or Google Workspace instead of DirectAdmin webmail:

1. In your Google Account, enable **2-Step Verification**.
2. Go to **Google Account Settings -> Security -> App Passwords**.
3. Generate a 16-character App Password (e.g. `abcd efgh ijkl mnop`).
4. In your `.env` file, set:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=tls
   SMTP_AUTH=true
   SMTP_USERNAME=yourcompany@gmail.com
   SMTP_PASSWORD=your_16_char_app_password
   SMTP_FROM_EMAIL=yourcompany@gmail.com
   SMTP_FROM_NAME=Asmatullah & Brothers Construction Co.
   SMTP_TO_EMAIL=yourcompany@gmail.com
   ```

---

## 3. Testing Your SMTP Mail in 5 Seconds

A built-in diagnostic tool has been included for you.

1. Open your browser and visit:
   ```
   https://yourdomain.com/api/test-smtp.php
   ```
2. You will see a live diagnostic screen displaying your loaded SMTP settings.
3. Enter an email address and click **"Run Live SMTP Test"**.
4. The tool will:
   - Perform live socket handshake (`EHLO`, `STARTTLS`, `AUTH LOGIN`).
   - Output server responses in green/red logs.
   - Send a verification email directly to your inbox.

---

## 4. File Structure Overview

```text
public_html/
├── .htaccess                 # DirectAdmin Apache / LiteSpeed rewrites + .env security block
├── index.html                # Compiled React SPA entry
├── assets/                   # Compiled CSS, JS, and project imagery
└── api/
    ├── .env.example          # Template environment config
    ├── .env                  # (Your actual secret credentials on the server)
    ├── config.php            # Environment loader & config parser
    ├── smtp-client.php       # Pure PHP SMTP socket mailer (zero external dependencies)
    ├── send-mail.php         # Main dynamic API endpoint (JSON & BOQ file uploads)
    └── test-smtp.php         # Browser-based live SMTP test tool
```

---

## 5. Troubleshooting DirectAdmin Mail

- **Error: "Connection timed out" or "Cannot connect to host"**:
  - Check if port `587` is open. Try switching `SMTP_PORT=465` and `SMTP_SECURE=ssl`.
  - Check with your hosting provider if outbound SMTP connections are enabled.
- **Error: "Username and Password not accepted"**:
  - Ensure the full email address is used for `SMTP_USERNAME` (e.g. `info@yourdomain.com`, not just `info`).
  - Verify the password in DirectAdmin Webmail (Roundcube).
- **Error: "Sender address rejected: not owned by user"**:
  - Ensure `SMTP_FROM_EMAIL` matches the authenticated `SMTP_USERNAME`.
