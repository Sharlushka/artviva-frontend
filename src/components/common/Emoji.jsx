import React from 'react'
import PropTypes from 'prop-types'

const Emoji = props => {
	return (
		<span role="img" aria-label={props.label}>
			{props.emoji}
		</span>
	)
}

Emoji.propTypes = {
	label: PropTypes.string.isRequired
}

export default Emoji