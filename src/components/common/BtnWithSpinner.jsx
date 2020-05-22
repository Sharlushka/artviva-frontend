import React from 'react'
import { Button, Spinner } from 'react-bootstrap'
import PropTypes from 'prop-types'

const BtnWithSpinner = ({
	type,
	handleClick,
	loadingState,
	disabledState,
	waitingState,
	label,
	variant,
	dataCy,
	className }) => {

	const chooseSpinner = () => {
		const loadingSpinner = () => <Spinner
			as="span"
			animation="border"
			size="sm"
			role="status"
			aria-hidden="true"
		/>
		const waitingSpinner = () => <Spinner
			as="span"
			animation="grow"
			size="sm"
			role="status"
			aria-hidden="true"
		/>
		return waitingState ? waitingSpinner() : loadingState ? loadingSpinner() : null
	}

	return (
		<Button
			onClick={handleClick}
			block
			type={type}
			variant={variant}
			data-cy={dataCy}
			className={className}
			disabled={disabledState}
		>
			{chooseSpinner() || <>{label}</>}
		</Button>
	)
}

BtnWithSpinner.propTypes = {
	type: PropTypes.string,
	handleClick: PropTypes.func,
	loadingState: PropTypes.bool.isRequired,
	disabledState: PropTypes.bool,
	waitingState: PropTypes.bool,
	label: PropTypes.string.isRequired,
	variant: PropTypes.string.isRequired,
	dataCy: PropTypes.string.isRequired,
	className: PropTypes.string // className
}

export default BtnWithSpinner
