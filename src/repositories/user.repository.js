import { User } from '../models/user.model.js'

class UserRepository {
	static async findAll() {
		return await User.findAll()
	}

	static async create(data) {
		return await User.create(data)
	}
	static async find(data) {
		return await User.findOne(data)
	}
	static async findByPk(data) {
		return await User.findByPk(data)
	}
}

export default UserRepository
