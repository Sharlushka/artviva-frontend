import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initializeSchoolClasses } from '../../reducers/schoolClassesReducer'

import { Link } from 'react-router-dom'
import { Container, ListGroup } from 'react-bootstrap'
import SchoolClass from './SchoolClass'
import LoadingIndicator from '../common/LoadingIndicator'
import Toggler from '../common/Toggler'

import SchoolClassForm from '../forms/SchoolClassForm'

const SchoolClassesList = ({
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
	// eslint-disable-next-line
	}, [])

	return (
		<Container className="mt-5 text-center">
			<h4 className="pt-4">Класи</h4>
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
					<p className="pt-3 text-muted">
						Щоб створити клас, ви повинні бути впевнені,
						що ви створили <Link to="/school/teachers">вчителя</Link>,&nbsp;
						<Link to="/school/specialties">спеціальність</Link> та&nbsp;
						<Link to="/school/pupils">учнів</Link> для вашого нового класу.
					</p>
					<Toggler
						buttonLabel="Додати новий клас"
						data-cy="add-new-branch-btn"
						ref={schoolClassFormRef}
					>
						<SchoolClassForm mode="create" />
					</Toggler>
				</>
			}
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
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
