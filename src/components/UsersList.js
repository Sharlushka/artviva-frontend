import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import User from './User'
import { getUsersList } from '../reducers/usersReducer'
import { ListGroup } from 'react-bootstrap'
import userService from '../services/usersList' // user??
import { setNotification } from '../reducers/notificationReducer'

const UsersList = (props) => {
	useEffect(() => {
		if (props.user) { // this doesn't spark joy
			userService.setToken(props.user.token)
		}
		props.getUsersList()
			.catch(error => {
				const notification = JSON.parse(error.request.responseText)
				props.setNotification({
					message: notification.error,
					variant: 'danger'
				 }, 5)
			})
		// eslint-disable-next-line
	}, [])

	if (props.users) {
		return (
			<>
				<h3>Users</h3>
				<ListGroup variant="flush">
						{props.users.map(user =>
							<ListGroup.Item
								key={user.id}
							>
							<User
								key={user.id}
								userData={user}
							/>
							</ListGroup.Item>
						)}
				</ListGroup>
			</>
		)
	} else return (
		<h4>just a sec..</h4>
	)
}

const mapStateToProps = (state) => {
	return {
		users: state.users,
		user: state.user
	}
}

const mapDispatchToProps = {
	getUsersList,
	setNotification
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UsersList)
