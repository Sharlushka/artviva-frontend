import React from 'react'
import PropTypes from 'prop-types'

import { Form } from 'react-bootstrap'

const CheckBox = props => {
	const { touched, ...other } = props
	return (
		<Form.Check
			custom
			isValid={touched && !props.errors}
			isInvalid={touched && !!props.errors}
			{ ...other }
		/>
	)
}

CheckBox.propTypes = {
	type: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.bool.isRequired,
	checked: PropTypes.bool.isRequired,
	touched: PropTypes.bool,
	errors: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func.isRequired
}

const MemodCheckBox = React.memo(CheckBox)
export default MemodCheckBox
