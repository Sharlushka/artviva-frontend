import schoolStatsService from '../services/schoolStats'

const schoolStatsReducer = (state = [], action) => {
	switch (action.type) {
	case 'INIT_SCHOOL_STATS':
		return action.data
	default:
		return state
	}
}

/**
 * Create new teacher
 * @param {Object} payload - New teacher data
 * @param {string} payload.name - Unique teacher name
 */
export const createTeacher = payload => {
	return async dispatch => {
		const newTeacher = await schoolStatsService.create(payload)
		dispatch ({
			type: 'CREATE_TEACHER',
			data: newTeacher
		})
	}
}

/**
 * Get all current school stats
 */
export const initializeSchoolStats = () => {
	return async dispatch => {
		const stats = await schoolStatsService.getAll()
		dispatch ({
			type: 'INIT_SCHOOL_STATS',
			data: stats
		})
	}
}

export default schoolStatsReducer
