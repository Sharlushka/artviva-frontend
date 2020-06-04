import React, { useState, useEffect, Suspense } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initializeSchoolClasses } from '../../reducers/schoolClassesReducer'
import schoolClassesService from '../../services/schoolClasses'

import { Link } from 'react-router-dom'
import { Container, ListGroup } from 'react-bootstrap'
import SchoolClass from './SchoolClass'
import LoadingIndicator from '../common/LoadingIndicator'
import CollapseForm from '../common/CollapseForm'

const LazySchoolClassForm = React.lazy(() => import('../forms/SchoolClassForm'))

const SchoolClassesList = ({
	user,
	schoolClasses,
	setNotification,
	initializeSchoolClasses
}) => {

	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (user) {
			schoolClassesService.setToken(user.token)
			initializeSchoolClasses()
				.catch(error => {
					setNotification({
						message: `Щось пішло не так, спробуйте пізніше:
							${error.status} ${error.statusText}`,
						variant: 'danger'
					}, 5)
				})
				.finally(() => setIsLoading(false))
		}
	}, [user, initializeSchoolClasses, setNotification])

	return (
		<Container>
			{isLoading
				? <LoadingIndicator
					animation="border"
					variant="primary"
				/>
				: <>
					<p className="pt-3 text-muted">
						Щоб створити клас, ви повинні бути впевнені,
						що ви створили <Link to="/school/teachers">вчителя</Link>,&nbsp;
						<Link to="/school/specialties">спеціальність</Link> та&nbsp;
						<Link to="/school/pupils">учнів</Link> для вашого нового класу.
					</p>

					<CollapseForm
						title="Додати новий клас"
						ariaControls="school-class-add-form-collapse"
					>
						<Suspense
							fallback={
								<LoadingIndicator
									animation="border"
									variant="primary"
								/>}>
							<LazySchoolClassForm mode="create" />
						</Suspense>
					</CollapseForm>

					<p className="pt-3">
						Список усіх класів школи.
					</p>
					<ListGroup>
						{schoolClasses.map(schoolClass =>
							<ListGroup.Item
								className="px-0 py-1"
								key={schoolClass.id}
							>
								<SchoolClass schoolClass={schoolClass} />
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
		user: state.user,
		schoolClasses: state.schoolClasses
	}
}

const mapDispatchToProps = {
	setNotification,
	initializeSchoolClasses
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SchoolClassesList)
