import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import errorMiddleware from './middlewares/errorMiddleware.js'
import roomRoutes from './routes/roomRoutes.js'
import socketService from './services/socketService.js'

dotenv.config()
const app = express()
const server = http.createServer(app)
const io = new Server(server)

//Cors
console.log(process.env.CLIENT_URL)
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
		optionSuccessStatus: 200,
	})
)
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL)
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	if (req.method === 'OPTIONS') {
		return res.status(200).end()
	} else {
		next()
	}
})

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/rooms', roomRoutes)

// Socket.IO
socketService.init(io)

// Error handling middleware
app.use(errorMiddleware)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
	console.log(`Сервер запущен на порту ${PORT}`)
})
