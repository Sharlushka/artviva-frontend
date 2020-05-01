import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_API_URL}/api/branches`

let token = null

/**
 * Set user auth token
 * @param {string} newToken Current user auth token
 */

const setToken = newToken => {
	token = `bearer ${newToken}`
}

/**
 * Get list of all branches
 *
 * @returns {Object} - Response data
 */
const getAll = async () => {
	try {
		const response = await axios.get(baseUrl)
		return response.data
	} catch (error) {
		return Promise.reject(error.response)
	}
}

/**
 * Create new branch
 * @param {Object} payload - New branch data
 * @param {string} payload.name - Unique branch name
 * @param {string} payload.town - City/town
 * @param {string} payload.address - Full address
 * @param {string} payload.phone - phone number
 * @param {string} payload.info - Additional info
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
 * Delete single branch
 * @param {string} id - Branch ID
 *
 * @returns {Object} - Response data
 */

const deleteById = async id => { // just delete
	const config = {
		headers: { Authorization: token }
	}
	const request = axios.delete(`${baseUrl}/${id}`, config)
	return request.then(response => response.data)
}

/**
 * Update branch
 * @param {string} id - Id of the branch
 * @param {Object} payload - Updated branch data
 * @param {string} payload.name - Unique branch name
 * @param {string} payload.town - City/town
 * @param {string} payload.address - Full address
 * @param {string} payload.phone - phone number
 * @param {string} payload.info - Additional info
 *
 * @returns {Object} - Response data
 */

const update = async (id, payload) => {
	const request = axios.put(`${baseUrl}/${id}`, payload)
	return request.then(response => response.data)
}

export default { getAll, setToken, create, deleteById, update }
