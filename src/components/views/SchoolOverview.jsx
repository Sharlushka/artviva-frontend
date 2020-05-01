import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'

const SchoolOverview = ({ user }) => {

	return (
		<Container className='mt-5'>
			<h2 className="pt-4 custom-font">Загальна інформація про школу</h2>
			<Row className="d-flex justify-content-center">
				<Col md={8}>
					<p className="text-muted">
						Списки вчителів, учнів та філій, виплати та інша інформація..
					</p>
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

export default connect(
	mapStateToProps
)(SchoolOverview)
