import { CopyOutlined } from '@ant-design/icons'
import { Button, Input, Modal, Space } from 'antd'

export const ModalRefer = ({ isModalRefer, roomCode, setIsModalRefer }) => {
	const clientUrl = import.meta.env.VITE_CLIENT_URL
	const roomRef = `${clientUrl}/lobby/${roomCode}`

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
