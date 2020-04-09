import React from 'react'
import PaymentForm from '../forms/PaymentForm'
import { Container, Row, Col } from 'react-bootstrap'

const PaymentView = () => {
	return (
		<Container className="pt-4">
			<Row className="pt-4 d-flex justify-content-center">
				<Col xs={12} sm={10} md={8} lg={7}>
					<h1 className="text-center custom-font py-4">
						Оплата навчання
					</h1>
					<h6 className="text-center text-muted">
						тестовий режим
					</h6>
					<PaymentForm />
				</Col>
			</Row>
		</Container>
	)
}
export default PaymentView
