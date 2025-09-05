# 🚀 Production Deployment Guide - Stemcell México

This guide will help you deploy the Stemcell México website to production using Vercel.

## 📋 Pre-Deployment Checklist

### ✅ Required Setup
- [ ] Domain name registered and configured
- [ ] Email service provider configured (Gmail, SendGrid, etc.)
- [ ] Environment variables set up
- [ ] SSL certificate configured (handled by Vercel)
- [ ] Analytics tracking IDs obtained
- [ ] Social media accounts created and linked

### ✅ Content Review
- [ ] All placeholder images replaced with actual photos
- [ ] Doctor photos added to team section
- [ ] Contact information verified
- [ ] Social media links updated
- [ ] Meta descriptions and titles optimized
- [ ] All text content proofread

## 🔧 Environment Variables

Set these in your Vercel dashboard under Settings > Environment Variables:

### Required Variables
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
TO_EMAIL=contact@stemcellmex.com.mx
FROM_EMAIL=contact@stemcellmex.com.mx
```

### Optional Variables
```bash
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX
SENTRY_DSN=your-sentry-dsn
```

## 🚀 Deployment Steps

### 1. Vercel Deployment

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy from project directory
   vercel
   ```

2. **Configure Domain**
   - Go to Vercel Dashboard > Project Settings > Domains
   - Add your custom domain (e.g., `stemcellmex.com`)
   - Update DNS records as instructed by Vercel

3. **Set Environment Variables**
   - Go to Project Settings > Environment Variables
   - Add all required variables from the list above

### 2. Email Configuration

#### Gmail Setup (Recommended)
1. Enable 2-factor authentication on Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security > 2-Step Verification > App passwords
   - Generate password for "Mail"
3. Use these settings:
   - `SMTP_HOST`: smtp.gmail.com
   - `SMTP_PORT`: 587
   - `SMTP_USER`: your-gmail@gmail.com
   - `SMTP_PASS`: your-app-password

#### Alternative: SendGrid
1. Create SendGrid account
2. Generate API key
3. Use these settings:
   - `SMTP_HOST`: smtp.sendgrid.net
   - `SMTP_PORT`: 587
   - `SMTP_USER`: apikey
   - `SMTP_PASS`: your-sendgrid-api-key

### 3. Domain Configuration

#### DNS Settings
```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### SSL Certificate
- Automatically handled by Vercel
- Force HTTPS enabled by default

## 📊 Analytics Setup

### Google Analytics 4
1. Create GA4 property
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to environment variables
4. Update the GA script in `index.html`

### Google Tag Manager (Optional)
1. Create GTM container
2. Add container ID to environment variables
3. Implement GTM code in HTML

## 🔒 Security Configuration

### Headers (Already configured in vercel.json)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### Rate Limiting
- Contact form: 10 requests per 15 minutes per IP
- Implemented in `api/contact.js`

## 📱 Performance Optimization

### Image Optimization
- All images are in WebP format
- Responsive images with multiple sizes
- Lazy loading implemented

### Font Optimization
- Fonts preloaded with `font-display: swap`
- WOFF format for better compression

### Caching
- Static assets cached for 1 year
- API responses cached appropriately

## 🧪 Testing Checklist

### Functionality Tests
- [ ] Contact form submission works
- [ ] Email notifications received
- [ ] Mobile navigation works
- [ ] Language toggle functions
- [ ] All links work correctly
- [ ] Forms validate properly

### Performance Tests
- [ ] Page load speed < 3 seconds
- [ ] Mobile performance score > 90
- [ ] Desktop performance score > 90
- [ ] Accessibility score > 90

### Browser Tests
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

### SEO Tests
- [ ] Meta tags present
- [ ] Structured data valid
- [ ] Sitemap generated
- [ ] Robots.txt configured

## 🔍 Monitoring Setup

### Error Tracking
- Basic error tracking implemented
- Consider adding Sentry for production

### Uptime Monitoring
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Monitor API endpoints

### Performance Monitoring
- Google Analytics Core Web Vitals
- Vercel Analytics (if enabled)

## 📈 Post-Deployment Tasks

### Immediate (Day 1)
1. Test all functionality
2. Verify email delivery
3. Check analytics tracking
4. Test on multiple devices

### Short-term (Week 1)
1. Monitor error logs
2. Check performance metrics
3. Gather user feedback
4. Optimize based on data

### Long-term (Month 1+)
1. Regular security updates
2. Content updates
3. Performance optimization
4. Feature enhancements

## 🆘 Troubleshooting

### Common Issues

#### Contact Form Not Working
- Check environment variables
- Verify SMTP settings
- Check Vercel function logs

#### Images Not Loading
- Verify image paths
- Check file permissions
- Ensure WebP support

#### Analytics Not Tracking
- Verify GA ID
- Check browser console for errors
- Test with GA Debugger

### Support Resources
- Vercel Documentation: https://vercel.com/docs
- Nodemailer Documentation: https://nodemailer.com/
- Google Analytics Help: https://support.google.com/analytics

## 📞 Emergency Contacts

- **Technical Issues**: Check Vercel dashboard logs
- **Email Problems**: Verify SMTP configuration
- **Domain Issues**: Check DNS settings

---

**Last Updated**: January 2025
**Version**: 1.0.0
