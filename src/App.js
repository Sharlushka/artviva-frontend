import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Notification from './components/Notification'
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import MainPage from './components/MainPage'
import AboutView from './components/AboutView'
import LoginView from './components/LoginView'
import RegisterView from './components/RegisterView'
import BlogView from './components/BlogView'

import { setUserFromLocalStorage } from './reducers/userReducer'
import './css/index.css'
import './css/styles.css'
import { Container } from 'react-bootstrap'

const App = (props) => {
	/*
	useEffect(() => {
		if (!props.user) {
			const loggedUserJSON = window.localStorage.getItem('loggedUserJSON')
			if (loggedUserJSON) {
				const loggedUser = JSON.parse(loggedUserJSON)
				props.setUserFromLocalStorage(loggedUser)
			} else {
				console.log('No user.')
			}
		} else {
			window.localStorage.setItem(
				'loggedUserJSON', JSON.stringify(props.user)
			)
		}
	}, [props, props.user, props.setUserFromLocalStorage])
	*/

	return (
		<>
			<Router>
				<NavigationBar />
				<Container role="main" className="px-0 mx-0" fluid data-cy="mainContainer">
					<Notification />
					<Route exact path="/" render={() =>
						<MainPage />
					} />

					<Route exact path="/about" render={() =>
						<AboutView />
					} />

					<Route exact path="/login" render={() =>
						<LoginView />
					} />

					<Route exact path="/register" render={() =>
						<RegisterView />
					} />

					<Route exact path="/blog" render={() =>
						<BlogView />
					} />

				</Container>
				<Footer />
			</Router>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	setUserFromLocalStorage
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
