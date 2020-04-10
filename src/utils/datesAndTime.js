export const minDate = months => {
	let minDate = new Date()
	minDate.setMonth(minDate.getMonth() - months)
	return minDate
}

export const maxDate = months => {
	let maxDate = new Date()
	maxDate.setMonth(maxDate.getMonth() + months)
	return maxDate
}
