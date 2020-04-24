import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initializeTeachers } from '../../reducers/teachersReducer'
import { ListGroup } from 'react-bootstrap'
import Teacher from './Teacher'

const TeachersList = ({ teachers, ...props }) => {

	useEffect(() => {
		props.initializeTeachers()
	// eslint-disable-next-line
	}, [])

	return (
		<>
			<h5 className="py-2">Вчітелі</h5>
			{teachers
				? <ListGroup>
					{teachers.map(teacher =>
						<ListGroup.Item
							className="px-0 py-1"
							key={teacher.id}
						>
							<Teacher teacher={teacher} />
						</ListGroup.Item>
					)}
				</ListGroup>
				: <h4>Завантаження...</h4>
			}
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		teachers: state.teachers
	}
}

const mapDispatchToProps = {
	setNotification,
	initializeTeachers
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TeachersList)
