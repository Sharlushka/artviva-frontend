import React from 'react'
import { connect } from 'react-redux'
import RecoverForm from '../forms/RecoverForm'
import { Container, Row, Col } from 'react-bootstrap'

const RecoverView = () => {
	return (
		<Container className="pt-4">
			<Row className="pt-4">
				<Col xs={12}>
					<h1 className="text-center custom-font py-4">
						Відновлення паролю
					</h1>
					<RecoverForm />
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
)(RecoverView)
