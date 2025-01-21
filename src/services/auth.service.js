import { User } from '../models/user.model.js'
import emailQueue from '../queues/email.queue.js'
import UserRepository from '../repositories/user.repository.js'
import jwt from 'jsonwebtoken'

class AuthService {
	static async signUp({ name, email, password }) {
		const existingUser = await UserRepository.find({ where: { email } })
		if (existingUser) {
			throw new Error('User already exists')
		}

		const user = await UserRepository.create({
			name,
			email,
			password: await User.hashPassword(password),
		})

		await emailQueue.add({
			type: 'verification',
			user,
		})
		const token = this.generateToken(user)
		return { user, token }
	}

	static async signIn({ email, password }) {
		const user = await UserRepository.find({ where: { email } })
		if (!user) {
			throw new Error('User not found')
		}

		const isPasswordValid = await User.validatePassword(password, user.password)
		if (!isPasswordValid) {
			throw new Error('Invalid password')
		}
		const token = this.generateToken(user)
		return { user, token }
	}

	static async getMe(userId) {
		try {
			const user = await UserRepository.findByPk(userId)

			if (!user) {
				throw new Error('User not found')
			}

			const token = this.generateToken(user)
			return { user, token }
		} catch (error) {
			throw new Error('Failed to retrieve user details')
		}
	}

	static async verifyEmail(token) {
		try {
			const decoded = this.verifyToken(token)
			const { id, email } = decoded

			const user = await UserRepository.find({ where: { id, email } })

			if (!user) {
				throw new Error('Invalid or expired token')
			}

			if (user.isVerified) {
				throw new Error('Email is already verified')
			}
			user.isVerified = true
			await user.save()

			return user
		} catch (error) {
			throw new Error(error.message || 'Failed to verify email')
		}
	}

	static async requestPasswordReset(email) {
		const user = await UserRepository.find({ where: { email } })
		if (!user) {
			throw new Error('User with this email does not exist.')
		}
		await emailQueue.add({
			type: 'passwordReset',
			user,
		})
		return true
	}
	static async resetPassword(userId, password) {
		const user = await UserRepository.findByPk(userId)

		if (!user) {
			throw new Error('User not found')
		}

		user.password = await User.hashPassword(password)
		await user.save()

		return true
	}

	static generateToken(user) {
		const payload = {
			id: user.id,
			name: user.name,
			email: user.email,
		}

		const secretKey = process.env.JWT_SECRET
		const options = {
			expiresIn: '1h',
		}

		return jwt.sign(payload, secretKey, options)
	}

	static verifyToken(token) {
		const secretKey = process.env.JWT_SECRET

		try {
			const decoded = jwt.verify(token, secretKey)
			return decoded
		} catch (error) {
			throw new Error('Invalid or expired token')
		}
	}
}

export default AuthService
