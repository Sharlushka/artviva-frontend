import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Col } from 'react-bootstrap'
import BtnWithIcon from './BtnWithIcon'

const EntityControlButtons = ({
	route,
	openEditModal,
	openDeleteModal
}) => {

	const history = useHistory()

	const routeChange = () => {
		history.push(route)
	}

	return (
		<Col className="my-2 d-flex justify-content-end align-items-center">
			{route
				? <BtnWithIcon
					label="Детальніше"
					icon="info"
					variant="outline-primary"
					type="button"
					onClick={routeChange}
				/>
				: null
			}
			<BtnWithIcon
				label="Редагувати"
				icon="edit"
				variant="outline-success"
				type="button"
				onClick={() => openEditModal()}
			/>
			<BtnWithIcon
				label="Видалити"
				icon="trash"
				variant="outline-danger"
				type="button"
				onClick={() => openDeleteModal()}
			/>
		</Col>
	)
}

EntityControlButtons.propTypes = {
	route: PropTypes.string,
	openEditModal: PropTypes.func.isRequired,
	openDeleteModal: PropTypes.func.isRequired
}

export default EntityControlButtons
