import userService from '../services/users'

const usersReducer = (state = null, action) => {
	switch (action.type) {
	case 'GET_USERS_LIST':
		return action.data
	case 'GET_USER_BY_ID':
		return action.data
	case 'SIGN_UP_USER':
		return action.data
	case 'ACTIVATE_ACCOUNT':
		return action.data
	default:
		return state
	}
}

export const getUsersList = () => {
	return async dispatch => {
		const users = await userService.getUsersList()
		dispatch ({
			type: 'GET_USERS_LIST',
			data: users
		})
	}
}

export const signUpUser = ({ email, name, middlename, lastname, password }) => {
	return async dispatch => {
		const user = await userService.signUp({
			email,
			name,
			middlename,
			lastname,
			password
		})
		dispatch ({
			type: 'SIGN_UP_USER',
			data: user
		})
	}
}

export const activateAccount = ({ uuid }) => {
	return async dispatch => {
		const user = await userService.activate({
			uuid
		})
		dispatch ({
			type: 'ACTIVATE_ACCOUNT',
			data: user
		})
	}
}

export default usersReducer
