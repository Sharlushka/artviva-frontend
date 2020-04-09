import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ParallaxProvider } from 'react-scroll-parallax'
import { loadReCaptcha } from 'react-recaptcha-google'

import Notification from './components/Notification'
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import MainPage from './components/MainPage'
import AboutView from './components/views/AboutView'
import LoginView from './components/views/LoginView'
import RegisterView from './components/views/RegisterView'
import BlogView from './components/views/BlogView'
import ContactsView from './components/views/ContactsView'
import TeachersView from './components/views/TeachersView'
import RecoverView from './components/views/RecoverView'
import ProfileView from './components/views/ProfileView'
import PaymentView from './components/views/PaymentView'
import ActivateAccountView from './components/views/ActivateAccountView'
import PassResetView from './components/views/PassResetView'
import ScrollToTop from './components/common/ScrollToTop'

import { setUserFromLocalStorage } from './reducers/loginReducer'
import './css/index.css'

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

	useEffect(() => {
		loadReCaptcha()
	}, [])

	return (
		<Router>
			<NavigationBar />
			<Notification />
			<Switch>
				<ParallaxProvider>
					<Route path="/" exact component={MainPage} />
					<Route path="/about" component={AboutView} />
					<Route path="/teachers/:department?" component={TeachersView} />
					<Route path="/login" component={LoginView} />
					<Route path="/recover" component={RecoverView} />
					<Route path="/register" component={RegisterView} />
					<Route path="/blog" component={BlogView} />
					<Route path="/contacts" component={ContactsView} />
					<Route path="/profile" component={ProfileView} />
					<Route path="/pay" component={PaymentView} />
					<Route path="/activate/:email/:uuid" exact component={ActivateAccountView} />
					<Route path="/reset/:email/:uuid" exact component={PassResetView} />
				</ParallaxProvider>
			</Switch>
			<Footer />
			<ScrollToTop />
		</Router>
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
