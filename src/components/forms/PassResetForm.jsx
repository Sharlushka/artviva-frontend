import React, { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../../reducers/loginReducer'
import passwordService from '../../services/password'
import { setNotification } from '../../reducers/notificationReducer'
import { Container, Col, Form, InputGroup, Button } from 'react-bootstrap'

import { Formik } from 'formik'
import * as Yup from 'yup'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const PassResetForm = ({ setNotification, passResetToken, email }) => {

	const handlePassReset = values => {
		console.log('Pass reset values are:', values)
		const data = {
			email,
			passResetToken: passResetToken,
			password: values.password
		}

		passwordService.resetUserPassword(data)
			.then(() => {
				setNotification({
					message: 'Password was succesfully reset, you may login now.',
					variant: 'success'
				}, 5)
			})
			.catch(error => {
				const { message } = { ...error.response.data }
				setNotification({
					message,
					variant: 'danger'
				}, 5)
			})
	}
	// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
	const mediumStrPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

	const loginFormSchema = Yup.object().shape({
		password: Yup.string()
			.min(8, 'Мінімум 8 символів.')
			.matches(mediumStrPass, 'Мінімум 8 символів, принаймні одна велика літера, одна маленька літера та одне число.')
			.required('Будь ласка, введіть свій пароль.')
	})

	// password visibility
	const [passHidden, setPassVis] = useState(false)

	const togglePassVis = () => {
		setPassVis(!passHidden)
		let passInput = document.getElementById('NewUserPass')
		if (passHidden) {
			passInput.type = 'password'
		} else {
			passInput.type = 'text'
		}
	}

	return (
		<Container className="pb-4">
			<Formik
				initialValues={{
					password: ''
				}}
				onSubmit={async (values, { resetForm }) => {
					await handlePassReset(values)
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
						{/* User new password input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group as={Col} sm={10} md={6} lg={5}>
								<Form.Label>
									Ваш новий пароль
								</Form.Label>
								<InputGroup>
									<Form.Control
										id="NewUserPass"
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
												? <FontAwesomeIcon icon={faEye} />
												: <FontAwesomeIcon icon={faEyeSlash} />
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
								sm={10}
								className="d-flex pt-3
									justify-content-center
									align-items-center"
							>
								<Button
									type="submit"
									variant="primary"
									data-cy="PassResetBtn"
									className="primary-color-shadow px-5"
								>
									Змінити пароль
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
)(PassResetForm)
