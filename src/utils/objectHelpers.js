/**
* Trim spaces from object keys and values
* @param {object} obj - Object with data
*
* @return {object} - Object with key/value pair trimmed of spaces
*/

export const trimObject = obj => {
	if (obj === null && !Array.isArray(obj) && typeof obj !== 'object') return obj
	return Object.keys(obj).reduce((acc, key) => {
		acc[key.trim()] = typeof obj[key] === 'string' ?
			obj[key].trim() : typeof obj[key] === 'object' ? trimObject(obj[key]) : obj[key]
		return acc
	}, Array.isArray(obj)? []:{})
}
