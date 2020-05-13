import React, { useState, useEffect, useRef, Suspense } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initializeSchoolClasses } from '../../reducers/schoolClassesReducer'

import { Container, ListGroup } from 'react-bootstrap'
import SchoolClass from './SchoolClass'
import LoadingIndicator from '../common/LoadingIndicator'
import Toggler from '../common/Toggler'

const LazySchoolClassForm = React.lazy(() => import('../forms/SchoolClassForm'))

const SchoolClassesList = ({
	user,
	schoolClasses,
	setNotification,
	initializeSchoolClasses
}) => {

	const schoolClassFormRef = useRef(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		initializeSchoolClasses()
			.catch(error => {
				setNotification({
					message: `Щось пішло не так, спробуйте пізніше:
						${error.status} ${error.statusText}`,
					variant: 'danger'
				}, 5)
			})
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<Container className="mt-5 text-center">
			<h4 className="pt-4 custom-font">Класи</h4>
			{isLoading
				? <LoadingIndicator
					animation="border"
					variant="primary"
				/>
				: <>
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
					<Toggler
						buttonLabel="Додати новий клас"
						data-cy="add-new-branch-btn"
						ref={schoolClassFormRef}
					>
						<Suspense fallback={
							<LoadingIndicator
								animation="border"
								variant="primary"
							/>}>
							<LazySchoolClassForm mode="create" />
						</Suspense>
					</Toggler>
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
