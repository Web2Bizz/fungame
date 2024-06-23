import { Button, Input } from 'antd'
import { useState } from 'react'
import { roomAPI } from '../../entitys/Room/api/service'
import SessionControl from '../../shared/lib/SessionControl'

export const SelectName = ({ setUserName, roomCode }) => {
	const [inputValue, setInputValue] = useState('')
	const [connectRoom, {}] = roomAPI.useConnectRoomMutation()

	const handleSelectName = async () => {
		try {
			console.log(1)
			const playerName = { name: inputValue }
			setUserName(inputValue)
			const response = await connectRoom({ roomCode, playerName })
			const { message, player } = response?.data
			console.log(message)
			SavePlayerDataStorage(player)
		} catch (error) {
			console.error('Ошибка подключения к комнате:', error)
		}
	}

	const SavePlayerDataStorage = player => {
		SessionControl.setStoreType('sessionstorage')
		SessionControl.set('playerId', player.id)
		SessionControl.set('playerName', player.name)
		SessionControl.set('playerRoomCode', player.roomCode)
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
