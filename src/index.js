import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')
	)
}

render()
store.subscribe(render)

const debugInfo = {
	currentMode: process.env.NODE_ENV,
	apiPath: process.env.REACT_APP_API_URL
}

console.log('Some debug info:')
console.table(debugInfo)