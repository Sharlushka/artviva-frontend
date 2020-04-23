import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Button } from 'react-bootstrap'

// eslint-disable-next-line
const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '', width: '100%' }
	const showWhenVisible = { display: visible ? '' : 'none', width: '100%' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	return (
		<>
			<Row className="d-flex justify-content-center">
				<Col>
					<div style={hideWhenVisible} className="my-2">
						<Button
							block
							variant="success"
							onClick={toggleVisibility}
							data-cy={props.dataCy}
						>
							{props.buttonLabel}
						</Button>
					</div>
				</Col>
			</Row>
			<div style={showWhenVisible}>
				<Row className="d-flex justify-content-center">
					{props.children}
					<Col className="mb-3">
						<Button
							block
							onClick={toggleVisibility}
							type="button"
							variant="secondary"
							data-cy="toggle-btn"
						>
							Скасувати
						</Button>
					</Col>
				</Row>
			</div>
		</>
	)
})

Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired
}

export default Togglable
