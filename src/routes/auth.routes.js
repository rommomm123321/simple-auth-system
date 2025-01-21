import { Router } from 'express'
import AuthController from '../controllers/auth.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

const router = Router()

router.post('/sign-in', AuthController.signIn)
router.post('/sign-up', AuthController.signUp)
router.get('/verify-email', AuthController.verifyEmail)
router.post('/password-reset/request', AuthController.requestPasswordReset)
router.post('/password-reset', authMiddleware, AuthController.resetPassword)
router.get('/me', authMiddleware, AuthController.getMe)

export default router
