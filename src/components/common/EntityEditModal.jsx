import React from 'react'
import { Modal } from 'react-bootstrap'
// import { useEffect } from 'react'
// import PropTypes from 'prop-types'

const EntityEditModal = (props) => {
	console.log('Edit modal props', props)
	// const [valueChange, setValueChange] = useState('')
	// const [deleteBtnState, setDeleteBtnState] = useState(true)
	/*
	const handleChange = event => (
		setValueChange(event.target.value)
	)

	useEffect(() => {
		if (valueChange === valuetoconfirm) {
			setDeleteBtnState(false)
		} else setDeleteBtnState(true)
	},[valueChange, valuetoconfirm])*/

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="entity-edit-modal"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="entity-edit-modal">
					Редагувати
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{/*<h4 className="text-muted">{valuetoconfirm}</h4>
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
				</Form.Group>*/}
				{props.children}
			</Modal.Body>
			<Modal.Footer>
				{/*<Button
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
				</Button>*/}
			</Modal.Footer>
		</Modal>
	)
}

/*
EntityEditModal.propTypes = {
	handleDelete: PropTypes.func.isRequired,
	valuetoconfirm: PropTypes.string.isRequired,
	subject: PropTypes.string.isRequired,
	subjectid: PropTypes.string.isRequired
}*/

export default EntityEditModal
