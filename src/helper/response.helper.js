class ResponseHelper {
	static success(res, statusCode, data) {
		return res.status(statusCode).json({ data })
	}

	static error(res, statusCode, message) {
		return res.status(statusCode).json({ message })
	}
}

export default ResponseHelper
