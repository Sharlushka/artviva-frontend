import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Collapse, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteBranch } from '../../reducers/branchesReducer'
import branchService from '../../services/branches'
import { setNotification } from '../../reducers/notificationReducer'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import ButtonComponent from '../common/Button'
import BranchDeleteModal from './BranchDeleteModal'

const Branch = ({ user, branch, deleteBranch }) => {

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
		console.log('Deleting branch with id', id)
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
				aria-controls="department-collapse"
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
				<Container className="text-left">
					<Row>
						<Col>
							<p>Назва: {branch.name}</p>
							<p>Місто: {branch.town}</p>
							<p>Тел: {branch.phone}</p>
							<p>Адреса: {branch.address}</p>
							<p>Інфо: {branch.info}</p>
						</Col>
					</Row>
					<Row>
						<Col>
							<ButtonComponent
								label="Редагуваті"
								variant="primary"
								type="button"
							/>
						</Col>
						<Col className="d-flex justify-content-end">
							<ButtonComponent
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
			<BranchDeleteModal
				branch={branch}
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
