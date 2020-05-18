import React from 'react'
import { Button, Spinner } from 'react-bootstrap'
import PropTypes from 'prop-types'

const BtnWithSpinner = ({
	loadingState,
	disabledState,
	label,
	type,
	variant,
	dataCy,
	classList }) => {

	return (
		<Button
			block
			type={type}
			variant={variant}
			data-cy={dataCy}
			className={classList}
			disabled={disabledState}
		>
			{loadingState
				? <Spinner
					as="span"
					animation="border"
					size="sm"
					role="status"
					aria-hidden="true"
				/>
				: <>{label}</>
			}
		</Button>
	)
}

BtnWithSpinner.propTypes = {
	type: PropTypes.string,
	loadingState: PropTypes.bool.isRequired,
	disabledState: PropTypes.bool,
	label: PropTypes.string.isRequired,
	variant: PropTypes.string.isRequired,
	dataCy: PropTypes.string.isRequired,
	classList: PropTypes.string // Realy??
}

export default BtnWithSpinner
