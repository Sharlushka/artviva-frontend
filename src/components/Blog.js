import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { addLike, deleteBlog } from '../reducers/blogsReducer'
import { setUserFromLocalStorage } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Card, Button } from 'react-bootstrap'

const Blog = ({ blog, ...props }) => {
	useEffect(() => {
		if (!props.user) {
			const loggedUserJSON = window.localStorage.getItem('loggedUserJSON')
			if (loggedUserJSON) {
				const loggedUser = JSON.parse(loggedUserJSON)
				props.setUserFromLocalStorage(loggedUser)
			}
		}
	// eslint-disable-next-line
	}, [])

	/**
	* Handle blog delete
	* @param {string} id Blog ID
	*/

	const handleDelete = (id) => {
		if (window.confirm(`Do you really want to delete blog with id of: ${id}?`)) {
			props.deleteBlog(id)
				.then(() => {
					props.setNotification({
						message: 'Blog successfully deleted',
						variant: 'success'
					}, 5)
				})
				.catch(error => {
					const notification = JSON.parse(error.request.responseText)
					props.setNotification({
						message: notification.error,
						variant: 'danger'
					 }, 5)
				})
		}
	}

	/**
	* Check if current user can delete this blog
	*/

	const checkAuthor = () => {
		if (props.user) {
			return props.user.id === blog.user.id ? true : false
		} else return false
	}

	return (
		<Card>
			<Card.Body>
				<Card.Title>
					<Link
						to={`/blogs/${blog.id}`}
						data-cy="blogTitleLink"
					>
						{blog.title}
					</Link>
				</Card.Title>
				<Card.Subtitle>
					{blog.author}
				</Card.Subtitle>
				<Card.Text>
					added by {blog.author}
				</Card.Text>
					{blog.url}
					<br />
					{blog.likes} likes
					<Button
						className="ml-2"
						type="button"
						variant="primary"
						onClick={() => props.addLike(blog)}
						data-cy="likeBtn"
					>
						like
					</Button>
					{ checkAuthor() &&
						<Button
							className="ml-2"
							type="button"
							variant="outline-secondary"
							data-cy="blogDelBtn"
							onClick={() => handleDelete(blog.id)
						}>
							delete
						</Button>
					}
			</Card.Body>
		</Card>
	)
}

Blog.propTypes = {
	blog: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	addLike,
	deleteBlog,
	setNotification,
	setUserFromLocalStorage
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Blog)
