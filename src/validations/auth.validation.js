import Joi from 'joi'

const signUpSchema = Joi.object({
	name: Joi.string().min(3).max(30).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).max(100).required(),
})
const signInSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).max(100).required(),
})
const requestPasswordResetSchema = Joi.object({
	email: Joi.string().email().required(),
})
const resetPasswordSchema = Joi.object({
	password: Joi.string().min(6).max(100).required(),
})

export {
	signUpSchema,
	signInSchema,
	requestPasswordResetSchema,
	resetPasswordSchema,
}
