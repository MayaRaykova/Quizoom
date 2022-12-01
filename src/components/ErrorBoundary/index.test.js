import React from 'react'
import renderer from 'react-test-renderer'
import TestWrapper from '../../utils/test-wrapper'
import ErrorBoundary from '.'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<ErrorBoundary />', () => {
	it('should match the snapshot', () => {
		const wrapper = renderer.create(
			<TestWrapper>
				<ErrorBoundary>
					<h1>TEST</h1>
				</ErrorBoundary>
				)
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
