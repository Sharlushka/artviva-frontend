const notificationReducer = (state = { message: null, variant: null, loadingState: false }, action) => {
	switch (action.type) {
	case 'SET_NOTIFICATION':
		state = {
			message: action.message,
			variant: action.variant
		}
		return state
	case 'CLOSE_NOTIFICATION':
		state = {
			message: null,
			variant: null
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

// set notification with auto close timeout
export const setNotification = (notification, time) => {
	return dispatch => {
		dispatch ({
			type: 'SET_NOTIFICATION',
			message: notification.message,
			variant: notification.variant
		})
		setTimeout(() => {
			dispatch ({
				type: 'CLOSE_NOTIFICATION'
			})
		}, time * 1000)
	}
}

// manually close notification
export const closeNotification = () => {
	return dispatch => {
		dispatch ({
			type: 'CLOSE_NOTIFICATION'
		})
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
