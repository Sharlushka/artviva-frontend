import React from 'react'
import { Button, Spinner } from 'react-bootstrap'
import PropTypes from 'prop-types'

const BtnWithSpinner = ({
	loadingState,
	disabledState,
	label,
	btnType,
	variant,
	dataCy,
	classList }) => {

	return (
		<Button
			block
			type={btnType}
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
	loadingState: PropTypes.bool.isRequired,
	disabledState: PropTypes.bool.isRequired,
	label: PropTypes.string.isRequired,
	variant: PropTypes.string.isRequired,
	dataCy: PropTypes.string.isRequired,
	classList: PropTypes.string
}

export default BtnWithSpinner
