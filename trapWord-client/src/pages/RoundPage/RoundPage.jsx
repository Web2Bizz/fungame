import { Avatar } from 'antd'
import { useState } from 'react'

const guessTeam = {
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

const makeWishTeam = {
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

const traps = [
	{
		id: 1,
		name: 'Ловушка 1',
	},
	{
		id: 2,
		name: 'Ловушка 2',
	},
]

const RoundPage = () => {
	const [word, setWord] = useState('')

	return (
		<div>
			<GameHeader currentRound={1} />
			<ProposeWord word={word} />

			{/* <GuessPlacementTrap guessTeam={guessTeam.players} traps={traps} /> */}
			<MakeWishPlacementTrap />
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

const ProposeWord = ({ word }) => {
	return (
		<div className='bg-slate-500 flex flex-col text-center items-center text-2xl'>
			<p>Слово:</p>
			{word ? <p>{word}</p> : <p>Дождитесь пока расставят ловушки</p>}
		</div>
	)
}

const MakeWishPlacementTrap = () => {
	const [value, setValue] = useState('')
	const [traps, setTraps] = useState([])

	return (
		<div>
			<div className='flex items-center flex-col my-10 text-2xl'>
				<p>Расстановка ловушек {traps?.length}/5</p>
			</div>
		</div>
	)
}

const RenderListTraps = () => {}

const GuessPlacementTrap = ({ traps }) => {
	return (
		<div>
			<div className='flex items-center flex-col my-10 text-2xl'>
				<p>Расстановка ловушек...</p>
				<p>Ловушки {traps?.length}/5</p>
			</div>
			<div className='flex flex-col gap-3'>
				{traps.map(items => {
					return (
						<div key={items.id} className='flex items-center gap-3'>
							<Avatar shape='square' alt='Trap' />
							<p>{items.name}</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}

const MakeWishTrapWord = () => {
	return <div></div>
}

const GuessTrapWord = () => {
	return <div></div>
}

export default RoundPage
