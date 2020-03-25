import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Row } from 'react-bootstrap'

// eslint-disable-next-line
const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	return (
		<Row className="border border-primary">
			<div style={hideWhenVisible} className="text-center">
				<Button
					className="my-3"
					variant="primary"
					onClick={toggleVisibility}
					data-cy={props.dataCy}
				>
					{props.buttonLabel}
				</Button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<div className="text-center">
					<Button
						onClick={toggleVisibility}
						type="submit"
						variant="secondary"
						data-cy="toggleBtn"
					>
						close
					</Button>
				</div>
			</div>
		</Row>
	)
})

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}

export default Togglable
