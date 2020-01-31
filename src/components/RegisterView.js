import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'

const RegisterView = () => {
	return (
		<Container className="py-4">
			<Row className="d-flex justify-content-center align-items-center">
				<Col xs={12} sm={8} md={6} lg={4} className="py-4 text-center">
					Register view
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
)(RegisterView)
