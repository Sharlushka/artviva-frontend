import React from 'react'
import { connect } from 'react-redux'
import RecoverForm from '../forms/RecoverForm'
import { Container, Row, Col } from 'react-bootstrap'

const RecoverView = () => {
	return (
		<Container>
			<Row>
				<Col xs={12}>
					<h2 className="text-center custom-font py-2">
						Відновлення паролю
					</h2>
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
