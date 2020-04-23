import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_API_URL}/api/payment`

/**
* Get data for the payment form
* @param {Object} data - Data for the form
* @param {string} data.action - Payment type
* @param {string} data.amount - Payment amount
* @param {string} data.currency - Payment currency
* @param {string} data.description - Payment description
* @param {string} data.order_id - Payment order id
* @param {string} data.version - Liqpay API version
*
* @returns {Object} - Response data
*/

const form = async data => {
	const response = await axios.post(`${baseUrl}/form`, data)
	return response.data
}

export default { form }
