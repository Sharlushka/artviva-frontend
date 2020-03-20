import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import TeacherCard from './TeacherCard'
import PropTypes from 'prop-types'

const DepartmentsAccordion = ({ departments }) => {
	console.log('Props are', departments)
	return (
		<Accordion defaultActiveKey={departments[0].id}>
			{departments.map(department =>
				<Card key={department.id}>
					<Accordion.Toggle
						as={Card.Header}
						eventKey={department.id}
						className="d-flex justify-content-between align-items-center"
					>
						<h5 className="custom-font m-0">{department.name}</h5>
						<FontAwesomeIcon icon={faAngleDown} />
					</Accordion.Toggle>
					<Accordion.Collapse eventKey={department.id}>
						<Card.Body>
							{department.teachers.map(teacher =>
								<TeacherCard key={teacher.id} person={teacher} />
							)}
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			)}
		</Accordion>
	)
}

DepartmentsAccordion.propTypes = {
	departments: PropTypes.array.isRequired
}

export default DepartmentsAccordion
