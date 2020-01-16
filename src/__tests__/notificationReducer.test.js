import notificationReducer from '../reducers/notificationReducer'

describe('Notification reducer', () => {
	test('returns default state', () => {
		const defaultState = notificationReducer(undefined, {})

		expect(defaultState).toEqual({ message: null, variant: null })
	})

	test('sets notification correctly', () => {
		const newState = notificationReducer(undefined, {
			type: 'SET_NOTIFICATION',
			message: 'Test message',
			variant: 'success'
		})

		expect(newState.message).toBe('Test message')
		expect(newState.variant).toBe('success')
	})

	test('clears notification after a given amount of time', () => {
		const newState = notificationReducer(undefined, {
			type: 'SET_NOTIFICATION',
			message: 'Test timeout message',
			variant: 'info'
		})

		expect(newState.message).toBe('Test timeout message')
		expect(newState.variant).toBe('info')

		setTimeout(() => {
			expect(newState.message).toBe(null)
			expect(newState.variant).toBe(null)
		}, 1500)
	})

})
