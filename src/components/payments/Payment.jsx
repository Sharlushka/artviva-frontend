import React from 'react'
import { toHumanReadable } from '../../utils/datesAndTime'

import { Container, Row, Col } from 'react-bootstrap'

const Payment = ({ payment }) => {

	return (
		<Container className="border1 border-success">
			<Row className="d-flex align-items-center">
				<Col xs={4}>
					<small>
						{toHumanReadable('uk-ua', payment.create_date)}
					</small>
				</Col>
				<Col xs={4}>
					<em className="text-success">{payment.status}</em>
				</Col>
				<Col xs={4}>
					<strong>{payment.amount} грн</strong>
				</Col>
				<Col xs={12} className="pt-3">
					<p className="text-left">
						{payment.description}
					</p>
				</Col>
			</Row>
		</Container>
	)
}


export default Payment
