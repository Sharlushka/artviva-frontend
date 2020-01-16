import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import { render, cleanup } from '@testing-library/react'
import Blog from '../components/Blog'
import store from '../store'
import blog from '../__mocks__/singleTestBlog'
import user from '../__mocks__/testUser'

afterEach(cleanup)

describe('Blog component', () => {
	let component
	beforeEach(() => {
		window.localStorage.setItem(
			'loggedUserJSON', JSON.stringify(user)
		)
		component = render(
			<MemoryRouter>
				<Provider store={store}>
					<Blog blog={blog} />
				</Provider>
			</MemoryRouter>
		)
	})

	it('renders without errors', () => {
		expect(component.container).toHaveTextContent('Single test blog title')
	})

	it('delete button is visible', () => {
		expect(component.container).toHaveTextContent('delete')
	})

	it('delete button is not visible if created by another user', () => {
		let anotherBlog = { ...blog }
		anotherBlog.user.id = '_another_id_cda4e43b3bd1'

		component.rerender(
			<MemoryRouter>
				<Provider store={store}>
					<Blog blog={anotherBlog} />
				</Provider>
			</MemoryRouter>
		)
		expect(component.container).not.toHaveTextContent('delete')
	})
})
