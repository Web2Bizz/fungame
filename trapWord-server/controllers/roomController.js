import {
	createRoom as createRoomService,
	getPlayersInRoom as getPlayersInRoomService,
	joinRoom as joinRoomService,
	roomExists as roomExistsService,
} from '../services/roomService.js'

export async function createRoom(req, res, next) {
	try {
		const roomCode = await createRoomService()
		res.status(200).json({ roomCode })
	} catch (error) {
		next(error)
	}
}

export async function joinRoom(req, res, next) {
	const { roomCode, player } = req.body
	try {
		const result = await joinRoomService(roomCode, player.name)
		res.status(200).json(result)
	} catch (error) {
		next(error)
	}
}

export async function getPlayersInRoom(req, res, next) {
	const { roomCode } = req.params
	try {
		const result = await getPlayersInRoomService(roomCode)
		res.status(200).json(result)
	} catch (error) {
		next(error)
	}
}

export async function checkRoomExistence(req, res, next) {
	const { id } = req.params
	try {
		const exists = await roomExistsService(id)
		res.json({ exists })
	} catch (error) {
		next(error)
	}
}
