import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { setNotification } from '../reducers/notificationReducer'
import usersService from '../services/usersList' // users!
import { Form, Button } from 'react-bootstrap'

const SignUp = (props) => {
	const { reset : resetName, ...username } = useField('text')
	const { reset : resetEmail, ...email } = useField('email')
	const { reset : resetPass, ...password } = useField('password')

	const handleSignUp = async event => {
		event.preventDefault()
		const userCreds = {
			email: email.value,
			username: username.value,
			password : password.value
		}
		usersService.signUp(userCreds)
			.then(() => {
				props.setNotification({
					message: 'Signup successful',
					variant: 'success'
				 }, 5)
				resetName('')
				resetEmail('')
				resetPass('')
				document.location.href='/'
			})
			.catch(error => {
				const notification = JSON.parse(error.request.responseText)
				props.setNotification({
					message: notification.error,
					variant: 'danger'
				 }, 5)
			})
	}

	return (
		<>
			<h4>New user sign up</h4>
			<Form data-cy="signUpForm" onSubmit={handleSignUp}>
				<Form.Group>
					<Form.Label>email</Form.Label>
						<Form.Control
							name="email"
							data-cy="inputRegEmail"
							{...email}
						/>
					<Form.Label>username</Form.Label>
					<Form.Control
							name="name"
							data-cy="inputUserName"
							{...username}
						/>
					<Form.Label>password</Form.Label>
					<Form.Control
							name="password"
							data-cy="inputRegPass"
							{...password}
						/>
					<Button
						className="my-3"
						variant="primary"
						type="submit"
						data-cy="signupBtn"
					>
						sign up
					</Button>
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
	setNotification
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUp)
