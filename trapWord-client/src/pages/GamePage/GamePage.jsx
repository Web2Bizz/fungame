import { BugOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const fields = [
	{
		id: 1,
		traps: 3,
		pos_player_spawn: true,
		pos_boss_spawn: false,
		has_curse: false,
	},
	{
		id: 2,
		traps: 5,
		pos_player_spawn: false,
		pos_boss_spawn: false,
		has_curse: true,
		curs_text: 'Засунь палец в жопу человеку напротив',
	},
	{
		id: 3,
		traps: 6,
		pos_player_spawn: false,
		pos_boss_spawn: false,
		has_curse: false,
	},
	{
		id: 4,
		traps: 6,
		pos_player_spawn: false,
		pos_boss_spawn: false,
		has_curse: true,
		curs_text: '',
	},
	{
		id: 5,
		traps: 7,
		pos_player_spawn: false,
		pos_boss_spawn: true,
		has_curse: false,
	},
]

const teamOneData = {
	players: [
		{
			id: 1,
			name: 'Player 1',
			avatar:
				'https://avatars.mds.yandex.net/get-entity_search/118114/831955895/S600xU_2x',
		},
		{
			id: 3,
			name: 'Player 3',
			avatar:
				'https://avatars.mds.yandex.net/get-entity_search/118114/831955895/S600xU_2x',
		},
	],
	position: 1,
}

const teamTwoData = {
	players: [
		{
			id: 2,
			name: 'Player 2',
			avatar:
				'https://avatars.mds.yandex.net/get-entity_search/118114/831955895/S600xU_2x',
		},
		{
			id: 4,
			name: 'Player 4',
			avatar:
				'https://avatars.mds.yandex.net/get-entity_search/118114/831955895/S600xU_2x',
		},
	],
	position: 1,
}

const GamePage = () => {
	const [currentPlyers, setCurrentPlayers] = useState(0)
	const [currentRound, setCurrentRound] = useState(1)

	const location = useLocation()
	console.log(location.pathname)
	const isRoundPage = location.pathname.endsWith('round')

	return (
		<div className='px-10 py-10'>
			{isRoundPage ? (
				<Outlet />
			) : (
				<div>
					<GameHeader currentRound={currentRound} />
					<RenderFields />
					<StartRoundButton />
				</div>
			)}
		</div>
	)
}

const GameHeader = ({ currentRound }) => {
	return (
		<div className='flex items-center flex-col z-10 px-5 rounded-lg -mt-5 fixed bg-slate-600 left-1/2 -translate-x-1/2 -translate-y-1/2'>
			<h2 className='text-2xl'>Раунд {currentRound + '/8'}</h2>
		</div>
	)
}

const RenderFields = () => {
	return (
		<div className='flex flex-col items-center gap-5'>
			{fields.map((field, index) => {
				return (
					<div
						className='bg-gray-200 block-wrapper w-full aspect-square'
						key={index}
					>
						{/* Отрисовка количества ловушек*/}
						<div className='bg-gray-400 w-11'>
							{field.traps + ' x '}
							<BugOutlined />
						</div>

						{/* Отрисовка проклятий*/}
						<div className='flex justify-end mr-5'>
							{field.has_curse && (
								<RenderCurse
									cursePos={field.id}
									curseText={field?.curs_text}
									teamOnePos={teamOneData.position}
									teamTwoPos={teamTwoData.position}
								/>
							)}
						</div>

						{/* Отрисовка команд*/}
						<div className='flex justify-around'>
							<RenderTeam team={teamOneData} currentPosition={field.id} />
							<RenderTeam team={teamTwoData} currentPosition={field.id} />
						</div>

						{/* Отрисовка босса*/}
						<div className='flex justify-center'>
							{field.pos_boss_spawn && <RenderBoss />}
						</div>
					</div>
				)
			})}
		</div>
	)
}

const RenderCurse = ({ cursePos, curseText, teamOnePos, teamTwoPos }) => {
	console.log(cursePos, curseText, teamOnePos, teamTwoPos)
	return (
		<div className='bg-gray-400 w-1/2 flex h-20'>
			{cursePos === teamOnePos || cursePos === teamTwoPos ? (
				<div className='flex justify-center items-center text-center'>
					{curseText}
				</div>
			) : (
				<div className='flex justify-center items-center w-full'>Проклятье</div>
			)}
		</div>
	)
}

const RenderTeam = ({ team, currentPosition }) => {
	if (team.position !== currentPosition) return
	return (
		<div className='bg-gray-400 w-1/2 flex h-20 mx-5 mt-5'>
			<div className='flex justify-center items-center w-full '>
				<RenderTeamMember teamMember={team.players} />
			</div>
		</div>
	)
}

const RenderTeamMember = ({ teamMember }) => {
	return (
		<div>
			{teamMember.map(member => (
				<div key={member.id} className='flex items-center'>
					<Avatar src={member.avatar} size={28} alt={`${member.name[0]}`} />
					<span className='text-1xl ml-2'>{member.name}</span>
				</div>
			))}
		</div>
	)
}

const RenderBoss = () => {
	return (
		<div className='bg-gray-400 w-1/2 flex justify-center items-center h-40 mx-5 mt-5'>
			<h2>Billy Harrington</h2>
		</div>
	)
}

const StartRoundButton = () => {
	const navigate = useNavigate()

	const handleStartGame = () => {
		navigate('round')
	}

	return (
		<div className='fixed -mb-3 w-4/5 bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2'>
			<Button type='primary' className='h-12 w-full' onClick={handleStartGame}>
				Начать раунд
			</Button>
		</div>
	)
}

export default GamePage
