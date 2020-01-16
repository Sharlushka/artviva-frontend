import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'
import Togglable from './Togglable'
import SignUp from './SignUp'

const LoginForm = (props) => {
	const { reset : resetEmail, ...email } = useField('email')
	const { reset : resetPass, ...password } = useField('password')
	const signUpRef = React.createRef()

	const handleLogin = async event => {
		event.preventDefault()
		const userCreds = {
			email: email.value,
			password : password.value
		}
		props.login(userCreds)
			.then(() => {
				props.setNotification({
					message: 'Logged in successfully',
					variant: 'info'
				 }, 5)
				document.location.href='/'
			})
			.catch(error => {
				const notification = JSON.parse(error.request.responseText)
				props.setNotification({ 
					message: notification.error,
					variant: 'danger'
				}, 5)
			})
			resetEmail('')
			resetPass('')
	}

	return (
		<>
			<h4>Login into application</h4>
			<Form data-cy="loginForm" onSubmit={handleLogin}>
				<Form.Group>
					<Form.Label>email</Form.Label>
					<Form.Control
						name="email"
						data-cy="emailInput"
						{...email}
					/>
					<Form.Label>password</Form.Label>
					<Form.Control
						name="password"
						data-cy="passwordInput"
						{...password}
					/>
				<Button className="my-3" type="submit" variant="primary" data-cy="loginBtn">login</Button>
				</Form.Group>
			</Form>
			<Togglable buttonLabel="sign up" dataCy="signUp" ref={signUpRef}>
				<SignUp />
			</Togglable>
	</>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	login,
	setNotification
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm)
