import React from 'react'
import { connect } from 'react-redux'
import PassResetForm from '../forms/PassResetForm'
import { Container, Row, Col } from 'react-bootstrap'

const PassResetView = ({ match }) => {
	return (
		<Container className="pt-4">
			<Row className="pt-4">
				<Col xs={12}>
					<h1 className="text-center custom-font py-4">
						Введіть новий пароль
					</h1>
					<PassResetForm
						passResetToken={match.params.uuid}
						email={match.params.email}
					/>
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
)(PassResetView)
