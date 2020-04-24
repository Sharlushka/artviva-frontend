import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initializePupils } from '../../reducers/pupilsReducer'
import { ListGroup } from 'react-bootstrap'
import Pupil from './Pupil'

const PupilsList = ({ pupils, ...props }) => {

	useEffect(() => {
		props.initializePupils()
	// eslint-disable-next-line
	}, [])

	return (
		<>
			<h5 className="py-2">Учні</h5>
			{pupils
				? <ListGroup>
					{pupils.map(pupil =>
						<ListGroup.Item
							className="px-0 py-1"
							key={pupil.id}
						>
							<Pupil pupil={pupil} />
						</ListGroup.Item>
					)}
				</ListGroup>
				: <h4>Завантаження...</h4>
			}
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		pupils: state.pupils
	}
}

const mapDispatchToProps = {
	setNotification,
	initializePupils
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PupilsList)
