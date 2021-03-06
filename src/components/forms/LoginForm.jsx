import React, { useState, useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../reducers/loginReducer'
import { setNotification } from '../../reducers/notificationReducer'

import { Formik } from 'formik'
import * as Yup from 'yup'

import { Container, Col, Form, InputGroup, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

import ReCaptchaComp from '../common/ReCaptchaComp'
import BtnWithSpinner from '../common/BtnWithSpinner'

// const LoginForm = ({ user, setNotification, ...props }) => {
const LoginForm = ({ setNotification, ...props }) => {

	const unmounted = useRef(false)
	const history = useHistory()
	const [loginSuccessful, setLoginSuccessful] = useState(false)

	useEffect(() => {
		if (loginSuccessful) history.push('/school/overview')
	}, [loginSuccessful, history])

	useEffect(() => {
		return () => { unmounted.current = true }
	}, [])

	const [logginIn, setLogginIn] = useState(false)

	const handleLogin = async ({ email, password }) => {
		const userCreds = {
			email: email,
			password : password
		}
		setLogginIn(true)
		props.login(userCreds)
			.then(() => {
				setNotification({
					message: 'Ви успішно ввійшли в систему.',
					variant: 'info'
				}, 5)
				setLoginSuccessful(true)
			})
			.catch(error => {
				const { message } = { ...error.response.data }
				setNotification({
					message,
					variant: 'danger'
				}, 5)
			})
			.finally(() => {
				if (!unmounted.current) {
					setLogginIn(false)
				}
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
			.matches(mediumStrPass,
				'Мінімум 8 символів, принаймні одна велика літера, одна маленька літера та одне число.')
			.required('Будь ласка, введіть свій пароль.')
	})

	// password visibility
	const [passHidden, setPassVis] = useState(false)

	const togglePassVis = () => {
		setPassVis(!passHidden)
		let passInput = document.getElementById('login-pass')
		if (passHidden) {
			passInput.type = 'password'
		} else {
			passInput.type = 'text'
		}
	}

	// recaptcha
	const reCaptchaRef = React.createRef()
	const [score, setScore] = useState(null)

	const setRecaptchaScore = score => {
		if (!unmounted.current) {
			if (score <= .1) {
				setNotification({
					message: `Ваша оцінка recaptcha занизька: ${score}, спробуйте оновити сторінку.`,
					variant: 'warning'
				}, 5)
			}
			setScore(score)
		}
	}

	return (
		<>
			<Container className="pb-4">
				<h1 className="text-center custom-font py-4">
					Логін
				</h1>
				<Formik
					initialValues={{
						email: '',
						password: ''
					}}
					onSubmit={async (values) => {
						await handleLogin(values)
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
						<Form
							data-cy="login-form"
							noValidate
							onSubmit={handleSubmit}
						>

							{/* Message sender email input */}
							<Form.Row className="d-flex justify-content-center">
								<Form.Group as={Col} sm={10} >
									<Form.Label>
										Ваша електронна пошта
									</Form.Label>
									<Form.Control
										type="email"
										name="email"
										data-cy="email-input"
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
							<Form.Row className="d-flex1 justify-content-center">
								<Form.Group as={Col} sm={10} >
									<Form.Label>
										Ваш пароль
									</Form.Label>
									<InputGroup>
										<Form.Control
											id="login-pass"
											className="elevated-z-index"
											type="password"
											name="password"
											data-cy="password-input"
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
										<Form.Control.Feedback className="login-pass-feedback">
											Ok
										</Form.Control.Feedback>
										<Form.Control.Feedback type="invalid" className="login-pass-feedback">
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
									sm={10}
									className="d-flex pt-3
										justify-content-center
										align-items-center"
								>
									<BtnWithSpinner
										type="submit"
										style= {{ width: '7rem' }}
										loadingState={logginIn}
										disabled={score <= .1 ? true : false}
										waitingState={!score}
										label="Логін"
										variant="primary"
										dataCy="login-btn"
										className="primary-color-shadow px-5"
									/>
								</Form.Group>
							</Form.Row>
						</Form>
					)}
				</Formik>
				<ReCaptchaComp
					ref={reCaptchaRef}
					size="invisible"
					render="explicit"
					badge="bottomleft"
					hl="uk"
					setScore={setRecaptchaScore}
				/>
			</Container>
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
