import { Avatar } from 'antd'

export const ParticipantList = ({ participants }) => {
	if (!participants || participants.length === 0) {
		return (
			<div className='flex justify-center'>
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
