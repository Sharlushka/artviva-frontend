import React, { useState } from 'react'
import { Container, Collapse, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import TeacherCard from './TeacherCard'
import PropTypes from 'prop-types'

const Department = ({ name, teachers }) => {

	const [open, setOpen] = useState(false)

	return (
		<Container className="my-1 border border-light">
			<Button
				block
				onClick={() => setOpen(!open)}
				aria-controls="example-collapse-text"
				aria-expanded={open}
				variant="link"
				className="d-flex justify-content-between align-items-center"
			>
				<h5>
					{name}
				</h5>
				{ open
					? <FontAwesomeIcon icon={faAngleUp} />
					: <FontAwesomeIcon icon={faAngleDown} />
				}
			</Button>
			<Collapse in={open}>
				<Container>
					{teachers.map(teacher =>
						<TeacherCard key={teacher.id} person={teacher} />
					)}
				</Container>
			</Collapse>
		</Container>
	)
}

Department.propTypes = {
	name: PropTypes.string.isRequired,
	teachers: PropTypes.array.isRequired
}


export default Department
