import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initializePupils } from '../../reducers/pupilsReducer'

import { Container, ListGroup } from 'react-bootstrap'
import Pupil from './Pupil'
import LoadingIndicator from '../common/LoadingIndicator'
import PupilForm from '../forms/PupilForm'
import Toggler from '../common/Toggler'

const PupilsList = ({ pupils, initializePupils, setNotification }) => {

	const PupilFormRef = useRef(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		initializePupils()
			.catch(error => {
				setNotification({
					message: `Щось пішло не так, спробуйте пізніше:
						${error.status} ${error.statusText}`,
					variant: 'danger'
				}, 5)
			})
			.finally(() => setIsLoading(false))
	// eslint-disable-next-line
	}, [])

	return (
		<Container className='mt-5 text-center'>
			<h4 className="pt-4 custom-font">Учні</h4>
			{isLoading
				? <LoadingIndicator
					animation="border"
					variant="primary"
				/>
				: <>
					<ListGroup>
						{pupils.map(pupil =>
							<ListGroup.Item
								className="px-0 py-1"
								key={pupil.id}
							>
								<Pupil pupil={pupil} />
							</ListGroup.Item>
						)}
					</ListGroup>
					<Toggler
						buttonLabel="Додати нового учня"
						data-cy="add-new-pupil-btn"
						ref={PupilFormRef}
					>
						<PupilForm mode='create' />
					</Toggler>
				</>
			}
		</Container>
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
