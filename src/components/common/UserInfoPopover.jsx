import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, Popover, OverlayTrigger } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Logout from './Logout'

const UserInfoPopover = ({ user }) => {

	const popover = (
		<Popover id="popover-basic">
			<Popover.Title as="h3">Hi, {user ? user.username : 'Default user'}!</Popover.Title>
			<Popover.Content>
				<ListGroup variant="flush">
					<ListGroup.Item className="p-1">{user.email}</ListGroup.Item>
					<ListGroup.Item className="p-1">{user.id}</ListGroup.Item>
					<ListGroup.Item className="text-center"><Logout /></ListGroup.Item>
				</ListGroup>
			</Popover.Content>
		</Popover>
	)

	return (
		<div className="d-flex justify-content-end align-items-center px-2">
			<OverlayTrigger
				trigger="click"
				placement="left"
				overlay={popover}>
				<FontAwesomeIcon icon={faUser} className="user-status-icon"/>
			</OverlayTrigger>
		</div>
	)

}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps
)(UserInfoPopover)
