import { Button, Input, Modal } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const ModalJoin = ({ isModalJoin, setIsModalJoin }) => {
	const [value, setValue] = useState()
	const navigate = useNavigate()

	const handleCancel = () => {
		setIsModalJoin(false)
	}

	const handleConnect = () => {
		navigate(`/lobby/${value}`)
		setIsModalJoin(false)
	}

	return (
		<Modal
			title='Введите код комнаты'
			open={isModalJoin}
			onCancel={handleCancel}
			footer={[]}
		>
			<Input value={value} onChange={e => setValue(e.target.value)} />
			<Button className='text-2xl w-full mt-5' onClick={handleConnect}>
				Присоединиться
			</Button>
		</Modal>
	)
}
