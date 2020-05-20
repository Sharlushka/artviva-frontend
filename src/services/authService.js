const isLoggedIn = () => {
	const loggedUserJSON = window.localStorage.getItem('loggedUserJSON')
	if (loggedUserJSON) {
		return true
	}
	return false
}

export default { isLoggedIn }
