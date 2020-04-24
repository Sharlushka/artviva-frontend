
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import branchesReducer from './reducers/branchesReducer'
import specialtiesReducer from './reducers/specialtiesReducer'
import teachersReducer from './reducers/teachersReducer'
import pupilsReducer from './reducers/pupilsReducer'

const reducer = combineReducers({
	user: loginReducer,
	notification: notificationReducer,
	branches: branchesReducer,
	specialties: specialtiesReducer,
	teachers: teachersReducer,
	pupils: pupilsReducer
})

const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
)

export default store
