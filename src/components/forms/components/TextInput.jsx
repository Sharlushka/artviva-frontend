import React from 'react'
import PropTypes from 'prop-types'

import { Col, Form } from 'react-bootstrap'

const TextInput = props => {
	const { touched, ...other } = props
	return (
		<Form.Group
			controlId={`${props.name}-input`}
			as={Col}
			xs={12}
		>
			<Form.Label>
				{props.label}
				<span className="form-required-mark"> *</span>
			</Form.Label>
			<Form.Control
				type="text"
				isValid={touched && !props.errors}
				isInvalid={touched && !!props.errors}
				{ ...other }
			/>
			<Form.Control.Feedback>
				Ok
			</Form.Control.Feedback>
			<Form.Control.Feedback type="invalid">
				{props.errors}
			</Form.Control.Feedback>
		</Form.Group>
	)
}

TextInput.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func.isRequired,
	onKeyUp: PropTypes.func,
	value: PropTypes.string.isRequired,
	touched: PropTypes.bool,
	errors: PropTypes.string
}

const MemodTextInput = React.memo(TextInput)
export default MemodTextInput
