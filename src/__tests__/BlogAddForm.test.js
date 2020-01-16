import React from 'react'
import BlogAddForm from '../components/BlogAddForm'
import { Provider } from 'react-redux'
import { render, fireEvent, cleanup } from '@testing-library/react'
import store from '../store'
import App from '../App'
import Notification from '../components/Notification'
import user from '../__mocks__/testUser'

afterEach(cleanup)

describe('Blog add form', () => {
	let wrapper
	let titleInput
	let authorInput
	let urlInput

	beforeEach(() => {
		store.user = user
		window.localStorage.setItem(
			'loggedUserJSON', JSON.stringify(user)
		)
		wrapper = render(
			<Provider store={store}>
				<App>
					<Notification />
					<BlogAddForm />
				</App>
			</Provider>
		)
		titleInput = wrapper.getByLabelText('Title')
		authorInput = wrapper.getByLabelText('Author')
		urlInput = wrapper.getByLabelText('Url')
	})

	it('submits form data correctly', async () => {

		fireEvent.change(titleInput, { target: { value: 'Test title' } })
		expect(titleInput.value).toBe('Test title')

		fireEvent.change(authorInput, { target: { value: 'Test author' } })
		expect(authorInput.value).toBe('Test author')

		fireEvent.change(urlInput, { target: { value: 'Test url' } })
		expect(urlInput.value).toBe('Test url')

		// accessing form data from the synthetic event when
		// user submits a form
		// with title, author and url being the ids of our input element
		// and using data-testid property of the form to address it
		// maybe use a button that is visible to the user?
		fireEvent.submit(wrapper.getByTestId('addBlogForm'), {
			target:	{
					title: { value: 'Test title' },
					author: { value: 'Test author' },
					url: { value: 'Test url' }
				}
		})

		// visible only after submmiting the form
		const alert = await wrapper.findByRole('alert')
		expect(alert.classList.contains('alert-success')).toBe(true)
		expect(wrapper.container).toHaveTextContent('Blog successfully added.')
	})

	it('displays error if input data is missing', async () => {
		fireEvent.submit(wrapper.getByTestId('addBlogForm'), {
			target:	{
					title: { value: '' },
					author: { value: 'Test author' },
					url: { value: 'Test url' }
				}
		})

		const alert = await wrapper.findByRole('alert')
		expect(alert.classList.contains('alert-danger')).toBe(true)
		expect(wrapper.container).toHaveTextContent('Some fields are empty.')
	})
})
