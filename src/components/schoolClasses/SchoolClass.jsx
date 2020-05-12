import React, { useState, useEffect, useRef, Suspense } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { deleteSchoolClass } from '../../reducers/schoolClassesReducer'
import schoolClassesService from '../../services/schoolClasses'

import { Container, Row, Col, Collapse, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import ButtonComponent from '../common/Button'
import Toggler from '../common/Toggler'

const LazyEntityDeleteModal = React.lazy(() => import('../common/EntityDeleteModal'))
const LazySchoolClassForm = React.lazy(() => import('../forms/SchoolClassForm'))

const SchoolClass = ({ user, schoolClass, deleteSchoolClass }) => {
	const editSchoolClassFormRef = useRef(null)
	const [open, setOpen] = useState(false)
	const [modalShow, setModalShow] = useState(false)

	const openDeleteModal = () => {
		setModalShow(true)
	}

	// set auth token
	useEffect(() => {
		schoolClassesService.setToken(user.token)
	}, [user])

	const handleDelete = id => {
		deleteSchoolClass(id)
			.then(() => {
				setNotification({
					message: 'Клас успішно видален.',
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
	}

	return (
		<>
			<Button
				block
				onClick={() => setOpen(!open)}
				aria-controls="school-class-collapse"
				aria-expanded={open}
				variant="link"
				className="d-flex justify-content-between align-items-center"
			>
				<span>
					{schoolClass.title}
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
							<p>Назва класу: <strong>{schoolClass.title}</strong></p>
							<p>Фах: <strong>{schoolClass.specialty.title}</strong></p>
							<p>Опіс: <strong>{schoolClass.info}</strong></p>
							<p>Вчітель: <strong>{schoolClass.teacher.name}</strong></p>
							<p>Учні: <strong>{schoolClass.pupils.map(pupil => `${pupil.name} `)}</strong></p>
						</Col>
					</Row>

					<Row className="d-flex justify-content-center">
						<Col md={8} lg={6} xl={4}>
							<Toggler
								buttonLabel="Редагувати клас"
								data-cy="edit-teacher-btn"
								ref={editSchoolClassFormRef}
							>
								<Suspense fallback={<div>Loading modal..</div>}>
									<LazySchoolClassForm schoolClass={schoolClass} mode="edit" />
								</Suspense>
							</Toggler>
							<ButtonComponent
								block
								label="Видалити"
								variant="danger"
								type="button"
								handleClick={() => openDeleteModal()}
							/>
						</Col>
					</Row>
				</Container>
			</Collapse>
			{/* School class delete modal */}
			<Suspense fallback={<div>Loading modal..</div>}>
				<LazyEntityDeleteModal
					subject="клас"
					subjectid={schoolClass.id}
					valuetoconfirm={schoolClass.title}
					show={modalShow}
					handleDelete={handleDelete}
					onHide={() => setModalShow(false)}
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
	deleteSchoolClass
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SchoolClass)
