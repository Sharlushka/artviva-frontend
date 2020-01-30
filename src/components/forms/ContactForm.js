import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../../hooks'
import { setNotification } from '../../reducers/notificationReducer'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const ContactForm = () => {

	const { reset : resetName, ...name } = useField('name')
	const { reset : resetPhone, ...phone } = useField('phone')
	const { reset : resetMessage, ...message } = useField('message')


	const handleContactMessage = event => {
		event.preventDefault()
		console.log('Sending message')
		resetName()
		resetPhone()
		resetMessage()
	}

	return (
		<Container className="py-4">
			<Row className="d-flex justify-content-center">
				<Col xs={12} sm={10} md={6}>
					<h3 className="text-center custom-font py-4">
						Зворотній зв&apos;язок
					</h3>
					<Form data-cy="contactForm" onSubmit={handleContactMessage}>
						<Form.Group>
							<Form.Label>
								Ваше ім&apos;я
								<span className="required-text">*</span>
							</Form.Label>
							<Form.Control
								name="name"
								data-cy="nameInput"
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
								{...message}
							/>
							<Row className="p-3 d-flex justify-content-center align-items-center">
								<Button
									type="submit"
									variant="primary"
									data-cy="contactMsgBtn"
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
