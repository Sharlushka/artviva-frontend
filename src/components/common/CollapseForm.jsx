import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Container, Collapse, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

const CollapseForm = ({ title, ariaControls, children }) => {
	const [open, setOpen] = useState(false)

	return (
		<>
			{/* Big toggler button */}
			<Button
				block
				onClick={() => setOpen(!open)}
				aria-controls={ariaControls}
				aria-expanded={open}
				variant="outline-primary"
				className="mb-2 d-flex justify-content-between align-items-center"
			>
				<span>
					{title}
				</span>
				{ open
					? <FontAwesomeIcon icon={faAngleUp} />
					: <FontAwesomeIcon icon={faAngleDown} />
				}
			</Button>

			{/* Collapsed form goes here */}
			<Collapse in={open}>
				<Container>
					{children}
				</Container>
			</Collapse>
		</>
	)
}

CollapseForm.propTypes = {
	title: PropTypes.string.isRequired,
	ariaControls: PropTypes.string.isRequired,
	children: PropTypes.object
}

export default CollapseForm
