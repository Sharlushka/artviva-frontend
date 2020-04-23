import axios from 'axios'
const baseUrl = '/api/teachers'

let token = null

/**
 * Set user auth token
 * @param {string} newToken Current user auth token
 */

const setToken = newToken => {
	token = `bearer ${newToken}`
}

/**
 * Get list of all teachers
 *
 * @returns {Object} - Response data
 */
const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

/**
 * Create new teacher
 * @param {Object} payload - New specialty data
 * @param {string} payload.name - Unique teacher name /? really
 *
 * @returns {Object} - Response data
 */
const create = async payload => {
	const config = {
		headers: { Authorization: token }
	}
	const response = await axios.post(baseUrl, payload, config)
	return response.data
}

/**
 * Delete single teacher
 * @param {string} id - Teacher ID
 *
 * @returns {Object} - Response data
 */

const deleteById = async id => {
	const config = {
		headers: { Authorization: token }
	}
	const request = axios.delete(`${baseUrl}/${id}`, config)
	return request.then(response => response.data)
}

/**
 * Update teacher's data
 * @param {string} id - Teacher's id
 * @param {Object} payload - Updated teacher data
 * @param {string} payload.name - Unique teacher title
 *
 * @returns {Object} - Response data
 */

const update = async (id, payload) => {
	const request = axios.put(`${baseUrl}/${id}`, payload)
	return request.then(response => response.data)
}

export default { getAll, setToken, create, deleteById, update }
