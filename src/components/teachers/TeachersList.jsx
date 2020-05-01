import React, { useEffect, useState, useRef, Suspense } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initializeTeachers } from '../../reducers/teachersReducer'
import { initializeSpecialties } from '../../reducers/specialtiesReducer'

import { Container, ListGroup } from 'react-bootstrap'
import Teacher from './Teacher'
import LoadingIndicator from '../common/LoadingIndicator'
import Toggler from '../common/Toggler'

const LazyTeacherForm = React.lazy(() => import('../forms/TeacherForm'))

const TeachersList = ({ teachers, setNotification, initializeTeachers, initializeSpecialties }) => {

	const teacherFormRef = useRef(null)
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
		<Container className="mt-5 text-center">
			<h4 className="pt-4 custom-font">Вчітелі</h4>
			{isLoading
				? <LoadingIndicator
					animation="border"
					variant="primary"
				/>
				: <>
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
					<Toggler
						buttonLabel="Додати нового вчітеля"
						data-cy="add-new-branch-btn"
						ref={teacherFormRef}
					>
						<Suspense fallback={<div>Loading...</div>}>
							<LazyTeacherForm mode="create" />
						</Suspense>
					</Toggler>
				</>
			}
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
