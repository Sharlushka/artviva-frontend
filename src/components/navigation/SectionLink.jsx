import React from 'react'
import PropTypes from 'prop-types'

import { NavLink } from 'react-router-dom'

const SectionLink = ({ to, label, className }) => {
	return (
		<NavLink
			className={className}
			activeClassName="is-active"
			to={to}
		>
			{label}
		</NavLink>
	)
}

SectionLink.propTypes = {
	to: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	className: PropTypes.string
}

export default SectionLink
