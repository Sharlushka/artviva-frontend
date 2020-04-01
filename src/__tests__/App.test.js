import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent, cleanup } from '@testing-library/react'
import App from '../App'
import store from '../store'
import user from '../__mocks__/testUser'
import { act } from 'react-dom/test-utils'

afterEach(cleanup)

describe('Artiva main page', () => {
	it('renders main page correctly', () => {
		const { getByText } = render(
			<Provider store={store}>
				<App />
			</Provider>
		)
		expect(getByText(/artViva — дитяча школа мистецтв./i)).toBeInTheDocument()
	})

	it('when no user is logged in, login button is present', async () => {
		const { container, getByTestId } = render(
			<Provider store={store}>
				<App />
			</Provider>
		)
		await act(async () => {
			fireEvent.click(getByTestId('navbarUserIcon'))
		})

		expect(container).toHaveTextContent('Логін')
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

		it('logout button is present', async () => {
			await act(async () => {
				fireEvent.click(app.getByTestId('navbarUserIcon'))
			})

			expect(app.container).toHaveTextContent('Профіль')
			expect(app.container).toHaveTextContent('Вийти')
		})

		it('user can logout', async () => {
			await act(async () => {
				fireEvent.click(app.getByTestId('navbarUserIcon'))
			})

			fireEvent.click(app.getByText('Вийти'))

			expect(window.localStorage.getItem('loggedUserJSON')).toBe(undefined)
			expect(app.container).toHaveTextContent('Ви успішно вийшли з системи.')
		})
	})
})
