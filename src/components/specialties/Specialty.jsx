import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Collapse, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteSpecialty } from '../../reducers/specialtiesReducer'
import specialtyService from '../../services/specialties'
import { setNotification } from '../../reducers/notificationReducer'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import ButtonComponent from '../common/Button'
import SpecialtyDeleteModal from './SpecialtyDeleteModal'
import Toggler from '../common/Toggler'
import EditSpecialtyForm from '../forms/EditSpecialtyForm'

const Specialty = ({ user, specialty, deleteSpecialty }) => {
	const editSpecialtyFormRef = useRef(null)
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
								dataCy="editBranchBtn"
								ref={editSpecialtyFormRef}
							>
								<EditSpecialtyForm specialty={specialty}/>
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
			{/* Branch delete modal */}
			<SpecialtyDeleteModal
				specialty={specialty}
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
