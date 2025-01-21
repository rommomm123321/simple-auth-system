import UserRepository from '../repositories/user.repository.js'

class UserService {
	static async getAllUsers() {
		return UserRepository.findAll()
	}

	static async createUser(data) {
		return UserRepository.create(data)
	}
}

export default UserService
