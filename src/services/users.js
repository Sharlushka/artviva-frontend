import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_API_URL}/api/users`

let token = null

/**
 * Set user auth token
 * @param {string} newToken Current user auth token
 */

// eslint-disable-next-line
const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const getUsersList = async () => {
	const config = {
		headers: { Authorization: token }
	}
	const response = await axios.get(baseUrl, config)
	return response.data
}

const signUp = async (credentials) => {
	const response = await axios.post(baseUrl, credentials)
	return response.data
}

// activate by UUID
const activate = async (uuid) => {
	const response = await axios.post(`${baseUrl}/activate`, uuid)
	return response.data
}

export default { getUsersList, signUp, setToken, activate }
