import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Department from '../../../components/teachers/Department'
import department from '../../../__mocks__/testDepartment'
import { shuffle } from '../../../utils/shuffleArray'

afterEach(cleanup)

describe('Department component', () => {

	beforeEach(() => {
		const observe = jest.fn()
		window.IntersectionObserver = jest.fn(function() {
			this.observe = observe
		})
	})

	it('renders correctly', () => {
		const match = null
		const { getByText } = render(
			<Department name={department.name}
				teachers={shuffle(department.teachers)}
				scrollTo={match ? match.params.department : 'default'}
			/>
		)
		expect(getByText(/викладач фортепіано, музично-теоретичних дисциплін, концертмейстер/i)).toBeInTheDocument()
	})
})
