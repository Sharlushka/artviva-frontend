import userService from '../services/usersList'

const usersReducer = (state = null, action) => {
	switch (action.type) {
	case 'GET_USERS_LIST':
		return action.data
	case 'GET_USER_BY_ID':
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

export default usersReducer
