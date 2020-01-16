import React from 'react'
// import TestRenderer from 'react-test-renderer'
import ShallowRenderer from 'react-test-renderer/shallow'
import Basic from '../components/Basic'

// Basic Test with React-test-renderer
it('renders correctly react-test-renderer', () => {
	const renderer = new ShallowRenderer()
	renderer.render(<Basic />)
	const result = renderer.getRenderOutput()

expect(result).toMatchSnapshot()
})
