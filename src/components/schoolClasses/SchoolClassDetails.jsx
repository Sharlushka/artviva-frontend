import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import schoolClassesService from '../../services/schoolClasses'
import { setNotification } from '../../reducers/notificationReducer'

import { Container, Row, Col } from 'react-bootstrap'
import LoadingIndicator from '../common/LoadingIndicator'

const SchoolClassDetails = ({ user, match, setNotification }) => {

	const [schoolClassDetails, setSchoolClassDetails] = useState(null)

	useEffect(() => {
		if (user) {
			schoolClassesService.setToken(user.token)
			schoolClassesService.getById(match.params.id)
				.then((data) => {
					setSchoolClassDetails(data)
				})
				.catch(error => {
					const notification = JSON.parse(error.request.responseText)
					setNotification({
						message: notification.error,
						variant: 'danger'
					}, 5)
				})
		}
	// eslint-disable-next-line
	}, [user])

	return (
		<>
			{schoolClassDetails
				? <Container>
					<h3>Деталі класу</h3>
					<Row>
						<Col>
							<p>{schoolClassDetails.title}</p>
							<p>{schoolClassDetails.teacher.name}</p>
							<p>{schoolClassDetails.specialty.title}</p>
							<ol>
								{schoolClassDetails.pupils.map(pupil => (
									<li key={pupil.id}>{pupil.name}</li>
								))}
							</ol>
						</Col>
					</Row>
				</Container>
				: <LoadingIndicator animation="border" variant="primary" />
			}
		</>
	)
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	setNotification
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SchoolClassDetails)
