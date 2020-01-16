import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { initializeBlogs } from '../reducers/blogsReducer'

const Blogs = ( { blogs, ...props }) => {
	useEffect(() => {
		props.initializeBlogs()
		// eslint-disable-next-line
	}, [])

	if (blogs) {
		return (
			<>
				<h2>Blogs</h2>
				{blogs.map(blog =>
					<Blog
						key={blog.id}
						blog={blog}
					/>
				)}
			</>
		)
	} else {
		return (
			<h4>just a sec..</h4>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
		user: state.user
	}
}

const mapDispatchToProps = {
	initializeBlogs
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Blogs)
