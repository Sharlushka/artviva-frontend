import React from 'react'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from '../components/SimpleBlog'

let component
const blog = {
	title: 'Component testing is done with react-testing-library',
	author: 'Hank',
	likes: 1
}
const mockHandler = jest.fn()

beforeEach(() => {
	component = render(
		<SimpleBlog blog={blog} onClick={mockHandler}/>
	)
})

test('renders content', () => {
	// debug
	// const li = component.container.querySelector('li')
	// console.log(prettyDOM(li))

	// method 1
	expect(component.container).toHaveTextContent(
		'Component testing is done with react-testing-library'
	)

	// method 2
	const element = component.getByText(
		'Component testing is done with react-testing-library Hank'
	)
	expect(element).toBeDefined()

	// method 3
	const div = component.container.querySelector('.simple-blog')
	expect(div).toHaveTextContent(
		'Component testing is done with react-testing-library Hank'
	)

	// amount of likes
	const likesInfo = component.container.querySelector('.likes-info')
	expect(likesInfo).toHaveTextContent(
		'blog has 1 likes'
	)
})

test('clicking the button twice calls event handler twice', () => {
	const button = component.getByText('like')
	fireEvent.click(button)
	fireEvent.click(button)

	expect(mockHandler.mock.calls.length).toBe(2)

})
