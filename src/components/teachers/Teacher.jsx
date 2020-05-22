import React, { useState, useEffect, useRef, Suspense } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { deleteTeacher } from '../../reducers/teachersReducer'
import teachersService from '../../services/teachers'
import { toHumanReadable } from '../../utils/datesAndTime'

import { Container, Row, Col, Collapse, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import TeacherForm from '../forms/TeacherForm'
import LoadingIndicator from '../common/LoadingIndicator'
import EntityControlButtons from '../common/EntityControlButtons'

const LazyEntityDeleteModal = React.lazy(() => import('../common/EntityDeleteModal'))
const LazyEntityEditModal = React.lazy(() => import('../common/EntityEditModal'))

const Teacher = ({ user, teacher, deleteTeacher }) => {
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
				const notification = JSON.parse(error.request.responseText)
				setNotification({
					message: notification.error,
					variant: 'danger'
				}, 5)
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
						<Col xs={12}>
							<p>
								<em className="text-muted">Им&apos;я: </em>
								{teacher.name}
							</p>
						</Col>
						<Col xs={12}>
							<em className="text-muted">Cпеціальність:</em>
							<ol>
								{teacher.specialties.map(specialty =>
									<li key={specialty.id}>
										{specialty.title}
									</li>
								)}
							</ol>
						</Col>
						<Col>
							<em className="text-muted">Оплати:</em>
							<ol>
								{teacher.payments.map(payment =>
									<li key={payment.id}>
										<em className="text-muted">{toHumanReadable('uk-ua', payment.create_date)}</em>
										<br />
										{/*payment.description*/}
										<p>
											<span
												className="text-muted"
											>
												Учень:</span> {payment.paymentDescr.pupil}
											<br />
											<span
												className="text-muted"
											>
												Предмет:</span> {payment.paymentDescr.specialty}
											<br />
											<span className="text-muted">Місяці: </span>
											{payment.paymentDescr.months.map(month =>
												<span key={month}>{month}, </span>
											)}
										</p>
									</li>
								)}
							</ol>
						</Col>
					</Row>

					<Row>
						<EntityControlButtons
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
