import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_API_URL}/api/users/recaptcha/verify`

const verify = async payload => {
	const data = {
		captchaResp: payload
	}
	const response = await axios.post(baseUrl, data)
	return response.data
}

export default { verify }
