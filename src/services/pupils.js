import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_API_URL}/api/pupils`

let token = null

/**
 * Set user auth token
 * @param {string} newToken Current user auth token
 */

const setToken = newToken => {
	token = `bearer ${newToken}`
}

/**
 * Get list of all pupils
 *
 * @returns {Object} - Response data
 */
const getAll = async () => {
	try {
		const config = {
			headers: { Authorization: token }
		}
		const response = await axios.get(baseUrl, config)
		return response.data
	} catch (error) {
		return Promise.reject(error.response)
	}
}

/**
 * Create new pupil
 * @param {Object} payload - New specialty data
 * @param {string} payload.name - Unique pupil name
 * @param {string} payload.info - Some optional pupil info
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
 * Delete single pupil
 * @param {string} id - Pupil ID
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
 * Update pupil's data
 * @param {string} id - Pupil's id
 * @param {Object} payload - Updated pupil's data
 * @param {string} payload.name - Unique pupil name
 *
 * @returns {Object} - Response data
 */

const update = async (id, payload) => {
	const config = {
		headers: { Authorization: token }
	}
	const request = axios.put(`${baseUrl}/${id}`, payload, config)
	return request.then(response => response.data)
}

export default { getAll, setToken, create, deleteById, update }
