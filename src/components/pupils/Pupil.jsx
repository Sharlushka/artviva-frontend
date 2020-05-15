import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { deletePupil } from '../../reducers/pupilsReducer'
import pupilsService from '../../services/pupils'
import { setNotification } from '../../reducers/notificationReducer'

import { Link } from 'react-router-dom'
import { Container, Row, Col, Collapse, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import ButtonComponent from '../common/Button'
import EntityDeleteModal from '../common/EntityDeleteModal'
import Toggler from '../common/Toggler'
import PupilForm from '../forms/PupilForm'

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
							<p>
								<em className="text-muted">Им&apos;я:</em> {pupil.name}
							</p>
							<p>
								<em className="text-muted">Додаткова інформація:</em> {pupil.info}
							</p>
							<div>
								<em className="text-muted">Класи:</em>
								<ol>
									{pupil.schoolClasses.map(schoolClass =>
										<li key={schoolClass.id}>
											<Link to={`classes/${schoolClass.id}`}>
												{schoolClass.title}
											</Link>
										</li>
									)}
								</ol>
							</div>
						</Col>
					</Row>

					<Row className="d-flex justify-content-center">
						<Col md={8} lg={6} xl={4}>
							<Toggler
								buttonLabel="Редагувати данні учня"
								dataCy="edit-teacher-btn"
								ref={editPupilFormRef}
							>
								<PupilForm pupil={pupil} mode='edit' />
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
