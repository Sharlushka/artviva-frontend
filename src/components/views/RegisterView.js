import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import RegisterForm from '../forms/RegisterForm'

const RegisterView = () => {
	return (
		<Container>
			<Row className="d-flex justify-content-center align-items-center">
				<Col xs={12} sm={10} md={8} className="text-center">
					<RegisterForm />
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
