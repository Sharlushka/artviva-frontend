import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Collapse, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deletePupil } from '../../reducers/pupilsReducer'
import pupilsService from '../../services/pupils'
import { setNotification } from '../../reducers/notificationReducer'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import ButtonComponent from '../common/Button'
import EntityDeleteModal from '../common/EntityDeleteModal'
import Toggler from '../common/Toggler'
import EditPupilForm from '../forms/EditPupilForm'

const Pupil = ({ user, pupil, deletePupil }) => {
	const editPupilFormRef = useRef(null)
	const [open, setOpen] = useState(false)
	const [modalShow, setModalShow] = useState(false)

	const openDeleteModal = () => {
		setModalShow(true)
	}

	// set auth token
	useEffect(() => {
		pupilsService.setToken(user.token)
	}, [user])

	const handleDelete = id => {
		deletePupil(id)
			.then(() => {
				setNotification({
					message: 'Учень успішно видален.',
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
				aria-controls="pupil-collapse"
				aria-expanded={open}
				variant="link"
				className="d-flex justify-content-between align-items-center"
			>
				<span>
					{pupil.name}
				</span>
				{ open
					? <FontAwesomeIcon icon={faAngleUp} />
					: <FontAwesomeIcon icon={faAngleDown} />
				}
			</Button>
			<Collapse in={open}>
				<Container fluid className="text-left">
					<Row>
						<Col>
							<p>Им&apos;я: {pupil.name}</p>
						</Col>
					</Row>

					<Row className="d-flex justify-content-center">
						<Col md={8} lg={6} xl={4}>
							<Toggler
								buttonLabel="Редагувати данні учня"
								dataCy="edit-teacher-btn"
								ref={editPupilFormRef}
							>
								<EditPupilForm pupil={pupil}/>
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
			{/* Pupil delete modal */}
			<EntityDeleteModal
				subject="учня"
				subjectid={pupil.id}
				valuetoconfirm={pupil.name}
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
	deletePupil
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Pupil)
