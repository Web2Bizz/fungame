import { CopyOutlined } from '@ant-design/icons'
import { Avatar, Button, Input, Modal, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const LobbyPage = () => {
	const [isModalRefer, setIsModalRefer] = useState(false)
	const [userName, setUserName] = useState('')
	const [roomCode, setRoomCode] = useState('555666') // Состояние для хранения кода комнаты
	const [participants, setParticipants] = useState([
		{
			name: 'Иван',
			avatar:
				'https://avatars.mds.yandex.net/get-entity_search/118114/831955895/S600xU_2x',
		},
		{
			name: 'Петр',
			avatar:
				'https://avatars.mds.yandex.net/get-entity_search/118114/831955895/S600xU_2x',
		},
		{
			name: 'Алексей',
			avatar:
				'https://avatars.mds.yandex.net/get-entity_search/118114/831955895/S600xU_2x',
		},
	]) // Состояние для хранения списка участников
	const minPlayers = 4

	useEffect(() => {
		// Здесь добавить логику для работы с бэкендом, получение списка участников или генерация кода комнаты
		// Получение списка участников и кода комнаты
	}, [])

	// useEffect(() => {
	// 	let { id } = useParams()
	// 	console.log(id)
	// }, [])

	const renderConditions = () => {
		if (!userName) {
			return (
				<SelectName
					participants={participants || []}
					setParticipants={setParticipants}
					setUserName={setUserName}
				/>
			)
		}
		if (participants && participants.length >= minPlayers) {
			return <StartGameButton roomCode={roomCode} />
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
			) : (
				<div className='flex justify-between h-screen flex-col p-5 '>
					<ParticipantList participants={participants} />
					{renderConditions()}
					<ModalRefer
						isModalRefer={isModalRefer}
						roomCode={roomCode}
						setIsModalRefer={setIsModalRefer}
					/>
				</div>
			)}
		</>
	)
}

const ParticipantList = ({ participants }) => {
	console.log(participants)
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
				{participants.map((participant, index) => (
					<div key={index} className='flex items-center'>
						<Avatar
							src={participant.avatar}
							size={48}
							alt={`Аватарка ${participant.name[0]}`}
						/>
						<span className='text-3xl ml-10'>{participant.name}</span>
					</div>
				))}
			</div>
		</div>
	)
}

const SelectName = ({ participants, setParticipants, setUserName }) => {
	const [inputValue, setInputValue] = useState('')
	const handleSelectName = () => {
		const player = {
			name: inputValue,
		}
		setUserName(inputValue)
		setParticipants([...participants, player])
	}

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
