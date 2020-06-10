import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import teachersService from '../../services/teachers'
import { setNotification } from '../../reducers/notificationReducer'
import moment from 'moment'
import 'moment-precise-range-plugin'

import { Container, Row, Col } from 'react-bootstrap'
import LoadingIndicator from '../common/LoadingIndicator'
import PaymentDescr from './PaymentDescr'

const TeacherDetails = ({ user, match, setNotification }) => {

	const [teacherDetails, setTeacherDetails] = useState(null)
	const [teacherExperience, setTeacherExperience] = useState('')
	// date now
	const today = moment(new Date())
	// start and end date of the current school year
	const startOfSchoolYear = moment([today.get('year') - 1, 8, 1])
	const endOfSchoolYear = moment([today.get('year'), 5, 1])
	const dates = {
		today,
		startOfSchoolYear,
		endOfSchoolYear
	}

	useEffect(() => {
		if (teacherDetails) {
			const { employmentDate, experienceToDate } = teacherDetails
			const { years, months, days } = experienceToDate
			const adjustedExperienceDate = moment(employmentDate).subtract({ years, months, days })
			const experience = moment.preciseDiff(adjustedExperienceDate, today)

			setTeacherExperience(experience)
		}
	}, [teacherDetails, today])

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
					<h4 className="text-muted">Детальна інформація про вчітеля</h4>
					<Row className="pt-3">
						<Col>
							<h5>{teacherDetails.name}</h5>
							<p>
								<span>Фах: </span>
								{teacherDetails.specialties.map(specialty => (
									<span key={specialty.id}>{specialty.title}</span>
								))}
							</p>
							<p>
								Працює з: {moment(teacherDetails.employmentDate).format('LL')}
							</p>
							<p>
								Стаж: {teacherExperience}
							</p>
							<p className="text-muted">
								Додатковій стаж: {teacherDetails.experienceToDate.years} років
								&nbsp;{teacherDetails.experienceToDate.months} місяців
								&nbsp;{teacherDetails.experienceToDate.days} днів
							</p>

							<h6 className="pt-4">Платежі:</h6>
							{teacherDetails.payments.map(payment => (
								<Container
									key={payment.id}
									className="payment-description-container border rounded my-2"
								>
									<PaymentDescr
										data={payment}
										dates={dates}
									/>
								</Container>
							))}
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
