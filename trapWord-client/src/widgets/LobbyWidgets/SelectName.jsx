import { Button, Input } from 'antd'
import { useState } from 'react'
import { roomAPI } from '../../entitys/Room/api/service'

export const SelectName = ({ setUserName, roomCode }) => {
	const [inputValue, setInputValue] = useState('')
	const [connectRoom, {}] = roomAPI.useConnectRoomMutation()

	const handleSelectName = () => {
		const player = { name: inputValue }
		setUserName(inputValue)
		const data = { roomCode, player }
		connectRoom(data)
		socket.emit('joinRoom', { roomCode, playerName: inputValue })
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
