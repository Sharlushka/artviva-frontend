import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useEffect } from 'react'

const SpecialtyDeleteModal = ({ specialty, handleDelete, ...props }) => {

	const [valueChange, setValueChange] = useState('')
	const [deleteBtnState, setDeleteBtnState] = useState(true)

	const handleChange = event => (
		setValueChange(event.target.value)
	)

	useEffect(() => {
		if (valueChange === specialty.title) {
			setDeleteBtnState(false)
		} else setDeleteBtnState(true)
	},[valueChange, specialty.title])

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Видалити спеціальність
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h4>{specialty.title}</h4>
				<p>
					Щоб видалити спеціальність, ви повинні ввести її назву в поле нижче.
				</p>
				<Form.Group>
					<Form.Control
						size="sm"
						type="text"
						autoComplete="off"
						placeholder="Назва спеціальності"
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
					onClick={() => handleDelete(specialty.id)}
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

export default SpecialtyDeleteModal
