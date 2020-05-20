import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import teachersService from '../../services/teachers'
import { setNotification } from '../../reducers/notificationReducer'
import { toHumanReadable } from '../../utils/datesAndTime'

import { Container, Row, Col } from 'react-bootstrap'
import LoadingIndicator from '../common/LoadingIndicator'

const TeacherDetails = ({ user, match, setNotification }) => {

	const [teacherDetails, setTeacherDetails] = useState(null)

	useEffect(() => {
		if (user) {
			teachersService.setToken(user.token)
			teachersService.getById(match.params.id)
				.then((data) => {
					setTeacherDetails(data)
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
			{teacherDetails
				? <Container>
					<h4>Детальна інформація про вчітеля</h4>
					<Row className="pt-3">
						<Col>
							<p><strong>Ім&apos;я:</strong> {teacherDetails.name}</p>
							<strong>Фах:</strong>
							<ol>
								{teacherDetails.specialties.map(specialty => (
									<li key={specialty.id}>{specialty.title}</li>
								))}
							</ol>
							<strong>Платежі:</strong>
							<ol>
								{teacherDetails.payments.map(payment => (
									<li key={payment.id} className="py-1">
										<em>{toHumanReadable('uk-ua', payment.create_date)}</em>
										<br />
										<span className="text-muted">{payment.description}</span>
									</li>
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
)(TeacherDetails)
