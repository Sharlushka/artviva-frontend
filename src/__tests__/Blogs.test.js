import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { render, waitFor, cleanup } from '@testing-library/react'
import Blogs from '../components/Blogs'
import store from '../store'
import '@testing-library/jest-dom/extend-expect'

jest.mock('../services/blogs')

afterEach(cleanup)

describe('Blogs list', () => {
	it('render all blogs it gets from backend', async () => {
		const component = render(
			<Provider store={store}>
				<MemoryRouter>
					<Blogs />
				</MemoryRouter>
			</Provider>
		)
		await waitFor(() => component.container)
		expect(component.container).toHaveTextContent('Test title one')
		const blogsList = component.container.querySelectorAll('.card-body')
		expect(blogsList.length).toBe(2)
	})
})