import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../../config/db.config.js'
import bcrypt from 'bcrypt'

class User extends Model {
	static associate(models) {}

	static async hashPassword(password) {
		const saltRounds = 10
		return await bcrypt.hash(password, saltRounds)
	}

	static async validatePassword(password, hashedPassword) {
		return await bcrypt.compare(password, hashedPassword)
	}
}

User.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isVerified: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		sequelize,
		tableName: 'users',
	}
)

export { User }
