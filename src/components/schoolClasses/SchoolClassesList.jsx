import React from 'react'
import { connect } from 'react-redux'

import { Container } from 'react-bootstrap'

const SchoolClassesList = ({ user }) => {

	return (
		<Container className="mt-5 text-center">
			<h4 className="pt-4 custom-font">Класи</h4>
			<p className="text-muted">Вже скоро</p>
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
)(SchoolClassesList)
