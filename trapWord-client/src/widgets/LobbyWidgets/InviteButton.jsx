import { Button } from 'antd'

export const InviteButton = ({ setIsModalRefer }) => {
	const handleReferPeople = () => {
		setIsModalRefer(true)
	}

	return (
		<Button className='text-2xl' type='primary' onClick={handleReferPeople}>
			Пригласить людей
		</Button>
	)
}
