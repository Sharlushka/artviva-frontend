import React from 'react'
import PropTypes from 'prop-types'

import { Form, Col } from 'react-bootstrap'

const Select = (props) => {
	const { touched, ...other } = props

	return (
		<Form.Group
			controlId={`${props.name}-input`}
			as={Col}
			xs={12}
		>
			<Form.Label>
				{props.label}
			</Form.Label>
			<Form.Control
				as="select"
				{ ...other }
				isValid={touched && !props.errors}
				isInvalid={touched && !!props.errors}
			>
				{props.customselectvalue
					? <option value={0}>{props.customselectvalue}</option>
					: <option>Виберіть...</option>
				}
				{props.options.map(item =>
					<option value={item} key={item}>{item}</option>
				)}
			</Form.Control>
			<Form.Control.Feedback>
				Ok
			</Form.Control.Feedback>
			<Form.Control.Feedback type="invalid">
				{props.errors}
			</Form.Control.Feedback>
		</Form.Group>
	)
}

Select.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string.isRequired,
		PropTypes.number.isRequired
	]),
	customselectvalue: PropTypes.string,
	touched: PropTypes.bool,
	errors: PropTypes.string
}

const MemodSelect = React.memo(Select)
export default MemodSelect
