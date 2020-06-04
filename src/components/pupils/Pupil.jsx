import React, { useState, useEffect, useRef, Suspense } from 'react'
import { connect } from 'react-redux'
import { deletePupil } from '../../reducers/pupilsReducer'
import pupilsService from '../../services/pupils'
import { setNotification } from '../../reducers/notificationReducer'
import moment from 'moment'

import { Link } from 'react-router-dom'
import { Container, Row, Col, Collapse, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

import LoadingIndicator from '../common/LoadingIndicator'
import PupilForm from '../forms/PupilForm'
import EntityControlButtons from '../common/EntityControlButtons'
import ListItem from './ListItem'

const LazyEntityDeleteModal = React.lazy(() => import('../common/EntityDeleteModal'))
const LazyEntityEditModal = React.lazy(() => import('../common/EntityEditModal'))

const Pupil = ({ user, pupil, deletePupil }) => {

	const [open, setOpen] = useState(false)
	const [deleteModalShow, setDeleteModalShow] = useState(false)
	const [editModalShow, setEditModalShow] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)
	const unmounted = useRef(false)

	// set auth token
	useEffect(() => {
		pupilsService.setToken(user.token)
		return () => { unmounted.current = true }
	}, [user])

	const handleDelete = id => {
		setIsDeleting(true)
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
			.finally(() => {
				if (!unmounted) setIsDeleting(false)
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
				<span className="text-left">
					{pupil.name}: {pupil.specialty.title} {pupil.artSchoolClass ? `${pupil.artSchoolClass} клас` : null}
				</span>
				{ open
					? <FontAwesomeIcon icon={faAngleUp} />
					: <FontAwesomeIcon icon={faAngleDown} />
				}
			</Button>
			<Collapse in={open}>
				<Container fluid className="text-left borde1r border-primary">
					<Row>
						<Col>
							<ul style={{ paddingLeft: '0rem', listStyle: 'none' }}>
								<ListItem
									label="Им'я контактної особі: "
									data={pupil.applicantName}
								/>
								<li>
									<span className="text-muted">
										Її email: </span>
									<a href={`mailto:${pupil.contactEmail}`}>{pupil.contactEmail}</a>
								</li>
								<ListItem
									label="Домашня адреса: "
									data={pupil.homeAddress}
								/>

								<ListItem
									label="Загально освітня школа: "
									data={`${pupil.mainSchool} ${pupil.mainSchoolClass} клас`}
								/>

								<ListItem
									label="Стать: "
									data={pupil.gender}
								/>

								<ListItem
									label="Возраст: "
									data={moment(pupil.dateOfBirth).fromNow().split(' ')[0]}
								/>

								<ListItem
									label="День народження: "
									// data={moment(pupil.dateOfBirth).format('YYYY-MM-DD')}
									data={moment(pupil.dateOfBirth).format('Do MMM YYYY')}
								/>

								<ListItem
									label="Ім'я батька, тел. та місто роботи: "
									data={`${pupil.fathersName}. ${pupil.fathersPhone} ${pupil.fathersEmploymentInfo}`}
								/>

								<ListItem
									label="Ім'я матері, тел. та місто роботи: "
									data={`${pupil.mothersName}. ${pupil.mothersPhone} ${pupil.mothersEmploymentInfo}`}
								/>

								<ListItem
									label="Дата подяння заяві: "
									data={moment(pupil.createdAt).format('LL')}
								/>
							</ul>

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
	deletePupil
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Pupil)
