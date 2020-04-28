import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Collapse, Button, ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteTeacher } from '../../reducers/teachersReducer'
import teachersService from '../../services/teachers'
import { setNotification } from '../../reducers/notificationReducer'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import ButtonComponent from '../common/Button'
import EntityDeleteModal from '../common/EntityDeleteModal'
import Toggler from '../common/Toggler'
import EditTeacherForm from '../forms/EditTeacherForm'

const Teacher = ({ user, teacher, deleteTeacher }) => {
	const editTeacherFormRef = useRef(null)
	const [open, setOpen] = useState(false)
	const [modalShow, setModalShow] = useState(false)

	const openDeleteModal = () => {
		setModalShow(true)
	}

	// set auth token
	useEffect(() => {
		teachersService.setToken(user.token)
	}, [user])

	const handleDelete = id => {
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
							<p>Им&apos;я: {teacher.name}</p>
						</Col>
						<Col xs={12}>
							<ListGroup>Cпеціальність:
								{teacher.specialties.map(specialty =>
									<ListGroup.Item key={specialty.id}>
										{specialty.title}
									</ListGroup.Item>
								)}
							</ListGroup>
						</Col>
					</Row>

					<Row className="d-flex justify-content-center">
						<Col md={8} lg={6} xl={4}>
							<Toggler
								buttonLabel="Редагувати данні вчітеля"
								data-cy="edit-teacher-btn"
								ref={editTeacherFormRef}
							>
								<EditTeacherForm teacher={teacher}/>
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
			{/* Teacher delete modal */}
			<EntityDeleteModal
				subject="вчітеля"
				subjectid={teacher.id}
				valuetoconfirm={teacher.name}
				show={modalShow}
				handleDelete={handleDelete}
				onHide={() => setModalShow(false)}
			/>
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
