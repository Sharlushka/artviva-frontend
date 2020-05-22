import React, { useState } from 'react'

// import { Link } from 'react-router-dom'
import { Table, Collapse, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

import PropTypes from 'prop-types'

const SchoolStatsTable = (props) => {

	const [open, setOpen] = useState(false)

	return (
		<>
			<Button
				block
				onClick={() => setOpen(!open)}
				aria-controls="teacher-collapse"
				aria-expanded={open}
				variant="link"
				className="d-flex justify-content-between align-items-center"
			>
				<span>
					{props.linkText}
				</span>
				{ open
					? <FontAwesomeIcon icon={faAngleUp} />
					: <FontAwesomeIcon icon={faAngleDown} />
				}
			</Button>
			<Collapse in={open}>
				<div>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>{props.header1stCol}</th>
								<th>{props.header2ndCol}</th>
							</tr>
						</thead>
						<tbody>
							{props.stats.map((stat, index) =>
								<tr key={stat.id}>
									<td>{index + 1}</td>
									<td>{stat[props.fieldName]}</td>
								</tr>
							)}
						</tbody>
					</Table>
				</div>
			</Collapse>
		</>
	)
}

SchoolStatsTable.propTypes = {
	link: PropTypes.string.isRequired,
	linkText: PropTypes.string.isRequired,
	header1stCol: PropTypes.string.isRequired,
	header2ndCol: PropTypes.string.isRequired,
	stats: PropTypes.array.isRequired,
	fieldName: PropTypes.string.isRequired
}

export default SchoolStatsTable
