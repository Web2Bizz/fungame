import { Button } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { roomAPI } from '../../entitys/Room/api/service.js'
import { ModalJoin } from '../../widgets/index.js'

const HomePage = () => {
	const navigate = useNavigate()
	const [createRoom, {}] = roomAPI.useCreateRoomMutation()
	const [isModalJoin, setIsModalJoin] = useState(false)

	const onCreateRoomClick = async () => {
		try {
			const response = await createRoom()
			if (response.error) {
				console.error('Ошибка при создании комнаты:', response)
			} else {
				const { roomCode } = response.data
				navigate(`/lobby/${roomCode}`)
			}
		} catch (error) {
			console.error('Ошибка при создании комнаты:', error)
		}
	}

	return (
		<>
			<div className='flex items-center flex-col gap-5'>
				<h1 className='mb-20'>Опасные слова</h1>

				<Button type='primary' onClick={onCreateRoomClick}>
					Создать комнату
				</Button>
				<Button type='primary' onClick={() => setIsModalJoin(true)}>
					Присоединиться
				</Button>
				<ModalJoin isModalJoin={isModalJoin} setIsModalJoin={setIsModalJoin} />
			</div>
		</>
	)
}

export default HomePage
