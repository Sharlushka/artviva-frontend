import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_API_URL}/api/school`

// let token = null

/**
 * Set user auth token
 * @param {string} newToken Current user auth token
 */
/*
const setToken = newToken => {
	token = `bearer ${newToken}`
}*/

/**
 * Get all current school stats
 *
 * @returns {Object} - Response data
 */
const getAll = async () => {
	try {
		const response = await axios.get(baseUrl) // make it post
		return response.data
	} catch (error) {
		console.log('Error')
		return Promise.reject(error.response)
	}
}

export default { getAll }
