import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Modal, Form, Button } from 'react-bootstrap'


const EntityDeleteModal = ({ handleDelete, valuetoconfirm, subject, subjectid, ...props }) => {
	const [valueChange, setValueChange] = useState('')
	const [deleteBtnState, setDeleteBtnState] = useState(true)

	const handleChange = event => (
		setValueChange(event.target.value)
	)

	useEffect(() => {
		if (valueChange === valuetoconfirm) {
			setDeleteBtnState(false)
		} else setDeleteBtnState(true)
	},[valueChange, valuetoconfirm])

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="entity-delete-modal"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="entity-delete-modal">
					Видалити {subject}?
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h4 className="text-muted">{valuetoconfirm}</h4>
				<p>
					Введіть <em><strong>{valuetoconfirm}</strong></em> нижче, щоб підтвердити видалення.
				</p>
				<Form.Group>
					<Form.Control
						size="sm"
						type="text"
						autoComplete="off"
						onChange={handleChange}
					/>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button
					onClick={props.onHide}
				>
					Скасуваті
				</Button>
				<Button
					onClick={() => handleDelete(subjectid)}
					disabled={deleteBtnState}
					type="button"
					variant="danger"
				>
					Видалити
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

EntityDeleteModal.propTypes = {
	handleDelete: PropTypes.func.isRequired,
	valuetoconfirm: PropTypes.string.isRequired,
	subject: PropTypes.string.isRequired,
	subjectid: PropTypes.string.isRequired
}

export default EntityDeleteModal
