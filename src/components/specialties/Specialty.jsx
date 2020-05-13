import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { deleteSpecialty } from '../../reducers/specialtiesReducer'
import specialtyService from '../../services/specialties'

import { Container, Row, Col, Collapse, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import ButtonComponent from '../common/Button'
import EntityDeleteModal from '../common/EntityDeleteModal'
import Toggler from '../common/Toggler'
import SpecialtyForm from '../forms/SpecialtyForm'

const Specialty = ({ user, specialty, deleteSpecialty }) => {
	const specialtyFormRef = useRef(null)
	const [open, setOpen] = useState(false)
	const [modalShow, setModalShow] = useState(false)

	const openDeleteModal = () => {
		setModalShow(true)
	}

	// set auth token
	useEffect(() => {
		specialtyService.setToken(user.token)
	}, [user])

	const handleDelete = id => {
		deleteSpecialty(id)
			.then(() => {
				setNotification({
					message: 'Спеціальність успішно видалена.',
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
				aria-controls="specialty-collapse"
				aria-expanded={open}
				variant="link"
				className="d-flex justify-content-between align-items-center"
			>
				<span>
					{specialty.title}
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
							<p>Назва: {specialty.title}</p>
							<p>Вартість: {specialty.cost} грн</p>
							<p>Інфо: {specialty.info}</p>
						</Col>
					</Row>

					<Row className="d-flex justify-content-center">
						<Col md={8} lg={6} xl={4}>
							<Toggler
								buttonLabel="Редагувати спеціальність"
								data-cy="edit-specialty-btn"
								ref={specialtyFormRef}
							>
								<SpecialtyForm specialty={specialty} mode="edit" />
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
			{/* Specialty delete modal */}
			<EntityDeleteModal
				subject="спеціальність"
				subjectid={specialty.id}
				valuetoconfirm={specialty.title}
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
	deleteSpecialty
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Specialty)
