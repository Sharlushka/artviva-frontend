import axios from 'axios'
const baseUrl = '/api/users/recaptcha/verify'

const verify = async payload => {
	const data = {
		captchaResp: payload
	}
	const response = await axios.post(baseUrl, data)
	return response.data
}

export default { verify }
