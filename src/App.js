import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Notification from './components/Notification'
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import MainPage from './components/MainPage'
import AboutView from './components/AboutView'

/*
import BlogAddForm from './components/BlogAddForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

import Blogs from './components/Blogs'
import BlogPost from './components/BlogPost'
import UsersList from './components/UsersList'
import UserInfo from './components/UserInfo'*/
import { setUserFromLocalStorage } from './reducers/userReducer'
import './css/index.css'
import { Container } from 'react-bootstrap'

const App = (props) => {
	// const blogFormRef = React.createRef()

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


				{/* Routes
				<Route path="/login" render={() => <LoginForm />} />
				<Route exact path="/users" render={() =>
					props.user ? <UsersList /> : <Redirect to="/login" />
				} />

				<Route exact path="/users/:id" render={({ match }) =>
					props.user ? <UserInfo userId={match.params.id} /> : <Redirect to="/login" />
				} />

				<Route exact path="/" render={() =>
					props.user ?
					<>
						<Togglable buttonLabel="new blog" dataCy="addBlogFormToggle" ref={blogFormRef}>
							<BlogAddForm />
						</Togglable>
					</>
					: <div>Login or sign up to add something</div>
				} />

				<Route exact path="/blogs" render={() => <Blogs />} />

				<Route exact path="/blogs/:id" render={({ match }) =>
					<BlogPost blogId={match.params.id} />
				} />
				 Routes end */}

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
