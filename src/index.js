import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { SnackbarProvider } from 'notistack'

ReactDOM.render(
	<SnackbarProvider
		maxSnack={3}
		anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
	>
		<App />
	</SnackbarProvider>,
	document.getElementById('root')
)
