import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'


const TeachersView = () => {
	return (
		<Container className="text-center">
			<h1 className="custom-font py-3">Наші вчітели</h1>
			<Row className="p-0 d-flex justify-content-center">
				<Col xs={12} md={6} className="p-0">
					List of teachers here.
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
)(TeachersView)
