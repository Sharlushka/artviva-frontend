import React from 'react'
import { connect } from 'react-redux'
import LoginForm from '../forms/LoginForm'
import { Container, Row, Col, Image } from 'react-bootstrap'

const LoginView = () => {
	return (
		<Container>
			<Row className="d-flex justify-content-center">
				<Col xs={12} md={4} className="text-center">
					<span className="image-align-helper"></span>
					<Image
						src="img/schoolLogo-transparent.png"
						alt="ArtViva logo"
						className="responsive-image-fraction pt-4"
					/>
				</Col>
				<Col xs={12} md={8}>
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
