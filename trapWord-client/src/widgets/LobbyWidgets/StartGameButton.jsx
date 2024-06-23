import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export const StartGameButton = ({ roomCode }) => {
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
