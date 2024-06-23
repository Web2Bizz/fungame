import { Avatar, Button, Input, Space, Table } from 'antd'
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
	isGuess: true,
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
	isGuess: false,
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
	const [wordList, setWordList] = useState([
		{
			id: 1,
			word: 'word1',
		},
	])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const handleDelete = id => {
		setWordList(prevWordList => prevWordList.filter(word => word.id !== id))
		setSelectedRowKeys(prevSelectedRowKeys =>
			prevSelectedRowKeys.filter(key => key !== id)
		)
	}

	const onSelectChange = selectedRowKeys => {
		setSelectedRowKeys(selectedRowKeys)
	}

	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange,
		getCheckboxProps: record => ({
			disabled:
				selectedRowKeys.length >= 5 && !selectedRowKeys.includes(record.id),
		}),
	}

	return (
		<div style={{ height: 'calc(100vh - 80px)' }} className='flex flex-col'>
			<GameHeader currentRound={1} />
			<ProposeWord word={'Голубь'} />

			{/* <GuessPlacementTrap traps={traps} /> */}
			<GuessTrapWord />

			{/* <MakeWishPlacementTrap
				wordList={wordList}
				setWordList={setWordList}
				rowSelection={rowSelection}
				handleDelete={handleDelete}
			/> */}
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

const MakeWishPlacementTrap = ({
	wordList,
	setWordList,
	rowSelection,
	handleDelete,
}) => {
	const [inputValue, setInputValue] = useState('')

	const handleInputWord = () => {
		const newWord = {
			id: wordList.length + 1,
			word: inputValue,
		}
		setWordList([...wordList, newWord])
		setInputValue('')
	}

	return (
		<div className='flex flex-grow justify-between items-center flex-col mt-10 text-2xl'>
			<div>
				<p>Расстановка ловушек {rowSelection.selectedRowKeys.length}/5</p>
				<RenderListTraps
					wordList={wordList}
					handleDelete={handleDelete}
					rowSelection={rowSelection}
				/>
			</div>
			<div>
				<MakeWishInputWords
					inputValue={inputValue}
					setInputValue={setInputValue}
					handleInputWord={handleInputWord}
				/>
				<MakeWishButtonComplete />
			</div>
		</div>
	)
}

const RenderListTraps = ({ wordList, handleDelete, rowSelection }) => {
	const columns = [
		{
			title: '№',
			key: 'index',
			render: (_, __, index) => index + 1,
		},
		{
			title: 'word',
			dataIndex: 'word',
			key: 'word',
		},
		{
			title: '',
			key: 'action',
			render: (_, record) => (
				<Space size='middle'>
					<Button
						className='text-sm'
						type='primary'
						onClick={() => handleDelete(record.id)}
					>
						Delete
					</Button>
				</Space>
			),
		},
	]

	return (
		<div className='w-full border-2 rounded-xl'>
			<Table
				className='h-full'
				columns={columns}
				dataSource={wordList}
				pagination={false}
				showHeader={false}
				rowSelection={rowSelection}
				rowKey='id' // Добавляем ключ для каждой строки
			/>
		</div>
	)
}

const MakeWishInputWords = ({ inputValue, setInputValue, handleInputWord }) => {
	return (
		<div className='flex mt-2'>
			<Input
				className='text-2xl'
				placeholder='Слово ловушка...'
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
			/>
			<Button className='text-2xl' onClick={handleInputWord}>
				ОК
			</Button>
		</div>
	)
}

const MakeWishButtonComplete = () => {
	return (
		<div className='w-full mt-2'>
			<Button className='text-2xl w-full' type='primary'>
				Готово 0/2
			</Button>
		</div>
	)
}

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
	return (
		<div>
			<p>Осталось времени:</p>
			<p>1:00</p>
		</div>
	)
}

export default RoundPage
