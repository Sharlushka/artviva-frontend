import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useEffect } from 'react'

const TeacherDeleteModal = ({ teacher, handleDelete, ...props }) => {

	const [valueChange, setValueChange] = useState('')
	const [deleteBtnState, setDeleteBtnState] = useState(true)

	const handleChange = event => (
		setValueChange(event.target.value)
	)

	useEffect(() => {
		if (valueChange === teacher.name) {
			setDeleteBtnState(false)
		} else setDeleteBtnState(true)
	},[valueChange, teacher.name])

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="teacher-deletion-modal"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="teacher-deletion-modal">
					Видалити вчітеля
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h4>{teacher.name}</h4>
				<p>
					Щоб видалити вчітеля, ви повинні ввести його ім&apos;я в поле нижче.
				</p>
				<Form.Group>
					<Form.Control
						size="sm"
						type="text"
						autoComplete="off"
						placeholder="Ім'я вчітеля"
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
					onClick={() => handleDelete(teacher.id)}
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

export default TeacherDeleteModal
