import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { Formik } from 'formik'
import * as Yup from 'yup'
import PropTypes from 'prop-types'

const ContactForm = ({ setNotification }) => {

	const messageFormSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Мінімум 2 символи.')
			.max(30, 'Максимум 30 символів.')
			.required('Ваше ім\'я?'),
		email: Yup.string()
			.email('Адреса електронної пошти недійсна.')
			.required('Введіть свою електронну пошту.'),
		message: Yup.string()
			.max(280, 'Максимум 280 символів.')
			.required('Будь ласка, введіть своє повідомлення.')
	})

	const sendContactMessage = values => {
		console.log('Sending message', values)
		setNotification({
			message: `Сайт працює в тестовому режимі,
				повідомлення наразі не надсилаються, але дякуємо
				за участь у тестуванні сайту! )`,
			variant: 'success'
		}, 5)
	}

	return (
		<Container className="py-4">
			<Row className="d-flex justify-content-center">
				<Col sm={10} md={7} lg={6}>
					<h1 className="text-center custom-font pb-4">Зворотній зв&apos;язок</h1>
					<Formik
						initialValues={{
							name: '',
							email: '',
							message: ''
						}}
						onSubmit={async (values, { resetForm }) => {
							await sendContactMessage(values)
							resetForm()
						}}
						validationSchema={messageFormSchema}
					>
						{({ handleSubmit,
							handleChange,
							handleBlur,
							values,
							touched,
							errors
						}) => (
							<Form data-cy="contactForm"
								noValidate
								onSubmit={handleSubmit}
							>

								{/* Message sender name input */}
								<Form.Row>
									<Form.Group controlId="nameInput" as={Col}>
										<Form.Label>
											Ваше ім&apos;я
											<span className="required-text">*</span>
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

								{/* Message sender email input */}
								<Form.Row>
									<Form.Group controlId="emailInput" as={Col}>
										<Form.Label>
											Ваша електронна пошта
											<span className="required-text">*</span>
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

								{/* Message body input */}
								<Form.Row>
									<Form.Group controlId="messageInput" as={Col}>
										<Form.Label>
											Ваше повідомлення
											<span className="required-text">*</span>
										</Form.Label>
										<Form.Control
											as="textarea"
											name="message"
											rows="6"
											data-cy="messageInput"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.message}
											isValid={touched.message && !errors.message}
											isInvalid={touched.message && !!errors.message}
										/>
										<Form.Control.Feedback>
											Ok
										</Form.Control.Feedback>
										<Form.Control.Feedback type="invalid">
											{errors.message}
										</Form.Control.Feedback>
									</Form.Group>
								</Form.Row>

								{/* Button */}
								<Form.Row className="d-flex justify-content-center">
									<Button
										type="submit"
										variant="primary"
										data-cy="contactMsgBtn"
										className="primary-color-shadow px-5"
									>
										Відправити
									</Button>
								</Form.Row>
							</Form>
						)}
					</Formik>
				</Col>
			</Row>
		</Container>
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

ContactForm.propTypes = {
	setNotification: PropTypes.func.isRequired
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContactForm)
