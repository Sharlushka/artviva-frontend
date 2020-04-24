import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Collapse, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteBranch } from '../../reducers/branchesReducer'
import branchService from '../../services/branches'
import { setNotification } from '../../reducers/notificationReducer'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import ButtonComponent from '../common/Button'
import EntityDeleteModal from '../common/EntityDeleteModal'
import Toggler from '../common/Toggler'
import EditBranchForm from '../forms/EditBranchForm'

const Branch = ({ user, branch, deleteBranch }) => {
	const editBranchFormRef = useRef(null)
	const [open, setOpen] = useState(false)
	const [modalShow, setModalShow] = useState(false)

	const openDeleteModal = () => {
		setModalShow(true)
	}

	// set auth token
	useEffect(() => {
		branchService.setToken(user.token)
	}, [user])

	const handleDelete = id => {
		deleteBranch(id)
			.then(() => {
				setNotification({
					message: 'Філія успішно видалена.',
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
				aria-controls="branch-collapse"
				aria-expanded={open}
				variant="link"
				className="d-flex justify-content-between align-items-center"
			>
				<span>
					{branch.town}
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
							<p>Назва: {branch.name}</p>
							<p>Місто: {branch.town}</p>
							<p>Тел: {branch.phone}</p>
							<p>Адреса: {branch.address}</p>
							<p>Інфо: {branch.info}</p>
						</Col>
					</Row>

					<Row className="d-flex justify-content-center">
						<Col md={8} lg={6} xl={4}>
							<Toggler
								buttonLabel="Редагувати філію"
								data-cy="edit-branch-btn"
								ref={editBranchFormRef}
							>
								<EditBranchForm branch={branch}/>
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
			<EntityDeleteModal
				subject="філію"
				subjectid={branch.id}
				valuetoconfirm={branch.name}
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
	deleteBranch
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Branch)
