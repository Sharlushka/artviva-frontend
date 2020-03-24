import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { signUpUser } from '../../reducers/accountReducer'
import passwordService from '../../services/password'
import { Container, Col, Form, InputGroup, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ButtonComponent from '../common/Button'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const RegisterForm = ({ setNotification, account, ...props }) => {
	// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
	const mediumStrPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

	const loginFormSchema = Yup.object().shape({
		/*
		userType: Yup.string()
			.oneOf(['Вчитель', 'Батько'], 'Ви вчитель чи батько?')
			.required('Будь ласка, виберіть, хто ви є.'),*/
		email: Yup.string()
			.email('Адреса електронної пошти недійсна.')
			.required('Введіть свою електронну пошту.'),
		name: Yup.string()
			.min(2, 'Не менш 3 символів.')
			.max(45, 'Максимум 45 символів.')
			.required('Введіть ім\'я.'),
		middlename: Yup.string()
			.min(2, 'Не менш 3 символів.')
			.max(45, 'Максимум 45 символів.')
			.required('Введіть по батькові.'),
		lastname: Yup.string()
			.min(2, 'Не менш 3 символів.')
			.max(45, 'Максимум 45 символів.')
			.required('Введіть прізвище.'),
		password: Yup.string()
			.min(8, 'Мінімум 8 символів.')
			.matches(mediumStrPass, 'Мінімум 8 символів, принаймні одна велика літера, одна маленька літера та одне число.')
			.required('Будь ласка, введіть свій пароль.'),
		passwordConfirm: Yup.string()
			.min(8, 'Мінімум 8 символів.')
			.matches(mediumStrPass, 'Мінімум 8 символів, принаймні одна велика літера, одна маленька літера та одне число.')
			.required('Будь ласка, введіть підтвердження свого пароля.')
			.when('password', {
				is: value => value && value.length > 0,
				then: Yup.string()
					.oneOf([Yup.ref('password')], 'Обидва паролі повинні бути однаковими.')
			}),
		termsCheckbox: Yup.boolean()
			.oneOf([true], 'Будь ласка, погодьтеся з умовами використання сайту.')
	})

	const handleRegister = values => {
		console.log('Registering user', values)
		const userCreds = {
			email: values.email,
			name: values.name,
			middlename: values.middlename,
			lastname: values.lastname,
			password : values.password
		}
		props.signUpUser(userCreds)
			.then(() => {
				setNotification({
					message: 'Ви отримаєте електронний лист із посиланням для активації свого акаунта.',
					variant: 'success'
				}, 5)
				// redirect to success page
				// document.location.href='/'
			})
			.catch(error => {
				const notification = JSON.parse(error.request.responseText)
				setNotification({
					message: notification.error,
					variant: 'danger'
				}, 5)
			})
	}

	useEffect(() => {
		console.log('Account changed', account)
		// send activation email
		async function sendActivation() {
			await passwordService.sendAccountActivationEmail(account)
				.then(() => {
					setNotification({
						message: 'Ваше повідомлення надіслано, дякуємо вам.',
						variant: 'success'
					}, 5)
				})
				.catch(error => {
					setNotification({
						message: `На жаль, нам не вдалося надіслати ваше повідомлення, ось помилка: ${error.message}`,
						variant: 'danger'
					}, 5)
				})
		}
		if (account) {
			sendActivation()
		}
	}, [account, setNotification])

	const checkboxLabel = () => <>Я погоджуюся з <Link to="#">умовами</Link> використання сайту</>

	// password visibility
	const [passHidden, setPassVis] = useState(false)
	const [passConfirmHidden, setPassConfirmVis] = useState(false)

	const togglePassFieldType = field => {
		switch (field) {
		case 'pass' :
			setPassVis(!passHidden)
			break
		case 'passConfirm' :
			setPassConfirmVis(!passConfirmHidden)
			break
		default:
			return null
		}
	}

	return (
		<Container className="pb-4">
			<h1 className="text-center custom-font py-4">
				Реєстрація
			</h1>
			<Formik
				initialValues={{
					/*userType: '',*/
					email: '',
					name: '',
					middlename: '',
					lastname: '',
					password: '',
					passwordConfirm: '',
					termsCheckbox: false
				}}
				onSubmit={async (values, { resetForm }) => {
					await handleRegister(values)
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
					<Form data-cy="registerForm"
						noValidate
						onSubmit={handleSubmit}
						className="text-left"
					>
						{/*<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId="userTypeSelect"
								as={Col}
								className="col-md-10 col-lg-7"
							>
								<Form.Label>Ви вчитель чи батько?</Form.Label>
								<Form.Control
									as="select"
									name="userType"
									data-cy="userTypeSelect"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.userType}
									isValid={touched.userType && !errors.userType}
									isInvalid={touched.userType && !!errors.userType}
								>
									<option>Виберіть...</option>
									<option>Вчитель</option>
									<option>Батько</option>
								</Form.Control>
								<Form.Control.Feedback>
									Ok
								</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{errors.userType}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>*/}

						{/* User email input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId="userEmailInput"
								as={Col}
								className="col-md-10 col-lg-7"
							>
								<Form.Label>
									Ваша електронна пошта
								</Form.Label>
								<Form.Control
									type="email"
									name="email"
									data-cy="emailInput"
									placeholder="Ваш майбутній логін"
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

						{/* User name input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId="userNameInput"
								as={Col}
								className="col-md-10 col-lg-7"
							>
								<Form.Label>
									Ваше ім&apos;я
								</Form.Label>
								<Form.Control
									type="text"
									name="name"
									data-cy="nameInput"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.name}
									isValid={touched.name && !errors.name}
									isInvalid={touched.name && !!errors.name}
								/>
								<Form.Control.Feedback>
									Ok
								</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{errors.name}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>

						{/* User middle name input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId="userMiddlenameInput"
								as={Col}
								className="col-md-10 col-lg-7"
							>
								<Form.Label>
									По батькові
								</Form.Label>
								<Form.Control
									type="text"
									name="middlename"
									data-cy="middlenameInput"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.middlename}
									isValid={touched.middlename && !errors.middlename}
									isInvalid={touched.middlename && !!errors.middlename}
								/>
								<Form.Control.Feedback>
									Ok
								</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{errors.middlename}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>

						{/* User last name input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId="userLastnameInput"
								as={Col}
								className="col-md-10 col-lg-7"
							>
								<Form.Label>
									Прізвище
								</Form.Label>
								<Form.Control
									type="text"
									name="lastname"
									data-cy="lastnameInput"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.lastname}
									isValid={touched.lastname && !errors.lastname}
									isInvalid={touched.lastname && !!errors.lastname}
								/>
								<Form.Control.Feedback>
									Ok
								</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{errors.lastname}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>

						{/* User password input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId="userPassInput"
								as={Col}
								className="col-md-10 col-lg-7"
							>
								<Form.Label>
									Ваш пароль
								</Form.Label>
								<InputGroup>
									<Form.Control
										className="elevated-z-index"
										type={passHidden ? 'text' : 'password'}
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
											onClick={() => togglePassFieldType('pass')}
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

						{/* User password confirmation input */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								controlId="userPassConfirmInput"
								as={Col}
								className="col-md-10 col-lg-7"
							>
								<Form.Label>
									Підтвердження пароля
								</Form.Label>
								<InputGroup>
									<Form.Control
										className="elevated-z-index"
										type={passConfirmHidden ? 'text' : 'password'}
										name="passwordConfirm"
										data-cy="passwordConfirmInput"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.passwordConfirm}
										isValid={touched.passwordConfirm && !errors.passwordConfirm}
										isInvalid={touched.passwordConfirm && !!errors.passwordConfirm}
									/>
									<InputGroup.Append>
										<Button
											variant="outline-secondary border rounded-right"
											onClick={() => togglePassFieldType('passConfirm')}
										>
											{passConfirmHidden
												? <FontAwesomeIcon icon={faEyeSlash} />
												: <FontAwesomeIcon icon={faEye} />
											}
										</Button>
									</InputGroup.Append>
									<Form.Control.Feedback>
										Ok
									</Form.Control.Feedback>
									<Form.Control.Feedback type="invalid">
										{errors.passwordConfirm}
									</Form.Control.Feedback>
								</InputGroup>
							</Form.Group>
						</Form.Row>

						{/* Checkbox */}
						<Form.Row className="d-flex justify-content-center">
							<Form.Group
								as={Col}
								className="col-md-10 col-lg-7"
							>
								<Form.Check
									custom
									name='termsCheckbox'
									type={'checkbox'}
									id={'termsCheckbox'}
									data-cy='termsCheckbox'
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.termsCheckbox}
									isValid={touched.termsCheckbox && !errors.termsCheckbox}
									isInvalid={touched.termsCheckbox && !!errors.termsCheckbox}
									label={checkboxLabel()}
								/>
								<Form.Control.Feedback>
										Ok
								</Form.Control.Feedback>
								<Form.Control.Feedback type="invalid">
									{errors.termsCheckbox}
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>

						{/* Button */}
						<Form.Row className='d-flex justify-content-center text-center'>
							<Form.Group
								as={Col}
								className='col-md-10 col-lg-7 pt-4'
							>
								<ButtonComponent
									className={'px-4 primary-color-shadow'}
									variant={'primary'}
									type={'submit'}
									label={'Реєстрація'}
								/>
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
		user: state.user,
		account: state.account
	}
}

const mapDispatchToProps = {
	signUpUser,
	setNotification
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RegisterForm)
