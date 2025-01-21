import RequestHelper from '../helper/request.helper.js'
import ResponseHelper from '../helper/response.helper.js'
import AuthService from '../services/auth.service.js'
import {
	signInSchema,
	signUpSchema,
	requestPasswordResetSchema,
	resetPasswordSchema,
} from '../validations/auth.validation.js'

class AuthController {
	static async signUp(req, res) {
		try {
			RequestHelper.validateRequest(signUpSchema, req.body, res)

			const { name, email, password } = req.body
			const { user, token } = await AuthService.signUp({
				name,
				email,
				password,
			})
			ResponseHelper.success(res, 201, {
				user: RequestHelper.formatUserResponse(user),
				token,
			})
		} catch (error) {
			return ResponseHelper.error(res, 400, error.message)
		}
	}
	static async signIn(req, res) {
		try {
			RequestHelper.validateRequest(signInSchema, req.body, res)

			const { email, password } = req.body
			const { user, token } = await AuthService.signIn({
				email,
				password,
			})
			ResponseHelper.success(res, 200, {
				user: RequestHelper.formatUserResponse(user),
				token,
			})
		} catch (error) {
			return ResponseHelper.error(res, 400, error.message)
		}
	}
	static async requestPasswordReset(req, res) {
		try {
			RequestHelper.validateRequest(requestPasswordResetSchema, req.body, res)

			const { email } = req.body
			const result = await AuthService.requestPasswordReset(email)

			if (result) {
				ResponseHelper.success(res, 200, {
					message:
						'Password reset request successful. Please check your email for further instructions.',
				})
			}
		} catch (error) {
			return ResponseHelper.error(res, 400, error.message)
		}
	}

	static async resetPassword(req, res) {
		try {
			RequestHelper.validateRequest(resetPasswordSchema, req.body, res)

			const { password } = req.body
			const { userId } = req.user
			const result = await AuthService.resetPassword(userId, password)

			if (result) {
				ResponseHelper.success(res, 200, {
					message: 'Password has been reset successfully',
				})
			}
		} catch (error) {
			return ResponseHelper.error(res, 400, error.message)
		}
	}

	static async verifyEmail(req, res) {
		const { token } = req.query
		try {
			if (!token) {
				return ResponseHelper.error(res, 400, 'Verification token is required')
			}

			const user = await AuthService.verifyEmail(token)
			ResponseHelper.success(res, 201, {
				user: RequestHelper.formatUserResponse(user),
				token,
			})
		} catch (error) {
			return ResponseHelper.error(res, 400, error.message)
		}
	}
	static async getMe(req, res) {
		try {
			const { userId } = req.user
			const { user, token } = await AuthService.getMe(userId)

			ResponseHelper.success(res, 201, {
				user: RequestHelper.formatUserResponse(user),
				token,
			})
		} catch (error) {
			return ResponseHelper.error(res, 400, error.message)
		}
	}
}

export default AuthController
