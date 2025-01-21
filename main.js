import express from 'express'
import cors from 'cors'
import { sequelize } from './config/db.config.js'
import routes from './src/routes/index.js'
import dotenv from 'dotenv'
import './src/queues/email.queue.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use('/api/v1', routes)

sequelize
	.authenticate()
	.then(() => {
		console.log('Database connected!')
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
	})
	.catch(err => console.error('Unable to connect to the database:', err))
