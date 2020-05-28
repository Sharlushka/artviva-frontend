import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'

const Reset = props => {
	return (
		<Button
			type="reset"
			{ ...props }
		>
			{props.label}
		</Button>
	)
}

Reset.propTypes = {
	label: PropTypes.string.isRequired,
	className: PropTypes.string,
	variant: PropTypes.string,
	onClick: PropTypes.func,
}

const MemodReset = React.memo(Reset)
export default MemodReset
