import React, { useEffect, useState, Suspense } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initializePupils } from '../../reducers/pupilsReducer'

import { Container, ListGroup } from 'react-bootstrap'
import Pupil from './Pupil'
import LoadingIndicator from '../common/LoadingIndicator'
import CollapseForm from '../common/CollapseForm'

const LazyPupilForm = React.lazy(() => import('../forms/PupilForm'))

const PupilsList = ({ pupils, initializePupils, setNotification }) => {

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
		<Container>
			{isLoading
				? <LoadingIndicator
					animation="border"
					variant="primary"
				/>
				: <>
					<p className="pt-3">
						Список усіх учнів школи.
					</p>
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
					<p className="pt-3 text-muted">
						Щоб створити учня, вам потрібна така інформація:
						<strong> Ім&apos;я та прізвище</strong>.
						Додаткова інформація не є обов&apos;язковою.
					</p>

					<CollapseForm
						title="Додати нового учня"
						ariaControls="pupil-add-form-collapse"
					>
						<Suspense
							fallback={
								<LoadingIndicator
									animation="border"
									variant="primary"
								/>}>
							<LazyPupilForm mode="create" />
						</Suspense>
					</CollapseForm>
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
