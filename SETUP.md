# Stemcell MX - Setup Instructions

## Contact Form Email Configuration

The contact form requires email configuration to send messages. Follow these steps to set up email functionality:

### 1. Choose an Email Service Provider

You can use any SMTP-compatible email service. Popular options include:
- Gmail (with App Password)
- Outlook/Hotmail
- SendGrid
- Mailgun
- Amazon SES

### 2. Set Environment Variables in Vercel

Go to your Vercel dashboard and add these environment variables:

```
SMTP_HOST=your-smtp-host.com
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-app-password
TO_EMAIL=contact@stemcellmex.com.mx
FROM_EMAIL=contact@stemcellmex.com.mx
```

### 3. Gmail Setup Example

If using Gmail:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use these settings:
   - SMTP_HOST: smtp.gmail.com
   - SMTP_PORT: 587
   - SMTP_USER: your-gmail@gmail.com
   - SMTP_PASS: your-app-password

### 4. Test the Configuration

After setting up the environment variables:
1. Redeploy your Vercel project
2. Test the contact form
3. Check the Vercel function logs for any errors

### 5. Fallback Behavior

If email configuration is missing, the contact form will:
- Still accept submissions
- Log them to the console
- Return a success message to the user
- Allow manual processing of submissions

## Deployment

The project is configured for Vercel deployment with:
- `package.json` - Node.js dependencies
- `vercel.json` - Vercel configuration
- API routes in `/api` directory

Simply push to your connected Git repository and Vercel will automatically deploy.
