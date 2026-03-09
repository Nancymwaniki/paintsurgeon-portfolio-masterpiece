# Web3Forms Setup Instructions

To enable email submissions from the contact form, follow these steps:

## Step 1: Get Your Access Key

1. Go to https://web3forms.com
2. Enter your email: **njorogekush@gmail.com**
3. Click "Get Access Key"
4. Check your email for the access key

## Step 2: Add Access Key to the Code

1. Open `src/pages/Contact.tsx`
2. Find the line: `access_key: "YOUR_WEB3FORMS_ACCESS_KEY"`
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual access key from the email

Example:
```javascript
access_key: "abc123-def456-ghi789-jkl012", // Your actual key here
```

## Step 3: Test the Form

1. Fill out the contact form on your website
2. Submit it
3. Check njorogekush@gmail.com for the submission

## Features Configured

- ✅ Sends to: njorogekush@gmail.com
- ✅ Subject line: "New Contact Form Submission from Paintsurgeon Website"
- ✅ Includes: Name, Email, Phone, Message
- ✅ Shows loading state while submitting
- ✅ Error handling with fallback to WhatsApp

## Alternative: Use Environment Variable (Recommended)

For better security, you can store the access key in an environment variable:

1. Create a `.env` file in the root directory
2. Add: `VITE_WEB3FORMS_KEY=your_access_key_here`
3. In Contact.tsx, change to: `access_key: import.meta.env.VITE_WEB3FORMS_KEY`
4. Restart your dev server

## Free Tier Limits

- 250 submissions per month (free)
- Upgrade available if you need more
