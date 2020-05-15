import React, { useEffect, useState, useRef, Suspense } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initializeSpecialties } from '../../reducers/specialtiesReducer'

import { Container, ListGroup } from 'react-bootstrap'
import LoadingIndicator from '../common/LoadingIndicator'
import Toggler from '../common/Toggler'
import Specialty from './Specialty'

const LazySpecialtyForm = React.lazy(() => import('../forms/SpecialtyForm'))

const SpecialtiesList = ({ initializeSpecialties, specialties }) => {

	const specialtyFormRef = useRef(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// check if they are already set?
		initializeSpecialties()
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
		<Container className="mt-5 text-center">
			<h4 className="pt-4 custom-font">Спеціальності</h4>
			{isLoading
				? <LoadingIndicator
					animation="border"
					variant="primary"
				/>
				: <>
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
					<p className="pt-3 text-muted">
						Щоб створити спеціальність, вам потрібна така інформація:
						<strong> назва спеціальності, вартість</strong>.
						Додаткова інформація не є обов&apos;язковою.
					</p>
					<Toggler
						buttonLabel="Додати новій фах"
						data-cy="add-specialty-btn"
						ref={specialtyFormRef}
					>
						<Suspense fallback={<div>Loading...</div>}>
							<LazySpecialtyForm mode="create" />
						</Suspense>
					</Toggler>
				</>
			}
		</Container>
	)
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
