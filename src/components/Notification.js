import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

/**
 * Set notification
 * @param {Object} notification Includes message and type
 */

const Notification = ({ notification }) => {
		return (
			<>
			{(notification.message &&
				<Alert className="my-3" variant={notification.variant}>
					{notification.message}
				</Alert>
			)}
			</>
		)
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
}

export default connect(
	mapStateToProps
)(Notification)
