import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_API_URL}/api/password`

/**
* Send email with account activation link
* @param {Object} payload - User name, email address and UUID
* @returns {Object} - Response data
*/

const sendAccountActivationEmail = async payload => {
	const response = await axios.post(`${baseUrl}/activation`, payload)
	return response.data
}

/**
* Reset user password
* @param {Object} payload - New user password and UUID
* @returns {Object} - Response data
*/

const resetUserPassword = async payload => {
	const response = await axios.post(`${baseUrl}/reset`, payload)
	return response.data
}

export default { sendAccountActivationEmail, resetUserPassword }
