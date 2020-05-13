import React from 'react'

import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

const SchoolStatsTable = (props) => {
	return (
		<>
			<h5 className="text-muted">
				<Link to={props.link}>
					{props.linkText}
				</Link>
			</h5>
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