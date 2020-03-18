import React from 'react'
import { connect } from 'react-redux'
import { ListGroup, Popover, OverlayTrigger } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Logout from './Logout'

const UserInfoPopover = ({ user }) => {

	const popover = (
		<Popover id="popover-basic">
			<Popover.Title as="h3">{user ? `Hi, ${user.name} ${user.middlename} ${user.lastname}` : 'Hi'}!</Popover.Title>
			<Popover.Content>
				<ListGroup variant="flush">
					{user ?
						<>
							<ListGroup.Item className="p-2">{user.email}</ListGroup.Item>
							<ListGroup.Item className="p-2">
								<Link to={'/profile'}>Профіль</Link>
							</ListGroup.Item>
							<ListGroup.Item className="p-2">
								{user.id}
							</ListGroup.Item>
						</>
						: null
					}
					<ListGroup.Item className="text-center">
						{user
							? <Logout />
							: <Link to={'/login'}>
									Логін
							</Link>
						}
					</ListGroup.Item>
				</ListGroup>
			</Popover.Content>
		</Popover>
	)

	return (
		<div className="d-flex justify-content-end align-items-center px-2 py-2 py-sm-0">
			<OverlayTrigger
				trigger="click"
				placement="left"
				overlay={popover}
				rootClose
			>
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
