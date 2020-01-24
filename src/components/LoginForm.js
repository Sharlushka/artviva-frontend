import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LoginForm = (props) => {
	const { reset : resetEmail, ...email } = useField('email')
	const { reset : resetPass, ...password } = useField('password')

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
			<h3 className="text-center alternate-font py-4">
				Логін
			</h3>
			<Form data-cy="loginForm" onSubmit={handleLogin}>
				<Form.Group>
					<Form.Label>Електронна адреса</Form.Label>
					<Form.Control
						name="email"
						data-cy="emailInput"
						{...email}
					/>
					<Form.Label>Пароль</Form.Label>
					<Form.Control
						name="password"
						data-cy="passwordInput"
						{...password}
					/>
					<Row className="p-3 d-flex justify-content-between align-items-center">
						<Link to="/register">
							Новий користувач?
						</Link>
						<Button
							type="submit"
							variant="primary"
							data-cy="loginBtn"
						>
							Логін
						</Button>
					</Row>
				</Form.Group>
			</Form>
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
