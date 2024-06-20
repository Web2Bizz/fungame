import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'

export default function RouterWrapper() {
	return <RouterProvider router={routes} />
}
