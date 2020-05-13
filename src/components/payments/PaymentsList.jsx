import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initialisePayments } from '../../reducers/paymentsReducer'
import paymentService from '../../services/payment'

import { Container, ListGroup } from 'react-bootstrap'

import LoadingIndicator from '../common/LoadingIndicator'
import Payment from './Payment'

const PaymentsList = ({ user, payments, initialisePayments, setNotification }) => {

	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (user) {
			// set token
			paymentService.setToken(user.token)
			// get a list of payments
			initialisePayments()
				.catch(error => {
					setNotification({
						message: `Щось пішло не так, спробуйте пізніше:
							${error.status} ${error.statusText}`,
						variant: 'danger'
					}, 5)
				})
				.finally(() => setIsLoading(false))
		}
	}, [user, setNotification, initialisePayments])

	return (
		<Container className='text-center'>
			{isLoading
				? <LoadingIndicator
					animation="border"
					variant="primary"
				/>
				: <>
					<ListGroup>
						{payments.map(payment =>
							<ListGroup.Item
								className="px-0 py-1"
								key={payment.id}
							>
								<Payment payment={payment}/>
							</ListGroup.Item>
						)}
					</ListGroup>
				</>
			}
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		payments: state.payments
	}
}

const mapDispatchToProps = {
	setNotification,
	initialisePayments
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PaymentsList)
