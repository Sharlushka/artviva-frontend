import React from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const ButtonComponent = ({ className, variant, type, handleClick, label }) => {
	return (
		<Button
			className={className}
			variant={variant}
			type={type}
			onClick={handleClick}
		>
			{label}
		</Button>
	)
}

ButtonComponent.propTypes = {
	className: PropTypes.string,
	variant: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	onClick: PropTypes.func
}

export default ButtonComponent
