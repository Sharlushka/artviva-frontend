import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { comment } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const CommentForm = (props) => {
	const { reset : resetComment, ...comment } = useField('text')

	const handleComment = async event => {
		event.preventDefault()
		const newComment = {
			blog: props.blog,
			content: comment.value,
		}
		props.comment(newComment)
			.then(() => props.setNotification({
				message: 'Comment added',
				variant: 'success'
			 }, 5))
			.catch(error => {
				const notification = JSON.parse(error.request.responseText)
				props.setNotification({
					message: notification.error,
					variant: 'danger'
				}, 5)
			})
		resetComment('')
	}

	return (
		<Form
			data-cy="commentForm"
			onSubmit={handleComment}
		>
		<Form.Group>
			<Form.Label className="my-3">Your comment</Form.Label>
			<Form.Control
				data-cy="commentInput"
				{...comment}
			/>
			<Button
				className="my-3"
				variant="primary"
				type="submit"
				data-cy="commentBtn"
			>
				Comment
			</Button>
		</Form.Group>
	</Form>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	comment,
	setNotification
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CommentForm)
