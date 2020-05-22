import React, { useEffect, useState, Suspense } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initializeSpecialties } from '../../reducers/specialtiesReducer'

import { Container, ListGroup } from 'react-bootstrap'
import LoadingIndicator from '../common/LoadingIndicator'
import CollapseForm from '../common/CollapseForm'
import Specialty from './Specialty'

const LazySpecialtyForm = React.lazy(() => import('../forms/SpecialtyForm'))

const SpecialtiesList = ({ initializeSpecialties, specialties }) => {

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
		<Container>
			{isLoading
				? <LoadingIndicator
					animation="border"
					variant="primary"
				/>
				: <>
					<p className="pt-3">
						Список усіх спеціальностей школи.
					</p>
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

					<CollapseForm
						title="Додати новій фах"
						ariaControls="specialty-add-form-collapse"
					>
						<Suspense
							fallback={
								<LoadingIndicator
									animation="border"
									variant="primary"
								/>}>
							<LazySpecialtyForm mode="create" />
						</Suspense>
					</CollapseForm>
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
