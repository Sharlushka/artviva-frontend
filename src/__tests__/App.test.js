import React from 'react'
import { Provider } from 'react-redux'
import { render, waitForElement, fireEvent, cleanup } from '@testing-library/react'
import App from '../App'
import store from '../store'
import user from '../__mocks__/testUser'

afterEach(cleanup)

describe('<App />', () => {
	it('it renders home page correctly', async () => {
		const { container, getByText } = render(
			<Provider store={store}>
				<App />
			</Provider>
		)
		// login link is present
		expect(container).toHaveTextContent('login')
		// default intro
		expect(getByText(/Login or/i).textContent).toBe('Login or sign up to add something')
		// footer
		expect(getByText(/React/i).textContent).toBe('React Redux blog app.')
	})

	describe('when user is logged in', () => {
		let app = undefined
		beforeEach(() => {
			window.localStorage.setItem(
				'loggedUserJSON', JSON.stringify(user)
			)
			store.user = user

			app = render(
				<Provider store={store}>
					<App />
				</Provider>
			)
		})

		it('\'new blog\' button is visible and is clickable', () => {
			expect(app.getByText(/new/i).textContent).toBe('new blog')
			fireEvent.click(app.getByText('new blog'))
			expect(app.container).toHaveTextContent(
				'Blog add form'
			)
		})

		it('logout button is visible', () => {
			expect(app.container).toHaveTextContent(
				'Logout'
			)
		})

		it('user can logout', () => {
			fireEvent.click(app.getByText('Logout'))
			expect(window.localStorage.getItem('loggedUserJSON')).toBe(undefined)
			expect(app.container).toHaveTextContent('Successfully logged out')
		})
	})
})
