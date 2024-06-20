import React from 'react'
import ReactDOM from 'react-dom/client'
import RouterWrapper from '../routes/routerWrapper'
import '../style/antd.scss'
import '../style/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterWrapper />
	</React.StrictMode>
)
