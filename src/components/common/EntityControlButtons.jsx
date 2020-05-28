import React from 'react'
import PropTypes from 'prop-types'

import { Col } from 'react-bootstrap'
import BtnWithIcon from './BtnWithIcon'

const EntityControlButtons = ({
	openEditModal,
	openDeleteModal
}) => {
	return (
		<Col className="my-2 d-flex justify-content-end">
			<BtnWithIcon
				label="Редагувати"
				icon="edit"
				variant="outline-success"
				type="button"
				onClick={() => openEditModal()}
			/>
			{<BtnWithIcon
				label="Видалити"
				icon="trash"
				variant="outline-danger"
				type="button"
				onClick={() => openDeleteModal()}
			/>}
		</Col>
	)
}

EntityControlButtons.propTypes = {
	openEditModal: PropTypes.func.isRequired,
	openDeleteModal: PropTypes.func.isRequired
}

export default EntityControlButtons
