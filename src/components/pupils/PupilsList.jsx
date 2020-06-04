import React, { useEffect, useState, Suspense } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initializePupils, sortPupils } from '../../reducers/pupilsReducer'
import pupilsService from '../../services/pupils'

import { Container, Row, Col, Form, ListGroup } from 'react-bootstrap'
import Pupil from './Pupil'
import LoadingIndicator from '../common/LoadingIndicator'
import CollapseForm from '../common/CollapseForm'

const LazyPupilForm = React.lazy(() => import('../forms/PupilForm'))

const PupilsList = ({
	user,
	pupils,
	initializePupils,
	sortPupils,
	setNotification }) => {

	const [isLoading, setIsLoading] = useState(true)
	const [defaultSortOrder, setdefaultSortOrder] = useState(true)

	useEffect(() => {
		if (user) {
			pupilsService.setToken(user.token)
			initializePupils()
				.catch(error => {
					setNotification({
						message: `Щось пішло не так, спробуйте пізніше:
							${error.status} ${error.statusText}`,
						variant: 'danger'
					}, 5)
				})
				.finally(() => setIsLoading(false))
		}
	// eslint-disable-next-line
	}, [user, initializePupils, setNotification])

	const changeOrder = () => {
		defaultSortOrder ? sortPupils('name') : sortPupils('name', 'desc')
		setdefaultSortOrder(!defaultSortOrder)
	}

	return (
		<Container>
			{isLoading
				? <LoadingIndicator
					animation="border"
					variant="primary"
				/>
				: <>
					{/*<p className="pt-3 text-muted">
						Щоб створити учня, вам потрібна така інформація:
						<strong> Ім&apos;я та прізвище</strong>.
						Додаткова інформація не є обов&apos;язковою.
					</p>*/}
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
					<Row className="py-2">
						<Col xs={8}>
							<em className="text-muted">Список усіх учнів школи.</em>
						</Col>
						<Col xs={4}>
							<Form>
								<Form.Check
									custom
									type="checkbox"
									id="sort-checkbox"
									label="A-Z"
									onClick={changeOrder}
								/>
							</Form>
						</Col>
					</Row>
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
				</>
			}
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		pupils: state.pupils,
		user: state.user
	}
}

const mapDispatchToProps = {
	setNotification,
	initializePupils,
	sortPupils
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PupilsList)
