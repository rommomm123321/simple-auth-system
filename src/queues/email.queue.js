import Queue from 'bull'
import EmailService from '../services/email.service.js'
const emailQueue = new Queue('emailQueue', {
	redis: {
		host: process.env.REDIS_HOST || '127.0.0.1',
		port: process.env.REDIS_PORT || 6379,
	},
})

emailQueue.process(async job => {
	const { type, user } = job.data

	try {
		if (type === 'verification') {
			await EmailService.sendVerificationEmail(user)
		} else if (type === 'passwordReset') {
			await EmailService.sendPasswordResetEmail(user)
		}
	} catch (error) {
		console.error(`Failed to process email job: ${error.message}`)
		throw error
	}
})

export default emailQueue
