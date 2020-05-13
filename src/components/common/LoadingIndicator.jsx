import React from 'react'
import { Spinner } from 'react-bootstrap'
import PropTypes from 'prop-types'

const LoadingIndicator = ({ animation, variant, size }) => {
	return (
		<Spinner
			animation={animation}
			variant={variant || ''}
			role="status"
			size={size || 'lg'}
		>
			<span className="sr-only">Завантаження...</span>
		</Spinner>
	)
}

LoadingIndicator.propTypes = {
	animation: PropTypes.string.isRequired,
	variant: PropTypes.string,
	size: PropTypes.string
}

export default LoadingIndicator
