// src/services/emailService.js
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

class EmailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		})
	}

	async sendMail({ to, subject, html }) {
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to,
			subject,
			html,
		}

		try {
			await this.transporter.sendMail(mailOptions)
			console.log(`Email sent to ${to}`)
		} catch (error) {
			console.error('Error sending email:', error)
			throw new Error('Failed to send email')
		}
	}

	generateToken(payload, expiresIn = '1d') {
		return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn })
	}

	async sendVerificationEmail(user) {
		const token = this.generateToken({ id: user.id, email: user.email })
		const url = `${process.env.BASE_URL}/api/v1/auth/verify-email?token=${token}`

		const html = `<p>Click <a href="${url}">here</a> to verify your email.</p>`

		await this.sendMail({
			to: user.email,
			subject: 'Email Verification',
			html,
		})
	}

	async sendPasswordResetEmail(user) {
		const token = this.generateToken({ id: user.id, email: user.email }, '1h')
		const url = `${process.env.BASE_URL}/api/v1/auth/reset-password?token=${token}`

		const html = `<p>Click <a href="${url}">here</a> to reset your password. This link is valid for 1 hour.</p>`

		await this.sendMail({
			to: user.email,
			subject: 'Password Reset',
			html,
		})
	}
}

export default new EmailService()
