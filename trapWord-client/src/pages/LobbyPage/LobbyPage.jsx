import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useParams } from 'react-router-dom'
import io from 'socket.io-client'
import { roomAPI } from '../../entitys/Room/api/service'
import SessionControl from '../../shared/lib/SessionControl'

import {
	AbsentPage,
	InviteButton,
	ModalRefer,
	ParticipantList,
	SelectName,
	StartGameButton,
} from '../../widgets'

const socket = io(import.meta.env.VITE_API_URL)

const LobbyPage = () => {
	const { id } = useParams()
	const location = useLocation()

	const isGamePage = location.pathname.endsWith('game')
	const isRoundPage = location.pathname.endsWith('round')

	const { data: existRoom } = roomAPI.useCheckRoomExistenceQuery(id)
	const { data: participants, refetch } = roomAPI.useGetPlayersInRoomQuery(id)
	const [roomExists, setRoomExists] = useState(false)

	const [isModalRefer, setIsModalRefer] = useState(false)

	const [userName, setUserName] = useState('')
	const minPlayers = 4

	useEffect(() => {
		SessionControl.setStoreType('sessionstorage')
		const playerName = SessionControl.get('playerName')
		const roomCode = SessionControl.get('playerRoomCode')

		if (roomCode !== id) {
			SessionControl.remove('playerId')
			SessionControl.remove('playerName')
			SessionControl.remove('playerRoomCode')
		}

		//TODO: сделать отключение от комнат
		if (playerName) {
			setUserName(playerName)
		}
	}, [])

	useEffect(() => {
		if (existRoom) {
			setRoomExists(existRoom.exists)
			socket.emit('joinRoom', { roomCode: id, playerName: userName })
		}
	}, [existRoom])

	useEffect(() => {
		socket.on('playerJoined', data => {
			if (data.roomCode === id) refetch()
		})
		return () => {
			socket.off('playerJoined')
		}
	}, [id, refetch])

	const renderConditions = () => {
		if (!userName) {
			return <SelectName setUserName={setUserName} roomCode={id} />
		}
		if (participants && participants.length >= minPlayers) {
			return <StartGameButton roomCode={id} />
		}
		return <InviteButton setIsModalRefer={setIsModalRefer} />
	}

	const CheckCurrentPage = () => {
		if (isGamePage || isRoundPage) return <Outlet />
		if (roomExists) {
			return (
				<div className='flex justify-between h-screen flex-col p-5 '>
					<ParticipantList participants={participants} />
					{renderConditions()}
					<ModalRefer
						isModalRefer={isModalRefer}
						roomCode={id}
						setIsModalRefer={setIsModalRefer}
					/>
				</div>
			)
		} else {
			return <AbsentPage />
		}
	}

	return CheckCurrentPage()
}

export default LobbyPage
