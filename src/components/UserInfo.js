import React from 'react'
import { connect } from 'react-redux'
import { getUsersList } from '../reducers/usersReducer'
import { ListGroup } from 'react-bootstrap'

const UserInfo = ({ userId, user, ...props }) => {
	if (props.users) {
		const userById = (id) =>
			props.users.find(user => user.id === id)
		const userBlogs = userById(userId).blogs

		return (
			<>
				<h3>User info</h3>
				<div className="py-4">
					<em><strong>{user.username}</strong></em>
					<br />
					<span className="text-muted">{user.email}</span>
					<br />
					<span className="text-muted">{user.id}</span>
				</div>
				<ListGroup>
					{userBlogs.map(blog =>
						<ListGroup.Item
							key={blog.id}
						>
							<h4 className="mb-0 d-inline">{blog.title}</h4>
							<em> {blog.author}</em>
							<span className='text-muted'> {blog.url}</span>
						</ListGroup.Item>
					)}
				</ListGroup>
			</>
		)
	} else {
		props.getUsersList()
		return (
			<h4>just a sec..</h4>
		)}
}

const mapStateToProps = (state) => {
	return {
		users: state.users,
		user: state.user
	}
}

const mapDispatchToProps = {
	getUsersList
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserInfo)
