import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useField } from '../../hooks'
import { setNotification } from '../../reducers/notificationReducer'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const ContactForm = ({ setNotification }) => {
	const [validated, setValidated] = useState(false)

	const { reset : resetName, ...name } = useField('name')
	const { reset : resetPhone, ...phone } = useField('phone')
	const { reset : resetMessage, ...message } = useField('message')

	const handleContactMessage = event => {
		/*
		event.preventDefault()
		console.log('Sending message')
		setNotification({
			message: `Сайт працює в тестовому режимі,
				повідомлення наразі не надсилаються, але дякуємо
				за участь у тестуванні цієї форми! )`,
			variant: 'success'
		}, 5)
		resetName()
		resetPhone()
		resetMessage()*/

		const form = event.currentTarget

		if (form.checkValidity() === false) {
			event.preventDefault()
			event.stopPropagation()
			setNotification({
				message: 'Будь ласка, заповніть обов\'язкові поля.',
				variant: 'danger'
			}, 5)
		} else {
			console.log('Sending message')
			event.preventDefault()
			event.stopPropagation()
			setNotification({
				message: `Сайт працює в тестовому режимі,
					повідомлення наразі не надсилаються, але дякуємо
					за участь у тестуванні сайту! )`,
				variant: 'success'
			}, 5)
			resetName()
			resetPhone()
			resetMessage()
		}

		setValidated(true)
	}

	return (
		<Container className="py-4">
			<Row className="d-flex justify-content-center">
				<Col xs={12} sm={10} md={6}>
					<h3 className="text-center custom-font py-4">
						Зворотній зв&apos;язок
					</h3>
					<Form noValidate validated={validated} data-cy="contactForm" onSubmit={handleContactMessage}>
						<Form.Group>
							<Form.Label>
								Ваше ім&apos;я
								<span className="required-text">*</span>
							</Form.Label>
							<Form.Control
								name="name"
								data-cy="nameInput"
								required
								{...name}
							/>
							<Form.Label>
								Ваш номер телефону
								<span className="required-text">*</span>
							</Form.Label>
							<Form.Control
								type='tel'
								name="phone"
								data-cy="phoneInput"
								required
								placeholder='(___) ___-__-__'
								{...phone}
							/>
							<Form.Label>
								Повідомлення
								<span className="required-text">*</span>
							</Form.Label>
							<Form.Control
								as="textarea" rows="3"
								name="message"
								data-cy="messageInput"
								required
								{...message}
							/>
							<Row className="p-3 d-flex justify-content-center align-items-center">
								<Button
									type="submit"
									variant="primary"
									data-cy="contactMsgBtn"
									className="primary-color-shadow"
								>
									Відправити
								</Button>
							</Row>
						</Form.Group>
					</Form>
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ContactForm)
