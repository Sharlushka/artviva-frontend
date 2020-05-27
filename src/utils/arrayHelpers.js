export const compareValues = (key, order = 'asc') => {
	return function innerSort(a, b) {
		if (!Object.prototype.hasOwnProperty.call(a, key) || !Object.prototype.hasOwnProperty.call(b, key)) {
			// property doesn't exist on either object
			return 0
		}

		const varA = (typeof a[key] === 'string')
			? a[key].toUpperCase() : a[key]
		const varB = (typeof b[key] === 'string')
			? b[key].toUpperCase() : b[key]

		let comparison = 0
		if (varA > varB) {
			comparison = 1
		} else if (varA < varB) {
			comparison = -1
		}
		return (
			(order === 'desc') ? (comparison * -1) : comparison
		)
	}
}

/**
 * Find object in array by property value
 * @param {string} value - Value to search
 * @param {string} field - Name of the field to search for given value
 * @param {array} data - Array of objects
 *
 * @return {object} - Resulting object
 */

export const findByPropertyValue =
	(value, field, data) => data.find(item => item[field] === value)
