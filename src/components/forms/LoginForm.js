import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../../reducers/userReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { Container, Col, Form, InputGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { Formik } from 'formik'
import * as Yup from 'yup'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const LoginForm = ({ setNotification, ...props }) => {

	const handleLogin = async (values) => {
		const userCreds = {
			email: values.email,
			password : values.password
		}

		props.login(userCreds)
			.then(() => {
				setNotification({
					message: 'Logged in successfully',
					variant: 'info'
				}, 5)
				document.location.href='/'
			})
			.catch(error => {
				const notification = JSON.parse(error.request.responseText)
				setNotification({
					message: notification.error,
					variant: 'danger'
				}, 5)
			})
	}

	// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
	const mediumStrPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

	const loginFormSchema = Yup.object().shape({
		email: Yup.string()
			.email('Адреса електронної пошти недійсна.')
			.required('Введіть свою електронну пошту.'),
		password: Yup.string()
			.min(8, 'Мінімум 8 символів.')
			.matches(mediumStrPass, 'Мінімум 8 символів, принаймні одна велика літера, одна маленька літера та одне число.')
			.required('Будь ласка, введіть свій пароль.')
	})

	// password visibility
	const [passHidden, setPassVis] = useState(false)

	const togglePassVis = () => {
		setPassVis(!passHidden)
		let passInput = document.getElementById('loginPass')
		if (passHidden) {
			passInput.type = 'password'
		} else {
			passInput.type = 'text'
		}
	}

	return (
		<Container className="pb-4">
			<h1 className="text-center custom-font py-4">
				Логін
			</h1>
			<Formik
				initialValues={{
					email: '',
					password: ''
				}}
				onSubmit={async (values, { resetForm }) => {
					await handleLogin(values)
					resetForm()
				}}
				validationSchema={loginFormSchema}
			>
				{({ handleSubmit,
					handleChange,
					handleBlur,
					values,
					touched,
					errors
				}) => (
					<Form data-cy="loginForm"
						noValidate
						onSubmit={handleSubmit}
					>

						{/* Message sender email input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group as={Col} sm="10">
								<Form.Label>
									Ваша електронна пошта
								</Form.Label>
								<Form.Control
									type="email"
									name="email"
									data-cy="emailInput"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
									isValid={touched.email && !errors.email}
									isInvalid={touched.email && !!errors.email}
								/>
								<Form.Control.Feedback>
									Ok
								</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{errors.email}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>

						{/* User password input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group as={Col} sm="10" >
								<Form.Label>
									Ваш пароль
								</Form.Label>
								<InputGroup>
									<Form.Control
										id="loginPass"
										className="elevated-z-index"
										type="password"
										name="password"
										data-cy="passwordInput"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.password}
										isValid={touched.password && !errors.password}
										isInvalid={touched.password && !!errors.password}
									/>
									<InputGroup.Append>
										<Button
											variant="outline-secondary border rounded-right"
											onClick={() => togglePassVis()}
										>
											{passHidden
												? <FontAwesomeIcon icon={faEyeSlash} />
												: <FontAwesomeIcon icon={faEye} />
											}
										</Button>
									</InputGroup.Append>
									<Form.Control.Feedback>
										Ok
									</Form.Control.Feedback>
									<Form.Control.Feedback type="invalid">
										{errors.password}
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Form.Row>

						{/* Button */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								as={Col}
								sm="10"
								className="d-flex
								justify-content-between
								align-items-center"
							>
								<Link to="/register">
									Реєстрація
								</Link>
								<Link to="/recover">
									Відновлення паролю
								</Link>
							</Form.Group>
							<Form.Group
								as={Col}
								sm="10"
								className="d-flex pt-3
									justify-content-center
									align-items-center"
							>
								<Button
									type="submit"
									variant="primary"
									data-cy="contactMsgBtn"
									className="primary-color-shadow px-5"
								>
									Логін
								</Button>
							</Form.Group>
						</Form.Row>
					</Form>
				)}
			</Formik>
		</Container>
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
