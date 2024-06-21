import socketService from './socketService.js'

const rooms = {}

function generateRoomCode() {
	return Math.random().toString(36).substr(2, 6).toUpperCase()
}

export function createRoom() {
	return new Promise((resolve, reject) => {
		const roomCode = generateRoomCode()
		rooms[roomCode] = { players: [] }
		resolve(roomCode)
		console.log('Создана комната:', roomCode)
		console.log(rooms)

		// Отправляем событие клиентам
		const io = socketService.getIO()
		io.emit('roomCreated', roomCode)
	})
}

export function joinRoom(roomCode, playerName, socketId) {
	return new Promise((resolve, reject) => {
		if (rooms[roomCode]) {
			rooms[roomCode].players.push({ id: socketId, name: playerName })
			console.log(`${playerName} присоединился к комнате ${roomCode}`)

			// Отправляем событие клиентам в этой комнате
			const io = socketService.getIO()
			io.to(roomCode).emit('playerJoined', { roomCode, playerName })

			resolve({ message: `${playerName} присоединился к комнате ${roomCode}` })
		} else {
			reject(new Error(`Комната с кодом ${roomCode} не найдена`))
		}
	})
}

export function roomExists(roomId) {
	return rooms.hasOwnProperty(roomId)
}

export function getPlayersInRoom(roomCode) {
	return new Promise((resolve, reject) => {
		if (!rooms[roomCode]) {
			reject(new Error(`Комната с кодом ${roomCode} не найдена`))
		}
		console.log(rooms)
		const players = rooms[roomCode].players
		resolve(Object.keys(players).length === 0 ? [] : players)
	})
}
