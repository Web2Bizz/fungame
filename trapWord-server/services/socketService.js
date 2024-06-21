import { Server } from 'socket.io'

let io

const socketService = {
	init: server => {
		io = new Server(server, {
			connectionStateRecovery: {},
			cors: {
				origin: '*',
			},
		})
		io.on('connection', socket => {
			console.log(`Socket connected: ${socket.id}`)

			socket.on('joinRoom', async ({ roomCode, playerName }) => {
				socket.join(roomCode)
				io.to(roomCode).emit('playerJoined', { roomCode, playerName })
			})

			socket.on('disconnect', () => {
				console.log(`Socket disconnected: ${socket.id}`)
				// Here you can implement logic to remove the player from the room
			})
		})
	},
	getIO: () => {
		if (!io) {
			throw new Error('Socket.io not initialized!')
		}
		return io
	},
}

export default socketService
