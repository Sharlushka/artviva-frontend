import React from 'react'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from '../components/SimpleBlog'
import '@testing-library/jest-dom/extend-expect'

let simpleBlog
const blog = {
	title: 'Component testing is done with react-testing-library',
	author: 'Hank',
	likes: 1
}
const mockHandler = jest.fn()

beforeEach(() => {
	simpleBlog = render(
		<SimpleBlog blog={blog} onClick={mockHandler}/>
	)
})

test('renders content', () => {
	// debug
	// const li = component.container.querySelector('li')
	// console.log(prettyDOM(simpleBlog.container))

	// method 1
	expect(simpleBlog.container).toHaveTextContent(
		'Component testing is done with react-testing-library'
	)

	// method 2
	const element = simpleBlog.getByText(
		'Component testing is done with react-testing-library Hank'
	)
	expect(element).toBeDefined()

	// method 3
	const div = simpleBlog.container.querySelector('.simple-blog')
	expect(div).toHaveTextContent(
		'Component testing is done with react-testing-library Hank'
	)

	// amount of likes
	const likesInfo = simpleBlog.container.querySelector('.likes-info')
	expect(likesInfo).toHaveTextContent(
		'blog has 1 likes'
	)
})

test('clicking the button twice calls event handler twice', () => {
	const button = simpleBlog.getByText('like')
	fireEvent.click(button)
	fireEvent.click(button)

	expect(mockHandler.mock.calls.length).toBe(2)

})
