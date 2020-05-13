import React from 'react'
import { connect } from 'react-redux'

import { Container } from 'react-bootstrap'
import PaymentsList from '../payments/PaymentsList'

const Payments = ({ user }) => {

	return (
		<Container className="mt-5 text-center">
			<h4 className="pt-4 custom-font">Платежі</h4>
			<PaymentsList />
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps
)(Payments)
