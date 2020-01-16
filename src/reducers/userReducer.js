import loginService from '../services/login'

const userReducer = (state = null, action) => {
	switch (action.type) {
	case 'LOGIN':
		return action.user
	case 'SET_USER_FROM_LS':
		return action.user
	default:
		return state
	}
}

export const login = ({ email, password }) => {
	return async dispatch => {
		const user = await loginService.login({
			email,
			password
		})
		dispatch({
			type: 'LOGIN',
			user
		})
	}
}

export const setUserFromLocalStorage = user => {
	return async dispatch => {
		dispatch({
			type: 'SET_USER_FROM_LS',
			user
		})
	}
}

export default userReducer
