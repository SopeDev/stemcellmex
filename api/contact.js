// api/contact.js
const nodemailer = require('nodemailer')

// Simple in-memory rate limiting (for production, use Redis or database)
const rateLimitMap = new Map()

function rateLimit(ip, maxRequests = 10, windowMs = 15 * 60 * 1000) {
	const now = Date.now()
	const windowStart = now - windowMs
	
	// Clean old entries
	for (const [key, timestamp] of rateLimitMap.entries()) {
		if (timestamp < windowStart) {
			rateLimitMap.delete(key)
		}
	}
	
	// Check current IP
	const requests = Array.from(rateLimitMap.entries())
		.filter(([key]) => key.startsWith(ip))
		.length
	
	if (requests >= maxRequests) {
		return false
	}
	
	rateLimitMap.set(`${ip}-${now}`, now)
	return true
}

function validateEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	return emailRegex.test(email)
}

function sanitizeInput(input) {
	return input.toString().trim().slice(0, 1000)
}

module.exports = async function handler(req, res) {
	// Set CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
	
	if (req.method === 'OPTIONS') {
		return res.status(200).end()
	}
	
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST'])
		return res.status(405).json({ message: 'Method not allowed' })
	}

	try {
		// Rate limiting
		const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
		if (!rateLimit(clientIP)) {
			return res.status(429).json({ 
				message: 'Too many requests. Please try again later.' 
			})
		}

		const { name, email, subject, message, source, company } = req.body || {}

		// Honeypot: if "company" is filled, drop it (bot)
		if (company) return res.status(200).json({ ok: true })

		// Validate required fields
		if (!name || !email || !subject || !message) {
			return res.status(400).json({ message: 'Missing required fields' })
		}

		// Validate email format
		if (!validateEmail(email)) {
			return res.status(400).json({ message: 'Invalid email format' })
		}

		// Sanitize inputs
		const sanitizedData = {
			name: sanitizeInput(name),
			email: sanitizeInput(email),
			subject: sanitizeInput(subject),
			message: sanitizeInput(message),
			source: source ? sanitizeInput(source) : 'Website Contact Form'
		}

		// Check if email configuration is available
		if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.TO_EMAIL) {
			console.log('Email configuration missing. Contact form submission received:', sanitizedData)
			// Return success but log the submission for manual processing
			return res.status(200).json({ 
				ok: true, 
				message: 'Message received. We will contact you soon.' 
			})
		}

		// Create reusable transporter using SMTP
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT || 587),
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS
			},
			tls: {
				rejectUnauthorized: false
			}
		})

		const to = process.env.TO_EMAIL
		const fromEmail = process.env.FROM_EMAIL || 'contact@stemcellmex.com.mx'

		const emailText = [
			`From: ${sanitizedData.name} <${sanitizedData.email}>`,
			`Source: ${sanitizedData.source}`,
			`Subject: ${sanitizedData.subject}`,
			`Date: ${new Date().toLocaleString('es-MX', { timeZone: 'America/Tijuana' })}`,
			'',
			'Message:',
			sanitizedData.message,
			'',
			'---',
			'This message was sent from the Stemcell México website contact form.'
		].join('\n')

		const emailHtml = `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
				<h2 style="color: #002B2B;">New Contact Form Submission</h2>
				<div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
					<p><strong>Name:</strong> ${sanitizedData.name}</p>
					<p><strong>Email:</strong> ${sanitizedData.email}</p>
					<p><strong>Subject:</strong> ${sanitizedData.subject}</p>
					<p><strong>Source:</strong> ${sanitizedData.source}</p>
					<p><strong>Date:</strong> ${new Date().toLocaleString('es-MX', { timeZone: 'America/Tijuana' })}</p>
				</div>
				<div style="background: #CCEDEC; padding: 20px; border-radius: 8px;">
					<h3 style="color: #002B2B; margin-top: 0;">Message:</h3>
					<p style="white-space: pre-wrap;">${sanitizedData.message}</p>
				</div>
				<hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
				<p style="color: #666; font-size: 12px;">
					This message was sent from the Stemcell México website contact form.
				</p>
			</div>
		`

		await transporter.sendMail({
			from: `"Stemcell México Website" <${fromEmail}>`,
			to,
			replyTo: sanitizedData.email,
			subject: `[Contact Form] ${sanitizedData.subject}`,
			text: emailText,
			html: emailHtml
		})

		return res.status(200).json({ 
			ok: true,
			message: 'Message sent successfully. We will contact you soon.'
		})
	} catch (err) {
		console.error('Contact form error:', {
			error: err.message,
			stack: err.stack,
			timestamp: new Date().toISOString()
		})
		
		// Don't expose internal errors to client
		return res.status(500).json({ 
			message: 'Unable to send message. Please try again later or contact us directly.' 
		})
	}
}
