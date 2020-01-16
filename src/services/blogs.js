import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

/**
 * Set user auth token
 * @param {string} newToken Current user auth token
 */

const setToken = newToken => {
	token = `bearer ${newToken}`
}

/**
 * Get all blogs
 */
const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

/**
 * Create new blog post
 * @param {Object} newBlog New blog post data
 */
const create = async newBlog => {
	const config = {
		headers: { Authorization: token }
	}
	const response = await axios.post(baseUrl, newBlog, config)
	return response.data
}

/**
 * Comment on a blog post
 * @param {Object} payload Comment content and blog id
 */

const comment = async (payload) => {
		const config = {
		headers: { Authorization: token }
	}
	const response = await axios.post(`${baseUrl}/${payload.blog.id}/comments`, payload, config)
	return response.data
}

/**
 * Update blog
 * @param {string} id Id of the blog
 * @param {Object} updatedBlog Updated blog data
 */

const update = async (id, updatedBlog) => {
	const request = axios.put(`${baseUrl}/${id}`, updatedBlog)
	return request.then(response => response.data)
}

/**
 * Add like to the blog
 * @param {Object} blog To increase likes
 */
const like = async blog => {
	const config = {
		headers: { Authorization: token }
	}
	const request = axios.put(`${baseUrl}/${blog.id}`, blog, config)
	return request.then(response => response.data)
}

/**
 * Delete blog post
 * @param {string} id Blog post ID
 */

const deleteBlog = async id => {
	const config = {
		headers: { Authorization: token }
	}
	const request = axios.delete(`${baseUrl}/${id}`, config)
	return request.then(response => response.data)
}

export default { getAll, setToken, create, update, deleteBlog, comment, like }
