import React from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { Container, Row, Col, Image } from 'react-bootstrap'

const LoginView = () => {
	const respStyle = {
		height:'auto',
		width:'50%'
	}

	return (
		<Container className="py-4">
			<Row className="d-flex justify-content-center align-items-center">
				<Col xs={12} sm={8} md={6} lg={4} className="py-4 text-center">
					<Image src="img/schoolLogo-transparent.png" style={respStyle}/>
				</Col>
				<Col xs={12} sm={8} md={6} lg={4}>
					<LoginForm />
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
)(LoginView)