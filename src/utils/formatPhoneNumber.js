export const formatPhoneNumber = (event, fieldName, setFieldValue) => {
	// eslint-disable-next-line
	const phoneNumberPattern = /^\+?([0-9]{0,2}) ?\(?([0-9]{0,3})\)? ?[-. ]?([0-9]{0,3})[-. ]?([0-9]{0,2})-?([0-9]{0,2})$/
	let result
	const value = event.target.value

	// looks scary )
	if (event.keyCode === 8 || event.keyCode === 46) {
		// if user is deleting and and hit our prefix '+38 ('
		// delete all
		if (value.length <= 5 ) {
			setFieldValue(fieldName, '')
		} else { // delete last char
			setFieldValue(fieldName, value.slice(0, value.length))
		} // test if input matches phone number pattern
	} else if (phoneNumberPattern.test(value)) {
		// format it based on input length
		if (value.length === 1) {
			result = `+38 (${value}`
		} else if (value.length < 8) {
			result = `${value}`
		} else if (value.length === 8) {
			result = `${value}) `
		} else if (value.length < 12) {
			result = `${value}`
		} else if (value.length === 13) {
			result = `${value}-`
		} else if (value.length === 16) {
			result = `${value}-`
		} else result = value
		// set formatted field value
		setFieldValue(fieldName, result)
	}
}
