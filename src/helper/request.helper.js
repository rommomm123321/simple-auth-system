class RequestHelper {
	static validateRequest(schema, data, res) {
		const { error } = schema.validate(data, { allowUnknown: true })
		if (error) {
			throw new Error(error.details[0].message)
		}
	}

	static formatUserResponse(user) {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			isVerified: user.isVerified,
		}
	}
}

export default RequestHelper
