import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import schoolClassesService from '../../services/schoolClasses'
import { setNotification } from '../../reducers/notificationReducer'

import { Container, Row, Col } from 'react-bootstrap'
import LoadingIndicator from '../common/LoadingIndicator'

const SchoolClassDetails = ({ user, match, setNotification }) => {
	// console.log('School class details props:', match.params)
	// const id = '5eba998697b4c533dc21ab84'

	const [schoolClassDetails, setSchoolClassDetails] = useState(null)

	useEffect(() => {
		if (user) {
			schoolClassesService.setToken(user.token)
			schoolClassesService.getById(match.params.id)
				.then((data) => {
					console.log('data', data)
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

	/*
	useEffect(() => {
		user ? schoolClassesService.setToken(user.token)
		console.log('setting token', user.token)
		schoolClassesService.getById(id)
			.then((data) => {
				console.log('data', data)
			})
	}, [user])*/

	return (
		<>
			{schoolClassDetails
				? <Container className="mt-5 pt-5"> {/* This!!! */}
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
