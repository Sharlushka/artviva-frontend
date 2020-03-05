import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'

import Notification from './components/Notification'
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import MainPage from './components/MainPage'
import AboutView from './components/views/AboutView'
import LoginView from './components/views/LoginView'
import RegisterView from './components/views/RegisterView'
import BlogView from './components/views/BlogView'
// import DebugView from './components/views/DebugView'
import ContactsView from './components/views/ContactsView'
import TeachersView from './components/views/TeachersView'
import RecoverView from './components/views/RecoverView'
import ScrollToTop from './components/common/ScrollToTop'

import { setUserFromLocalStorage } from './reducers/loginReducer'
import './css/index.css'
import { Container } from 'react-bootstrap'

const App = (props) => {
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

	return (
		<ParallaxProvider>
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

					<Route exact path="/teachers" render={() =>
						<TeachersView />
					} />

					<Route exact path="/login" render={() =>
						<LoginView />
					} />

					<Route exact path="/recover" render={() =>
						<RecoverView />
					} />

					<Route exact path="/register" render={() =>
						<RegisterView />
					} />

					<Route exact path="/blog" render={() =>
						<BlogView />
					} />

					<Route exact path="/contacts" render={() =>
						<ContactsView />
					} />

					{/*
					<Route exact path="/debug" render={() =>
						<DebugView />
					} />*/}

				</Container>
				<Footer />
				<ScrollToTop />
			</Router>
		</ParallaxProvider>
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
