import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_API_URL}/api/password`

/**
* Send password recover email to the user
* @param {Object} data - User account data
* @param {string} data.email - User email
*
* @returns {Object} - Response data
*/

const sendRecoveryEmail = async data => {
	const response = await axios.post(`${baseUrl}/recover`, data)
	return response.data
}

/**
* Reset user password
* @param {Object} data - Data to reset user password
* @param {string} data.email - User email
* @param {string} data.passResetToken - User UUIDv4 password reset token
* @param {string} data.password - New user password
*
* @returns {Object} - Response data
*/

const resetUserPassword = async data => {
	const response = await axios.post(`${baseUrl}/reset`, data)
	return response.data
}

export default { sendRecoveryEmail, resetUserPassword }
