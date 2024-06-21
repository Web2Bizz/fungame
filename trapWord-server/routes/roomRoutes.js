import express from 'express'
import {
	checkRoomExistence,
	createRoom,
	getPlayersInRoom,
	joinRoom,
} from '../controllers/roomController.js'

const router = express.Router()

// Маршруты для работы с комнатами
router.post('/create', createRoom)
router.post('/join', joinRoom)
router.get('/exist/:id', checkRoomExistence)
router.get('/:roomCode/players', getPlayersInRoom)

export default router
