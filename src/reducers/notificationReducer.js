const notificationReducer = (state = { message: null, variant: null, loadingState: false }, action) => {
	switch (action.type) {
	case 'SET_NOTIFICATION':
		state = {
			message: action.message,
			variant: action.variant
		}
		return state
	case 'SET_LOADING_STATE':
		state = {
			loadingState: action.loadingState
		}
		return state
	default:
		return state
	}
}

export const setNotification = (notification, time) => {
	return dispatch => {
		dispatch ({
			type: 'SET_NOTIFICATION',
			message: notification.message,
			variant: notification.variant
		})
		setTimeout(() => {
			dispatch ({
				type: 'SET_NOTIFICATION',
				message: null,
				variant: null
			})
		}, time * 1000)
	}
}

export const setLoadingState = loadingState => {
	return dispatch => {
		dispatch ({
			type: 'SET_LOADING_STATE',
			loadingState
		})
	}
}

export default notificationReducer
