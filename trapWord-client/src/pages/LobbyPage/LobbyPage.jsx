import { CopyOutlined } from '@ant-design/icons'
import { Avatar, Button, Input, Modal, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import io from 'socket.io-client'
import { roomAPI } from '../../entitys/Room/api/service'

const socket = io('http://localhost:3000')

const LobbyPage = () => {
	const { id } = useParams()
	const [roomCode, setRoomCode] = useState(id)
	const { data: existRoom } = roomAPI.useCheckRoomExistenceQuery(id)
	const { data: participants, refetch } = roomAPI.useGetPlayersInRoomQuery(id)
	const [roomExists, setRoomExists] = useState(false)

	useEffect(() => {
		if (existRoom) {
			setRoomExists(existRoom.exists)
		}
	}, [existRoom])

	const [isModalRefer, setIsModalRefer] = useState(false)
	const [userName, setUserName] = useState('')
	const minPlayers = 4

	useEffect(() => {
		socket.on('playerJoined', data => {
			console.log('playerJoined', data)

			if (data.roomCode === roomCode) {
				refetch()
			}
		})

		return () => {
			socket.off('playerJoined')
		}
	}, [participants])

	useEffect(() => {
		socket.on('playerJoined', data => {
			console.log('playerJoined', data)

			if (data.roomCode === roomCode) {
			}
		})

		return () => {
			socket.off('playerJoined')
		}
	}, [])

	const renderConditions = () => {
		if (!userName) {
			return <SelectName setUserName={setUserName} roomCode={id} />
		}
		if (participants && participants.length >= minPlayers) {
			return <StartGameButton roomCode={id} />
		} else {
			return <InviteButton setIsModalRefer={setIsModalRefer} />
		}
	}

	const location = useLocation()
	const isGamePage = location.pathname.endsWith('game')
	const isRoundPage = location.pathname.endsWith('round')

	return (
		<>
			{isGamePage || isRoundPage ? (
				<Outlet />
			) : roomExists ? (
				<div className='flex justify-between h-screen flex-col p-5 '>
					<ParticipantList participants={participants} />
					{renderConditions()}
					<ModalRefer
						isModalRefer={isModalRefer}
						roomCode={id}
						setIsModalRefer={setIsModalRefer}
					/>
				</div>
			) : (
				<div>Данной игры не существует</div>
			)}
		</>
	)
}

const ParticipantList = ({ participants }) => {
	if (!participants || participants.length === 0) {
		return (
			<div>
				<h1>Участники (0)</h1>
			</div>
		)
	}

	return (
		<div className='flex flex-col'>
			<div className='flex justify-center'>
				<h1>Участники ({participants.length}) </h1>
			</div>
			<div className='px-8 mt-10 flex flex-col gap-5 max-h-60 '>
				{participants &&
					participants.map((participant, index) => (
						<div key={index} className='flex items-center'>
							<Avatar
								src={participant.avatar}
								size={48}
								alt={`Аватарка ${participant.name}`}
							/>
							<span className='text-3xl ml-10'>{participant.name}</span>
						</div>
					))}
			</div>
		</div>
	)
}

const SelectName = ({ setUserName, roomCode }) => {
	const [inputValue, setInputValue] = useState('')
	const [connectRoom, {}] = roomAPI.useConnectRoomMutation()

	const handleSelectName = () => {
		const player = {
			name: inputValue,
		}
		console.log(roomCode)
		setUserName(inputValue)
		const data = {
			roomCode,
			player,
		}
		connectRoom(data)
		socket.emit('joinRoom', { roomCode, playerName: inputValue })
	}

	useEffect(() => {
		socket.on('playerJoined', data => {
			console.log('recived', data)
		})
	}, [])

	return (
		<div className='flex'>
			<Input
				className='text-2xl'
				placeholder='Введите ваше имя...'
				onChange={e => setInputValue(e.target.value)}
			/>
			<Button className='text-2xl' onClick={handleSelectName}>
				ОК
			</Button>
		</div>
	)
}

const InviteButton = ({ setIsModalRefer }) => {
	const handleReferPeople = () => {
		setIsModalRefer(true)
	}

	return (
		<Button className='text-2xl' type='primary' onClick={handleReferPeople}>
			Пригласить людей
		</Button>
	)
}

const StartGameButton = ({ roomCode }) => {
	const navigate = useNavigate()

	const handleStartGame = () => {
		navigate(`/lobby/${roomCode}/game`)
	}

	return (
		<div className=''>
			<Button
				className='text-3xl w-full'
				type='primary'
				onClick={handleStartGame}
			>
				Начать игру
			</Button>
		</div>
	)
}

const ModalRefer = ({ isModalRefer, roomCode, setIsModalRefer }) => {
	const roomRef = `http://ip/lobby/${roomCode}`

	const handleCancel = () => {
		setIsModalRefer(false)
	}

	return (
		<Modal
			title='Приглашение людей'
			open={isModalRefer}
			onCancel={handleCancel}
			footer={[]}
		>
			<p>Код комнаты: {roomCode}</p>
			<p>Пригласительная ссылка: </p>
			<Space.Compact style={{ width: '100%' }}>
				<Input disabled value={roomRef} />
				<Button
					onClick={() => {
						navigator.clipboard.writeText(roomRef)
					}}
				>
					<CopyOutlined />
				</Button>
			</Space.Compact>
		</Modal>
	)
}

export default LobbyPage
