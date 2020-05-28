import React from 'react'
import PropTypes from 'prop-types'

const ListItem = ({ label, data }) => {
	return (
		<li className="py-1">
			<span className="text-muted">{label}</span> {data}
		</li>
	)
}

ListItem.propTypes = {
	label: PropTypes.string.isRequired,
	data: PropTypes.string.isRequired
}

export default ListItem