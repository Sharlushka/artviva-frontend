import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initializeSpecialties } from '../../reducers/specialtiesReducer'
import { ListGroup } from 'react-bootstrap'
import Specialty from './Specialty'

const SpecialtiesList = ({ initializeSpecialties, specialties }) => {

	useEffect(() => {
		initializeSpecialties()
	// eslint-disable-next-line
	}, [])

	if (specialties) {
		return (
			<>
				<h5 className="py-2">Спеціальності</h5>
				<ListGroup>
					{specialties.map(specialty =>
						<ListGroup.Item
							className="px-0 py-1"
							key={specialty.id}
						>
							<Specialty specialty={specialty} />
						</ListGroup.Item>
					)}
				</ListGroup>
			</>
		)
	} else {
		return (
			<h4>Loading...</h4>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		specialties: state.specialties
	}
}

const mapDispatchToProps = {
	setNotification,
	initializeSpecialties
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SpecialtiesList)
