// api/contact.js
import nodemailer from 'nodemailer'

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST'])
		return res.status(405).json({ message: 'Method not allowed' })
	}

	try {
		const { name, email, subject, message, source, company } = req.body || {}

		// Honeypot: if "company" is filled, drop it (bot)
		if (company) return res.status(200).json({ ok: true })

		if (!name || !email || !subject || !message) {
			return res.status(400).json({ message: 'Missing required fields' })
		}

		// create reusable transporter using SMTP (use your provider)
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT || 587),
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS
			}
		})

		const to = process.env.TO_EMAIL // where you want to receive messages

		const text = [
			`From: ${name} <${email}>`,
			source ? `Source form: ${source}` : '',
			`Subject: ${subject}`,
			'',
			message
		].filter(Boolean).join('\n')

		await transporter.sendMail({
			from: `"Website" <${process.env.FROM_EMAIL || 'no-reply@yourdomain.com'}>`,
			to,
			replyTo: email,
			subject: `[Contact] ${subject}`,
			text
		})

		return res.status(200).json({ ok: true })
	} catch (err) {
		console.error('Contact error:', err)
		return res.status(500).json({ message: 'Server error. Please try again later.' })
	}
}
