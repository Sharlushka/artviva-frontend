import React from 'react'
import ReactDOM from 'react-dom'
import HooksForm from '../components/HooksForm'
import { render, fireEvent, cleanup } from '@testing-library/react'

afterEach(cleanup)

// testing a controlled component form
it('Inputing text updates the state', () => {
		const { getByText, getByLabelText } = render(<HooksForm />)

		expect(getByText(/Change/i).textContent).toBe('Change: ')

		// the value from the form will be accessed in the form of event.target.value
		fireEvent.change(getByLabelText('Input Text:'), { target: { value: 'Text' } })

		expect(getByText(/Change/i).textContent).not.toBe('Change: ')
})


it('Submiting a form works correctly', () => {
		const { getByTestId, getByText } = render(<HooksForm />)

		expect(getByText(/Submit Value/i).textContent).toBe('Submit Value: ')

		// accessing form data from the synthetic event when
		// user submits a form
		// with text1 being the id of our input element
		// and using data-testid property of the form to address it
		fireEvent.submit(getByTestId('form'), { target: { text1: { value: 'Text' } } })

		expect(getByText(/Submit Value/i).textContent).not.toBe('Submit Value: ')
	})
