import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { render, waitForElement, cleanup } from '@testing-library/react'
import Users from '../components/UsersList'
import store from '../store'
jest.mock('../services/usersList')

afterEach(cleanup)

describe('Users list', () => {
	it('renders all users it gets from backend', async () => {
		const { container } = render(
			<Provider store={store}>
				<MemoryRouter>
					<Users />
				</MemoryRouter>
			</Provider>
		)
		await waitForElement(() => container)

		expect(container).toHaveTextContent('Dale \'tester\' Gribble')
		expect(container.querySelectorAll('.list-group-item')).toHaveLength(4)
	})
})