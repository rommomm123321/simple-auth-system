import ResponseHelper from '../helper/response.helper.js'
import AuthService from '../services/auth.service.js'

const authMiddleware = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization

		if (!authHeader) {
			return ResponseHelper.error(res, 401, 'Authorization header is missing')
		}

		const token = authHeader.split(' ')[1]

		if (!token) {
			return ResponseHelper.error(res, 401, 'Authorization token is missing')
		}

		const decoded = AuthService.verifyToken(token)

		req.user = { userId: decoded.id }
		next()
	} catch (error) {
		return ResponseHelper.error(res, 401, 'Invalid or expired token')
	}
}

export default authMiddleware
