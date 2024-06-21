import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { setupStore } from '../../shared/api/store'
import RouterWrapper from '../routes/routerWrapper'
import '../style/antd.scss'
import '../style/index.css'

const store = setupStore()

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterWrapper />
		</Provider>
	</React.StrictMode>
)
