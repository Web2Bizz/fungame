import { createBrowserRouter } from 'react-router-dom'
import { GamePage, HomePage, LobbyPage, RoundPage } from '../../pages'

export const routes = createBrowserRouter([
	{
		path: '',
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/lobby/:id',
				element: <LobbyPage />,
				children: [
					{
						path: 'game',
						element: <GamePage />,
						children: [
							{
								path: 'round',
								element: <RoundPage />,
							},
						],
					},
				],
			},

			{
				path: '*',
				element: <div>notfound 404</div>,
			},
		],
	},
])
