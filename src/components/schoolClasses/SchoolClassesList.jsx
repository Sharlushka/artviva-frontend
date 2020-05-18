import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../../reducers/notificationReducer'
import { initializeSchoolClasses } from '../../reducers/schoolClassesReducer'

import { Link } from 'react-router-dom'
import { Container, ListGroup, Button, Collapse } from 'react-bootstrap'
import SchoolClass from './SchoolClass'
import LoadingIndicator from '../common/LoadingIndicator'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

import SchoolClassForm from '../forms/SchoolClassForm'

const SchoolClassesList = ({
	schoolClasses,
	setNotification,
	initializeSchoolClasses
}) => {

	const [isLoading, setIsLoading] = useState(true)
	const [open, setOpen] = useState(false)

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
					<Button
						block
						onClick={() => setOpen(!open)}
						aria-controls="school-class-edit-form-collapse"
						aria-expanded={open}
						variant="outline-primary"
						className="d-flex justify-content-between align-items-center"
					>
						<span>
							Додати новий клас
						</span>
						{ open
							? <FontAwesomeIcon icon={faAngleUp} />
							: <FontAwesomeIcon icon={faAngleDown} />
						}
					</Button>
					<Collapse in={open}>
						<Container>
							<SchoolClassForm mode="create" />
						</Container>
					</Collapse>
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
