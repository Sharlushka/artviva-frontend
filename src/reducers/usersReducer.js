import userService from '../services/usersList'

const usersReducer = (state = null, action) => {
	switch (action.type) {
	case 'GET_USERS_LIST':
		return action.data
	case 'GET_USER_BY_ID':
		return action.data
	case 'SIGN_UP_USER':
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

export default usersReducer
