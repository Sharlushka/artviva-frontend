import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useEffect } from 'react'

const BranchDeleteModal = ({ branch, handleDelete, ...props }) => {

	const [valueChange, setValueChange] = useState('')
	const [deleteBtnState, setDeleteBtnState] = useState(true)

	const handleChange = event => (
		setValueChange(event.target.value)
	)

	useEffect(() => {
		if (valueChange === branch.town) {
			setDeleteBtnState(false)
		} else setDeleteBtnState(true)
	},[valueChange, branch.town])

	return (
		<Modal
			{...props}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Видалити філію
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h4>{branch.town}</h4>
				<p>
					Щоб видалити філію, ви повинні ввести її місто в поле нижче.
				</p>
				<Form.Group>
					<Form.Control
						size="sm"
						type="text"
						placeholder="Місто філії"
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
					onClick={() => handleDelete(branch.id)}
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

export default BranchDeleteModal
