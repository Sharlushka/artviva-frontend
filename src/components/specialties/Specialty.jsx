import React, { useState, useEffect, Suspense } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { deleteSpecialty } from '../../reducers/specialtiesReducer'
import specialtyService from '../../services/specialties'

import { Container, Row, Col, Collapse, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import LoadingIndicator from '../common/LoadingIndicator'
import SpecialtyForm from '../forms/SpecialtyForm'
import EntityControlButtons from '../common/EntityControlButtons'

const LazyEntityDeleteModal = React.lazy(() => import('../common/EntityDeleteModal'))
const LazyEntityEditModal = React.lazy(() => import('../common/EntityEditModal'))

const Specialty = ({ user, specialty, deleteSpecialty }) => {

	const [open, setOpen] = useState(false)
	const [deleteModalShow, setDeleteModalShow] = useState(false)
	const [editModalShow, setEditModalShow] = useState(false)

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

					<Row>
						<EntityControlButtons
							openEditModal={() => setEditModalShow(true)}
							openDeleteModal={() => setDeleteModalShow(true)}
						/>
					</Row>
				</Container>
			</Collapse>

			{/* Specialty edit and delete modals */}
			<Suspense fallback={
				<LoadingIndicator
					animation="border"
					variant="primary"
					size="md"
				/>}>
				<LazyEntityEditModal
					subject="спеціальність"
					subjectid={specialty.id}
					show={editModalShow}
					onHide={() => setEditModalShow(false)}
				>
					<SpecialtyForm
						closeModal={() => setEditModalShow(false)}
						specialty={specialty}
						mode="edit"
					/>
				</LazyEntityEditModal>
				<LazyEntityDeleteModal
					subject="спеціальність"
					subjectid={specialty.id}
					valuetoconfirm={specialty.title}
					show={deleteModalShow}
					handleDelete={handleDelete}
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
	deleteSpecialty
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Specialty)
