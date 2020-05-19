import React, { useState, useEffect, Suspense } from 'react'
import { connect } from 'react-redux'
import { deletePupil } from '../../reducers/pupilsReducer'
import pupilsService from '../../services/pupils'
import { setNotification } from '../../reducers/notificationReducer'

import { Link } from 'react-router-dom'
import { Container, Row, Col, Collapse, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
// import BtnWithIcon from '../common/BtnWithIcon'
import LoadingIndicator from '../common/LoadingIndicator'
import PupilForm from '../forms/PupilForm'
import EntityControlButtons from '../common/EntityControlButtons'

const LazyEntityDeleteModal = React.lazy(() => import('../common/EntityDeleteModal'))
const LazyEntityEditModal = React.lazy(() => import('../common/EntityEditModal'))

const Pupil = ({ user, pupil, deletePupil }) => {

	const [open, setOpen] = useState(false)
	const [deleteModalShow, setDeleteModalShow] = useState(false)
	const [editModalShow, setEditModalShow] = useState(false)

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

					<Row>
						<EntityControlButtons
							openEditModal={() => setEditModalShow(true)}
							openDeleteModal={() => setDeleteModalShow(true)}
						/>
					</Row>

					{/*<Row>
						<Col className="my-2 d-flex justify-content-end">
							<BtnWithIcon
								label="Редагувати"
								icon="edit"
								variant="outline-success"
								type="button"
								handleClick={() => setEditModalShow(true)}
							/>
							<BtnWithIcon
								label="Видалити"
								icon="trash"
								variant="outline-danger"
								type="button"
								handleClick={() => setDeleteModalShow(true)}
							/>
						</Col>
					</Row>*/}

				</Container>
			</Collapse>

			{/* Pupil edit and delete modal */}
			<Suspense fallback={
				<LoadingIndicator
					animation="border"
					variant="primary"
					size="md"
				/>}>
				<LazyEntityEditModal
					subject="учня"
					subjectid={pupil.id}
					show={editModalShow}
					onHide={() => setEditModalShow(false)}
				>
					<PupilForm
						closeModal={() => setEditModalShow(false)}
						pupil={pupil}
						mode="edit" />
				</LazyEntityEditModal>
				<LazyEntityDeleteModal
					subject="учня"
					subjectid={pupil.id}
					valuetoconfirm={pupil.name}
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
	deletePupil
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Pupil)
