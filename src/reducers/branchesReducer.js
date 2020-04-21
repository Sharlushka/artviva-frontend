import branchesService from '../services/branches'

const branchesReducer = (state = [], action) => {
	switch (action.type) {
	case 'CREATE_BRANCH':
		return [...state, action.data]
	case 'DELETE_BRANCH':
		return state.filter(branch => branch.id !== action.data)
	case 'INIT_BRANCHES':
		return action.data
	default:
		return state
	}
}

/**
 * Create new branch
 * @param {Object} payload - New branch data
 * @param {string} payload.name - Unique branch name
 * @param {string} payload.town - City/town
 * @param {string} payload.address - Full address
 * @param {string} payload.phone - phone number
 * @param {string} payload.info - Additional info
 */
export const createBranch = payload => {
	return async dispatch => {
		const newBranch = await branchesService.create(payload)
		dispatch ({
			type: 'CREATE_BRANCH',
			data: newBranch
		})
	}
}

/**
 * Initialise branches
 */
export const initializeBranches = () => {
	return async dispatch => {
		const blogs = await branchesService.getAll()
		dispatch ({
			type: 'INIT_BRANCHES',
			data: blogs
		})
	}
}

/**
 * Delete single branch
 * @param {string} id - Id of the branch to delete
 */
export const deleteBranch = id => {
	return async dispatch => {
		await branchesService.deleteBranch(id)
		dispatch ({
			type: 'DELETE_BRANCH',
			data: id
		})
	}
}

export default branchesReducer
