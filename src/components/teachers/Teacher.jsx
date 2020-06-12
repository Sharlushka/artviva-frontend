import React, { useState, useEffect, useRef, Suspense } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { deleteTeacher } from '../../reducers/teachersReducer'
import teachersService from '../../services/teachers'

import { Container, Row, Collapse, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import TeacherForm from '../forms/TeacherForm'
import LoadingIndicator from '../common/LoadingIndicator'
import EntityControlButtons from '../common/EntityControlButtons'

const LazyEntityDeleteModal = React.lazy(() => import('../common/EntityDeleteModal'))
const LazyEntityEditModal = React.lazy(() => import('../common/EntityEditModal'))

const Teacher = ({ user, teacher, deleteTeacher, setNotification }) => {
	const [open, setOpen] = useState(false)
	const [deleteModalShow, setDeleteModalShow] = useState(false)
	const [editModalShow, setEditModalShow] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const unmounted = useRef(false)

	// set auth token
	useEffect(() => {
		teachersService.setToken(user.token)
		return () => { unmounted.current = true }
	}, [user])

	const handleDelete = id => {
		setIsDeleting(true)
		deleteTeacher(id)
			.then(() => {
				setNotification({
					message: 'Вчітель успішно видален.',
					variant: 'success'
				}, 5)
			})
			.catch(error => {
				const { message } = { ...error.response.data }
				setNotification({
					message,
					variant: 'danger'
				}, 5)
				setIsDeleting(false)
				setDeleteModalShow(false)
			})
			.finally(() => {
				if (!unmounted) setIsDeleting(false)
			})
	}

	return (
		<>
			<Button
				block
				onClick={() => setOpen(!open)}
				aria-controls="teacher-collapse"
				aria-expanded={open}
				variant="link"
				className="d-flex justify-content-between align-items-center"
			>
				<span>
					{teacher.name}
				</span>
				{ open
					? <FontAwesomeIcon icon={faAngleUp} />
					: <FontAwesomeIcon icon={faAngleDown} />
				}
			</Button>
			<Collapse in={open}>
				<Container fluid className="text-left">
					<Row>
						<EntityControlButtons
							route={`/school/teachers/${teacher.id}`}
							openEditModal={() => setEditModalShow(true)}
							openDeleteModal={() => setDeleteModalShow(true)}
						/>
					</Row>
				</Container>
			</Collapse>

			{/* Teacher edit and delete modal */}
			<Suspense fallback={
				<LoadingIndicator
					animation="border"
					variant="primary"
					size="md"
				/>}>
				<LazyEntityEditModal
					subject="вчітеля"
					subjectid={teacher.id}
					show={editModalShow}
					onHide={() => setEditModalShow(false)}
				>
					<TeacherForm
						closeModal={() => setEditModalShow(false)}
						teacher={teacher}
						mode="edit" />
				</LazyEntityEditModal>
				<LazyEntityDeleteModal
					subject="вчітеля"
					subjectid={teacher.id}
					valuetoconfirm={teacher.name}
					show={deleteModalShow}
					handleDelete={handleDelete}
					loadingState={isDeleting}
					onHide={() => setDeleteModalShow(false)}
				/>
			</Suspense>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	setNotification,
	deleteTeacher
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Teacher)
