import React, { useEffect, useState, Suspense } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initializeTeachers } from '../../reducers/teachersReducer'
import { initializeSpecialties } from '../../reducers/specialtiesReducer'

import { Link } from 'react-router-dom'
import { Container, ListGroup, Row, Col } from 'react-bootstrap'
import CollapseForm from '../common/CollapseForm'
import Teacher from './Teacher'
import LoadingIndicator from '../common/LoadingIndicator'

const LazyTeacherForm = React.lazy(() => import('../forms/TeacherForm'))

const TeachersList = ({ teachers, setNotification, initializeTeachers, initializeSpecialties }) => {

	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// wtf is this?!
		initializeSpecialties()
			.catch(error => {
				setNotification({
					message: `Щось пішло не так, спробуйте пізніше:
						${error.status} ${error.statusText}`,
					variant: 'danger'
				}, 5)
			})
		initializeTeachers()
			.catch(error => {
				setNotification({
					message: `Щось пішло не так, спробуйте пізніше:
						${error.status} ${error.statusText}`,
					variant: 'danger'
				}, 5)
			})
			.finally(() => setIsLoading(false))
	// eslint-disable-next-line
	}, [])

	return (
		<Container>
			<Row className="d-flex justify-content-center">
				<Col md={10} xl={8}>
					{isLoading
						? <LoadingIndicator
							animation="border"
							variant="primary"
						/>
						: <>
							<p className="py-3 text-muted">
								Щоб додати нового викладача, спочатку потрібно створити його
								<Link to="/school/specialties"> спеціальність</Link>,
								якщо ви цього ще не зробили.
							</p>

							<CollapseForm
								title="Додати нового вчітеля"
								ariaControls="school-class-add-form-collapse"
							>
								<Suspense
									fallback={
										<LoadingIndicator
											animation="border"
											variant="primary"
										/>}>
									<LazyTeacherForm mode="create" />
								</Suspense>
							</CollapseForm>

							<p className="py-3 text-muted">
								<em>Список усіх вчителів школи.</em>
							</p>
							<ListGroup>
								{teachers.map(teacher =>
									<ListGroup.Item
										className="px-0 py-1"
										key={teacher.id}
									>
										<Teacher teacher={teacher} />
									</ListGroup.Item>
								)}
							</ListGroup>
						</>
					}
				</Col>
			</Row>
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		teachers: state.teachers,
		specialties: state.specialties
	}
}

const mapDispatchToProps = {
	setNotification,
	initializeTeachers,
	initializeSpecialties
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TeachersList)
