import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
	const navigate = useNavigate()

	const onCreateRoomClick = () => {
		navigate('/lobby/555666')
	}

	return (
		<div className='flex items-center flex-col gap-5'>
			<h1 className='mb-20'>Опасные слова</h1>

			<Button type='primary' onClick={onCreateRoomClick}>
				Создать комнату
			</Button>
			<Button type='primary'>Присоединиться</Button>
		</div>
	)
}

export default HomePage
