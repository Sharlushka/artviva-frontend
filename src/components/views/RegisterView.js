import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import RegisterForm from '../forms/RegisterForm'

const RegisterView = () => {

	const [regComplete, setRegComplete] = useState(false)
	const completeRegistration = () => setRegComplete(true)

	return (
		<Container className="pt-4">
			<Row className="pt-4 d-flex justify-content-center align-items-center">
				<Col xs={12} sm={10} md={8} className="text-center">
					{ regComplete
						? <h5 className="pt-4">
							Щоб активувати обліковий запис користувача,
							дотримуйтесь інструкцій у електронному
							повідомленні, надісланому на вашу електронну адресу.
						</h5>
						: <RegisterForm completeRegistration={completeRegistration} />
					}
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
