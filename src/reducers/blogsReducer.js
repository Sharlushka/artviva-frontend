import blogsService from '../services/blogs'

const blogsReducer = (state = [], action) => {
	switch (action.type) {
	case 'CREATE_BLOG':
		return [...state, action.data]
	case 'DELETE_BLOG':
		return state.filter(blog => blog.id !== action.data)
	case 'INIT_BLOGS':
		return action.data
	case 'COMMENT': {
		const blogId = action.data.blog // blog id returned from mongoose schema
		const blogToChange = state.find(blog => blog.id === blogId)
		const changedBlog = {
			...blogToChange,
			comments: blogToChange.comments.concat(action.data)
		}
		return state.map(blog =>
			blog.id !== blogId ? blog : changedBlog
		)
	}
	case 'ADD_LIKE': {
		const updatedBlog = action.data
		updatedBlog.likes++
		return state.map(blog =>
			blog.id !== action.data.id ? blog : updatedBlog
		)
	}
	default:
		return state
	}
}

export const createBlog = blog => {
	return async dispatch => {
		const newBlog = await blogsService.create(blog)
		dispatch ({
			type: 'CREATE_BLOG',
			data: newBlog
		})
	}
}

export const deleteBlog = id => {
	return async dispatch => {
		await blogsService.deleteBlog(id)
		dispatch ({
			type: 'DELETE_BLOG',
			data: id
		})
	}
}

/**
 * Increase blog likes count
 * @param {Object} blog Blog to alter
 */

export const addLike = (blog) => {
	return async dispatch => {
		const updatedBlog = await blogsService.like(blog)
		dispatch ({
			type: 'ADD_LIKE',
			data: updatedBlog
		})
	}
}

/**
 * Add comment to the blog
 * @param {Object} blog
 */

export const comment = (blog) => {
	return async dispatch => {
		const response = await blogsService.comment(blog)
		dispatch ({
			type: 'COMMENT',
			data: response
		})
	}
}

/**
 * Initialise blogs
 */
export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogsService.getAll()
		dispatch ({
			type: 'INIT_BLOGS',
			data: blogs
		})
	}
}

export default blogsReducer
