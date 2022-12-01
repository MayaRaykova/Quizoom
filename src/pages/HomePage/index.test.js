import React from 'react'
import renderer from 'react-test-renderer'
import TestWrapper from '../../utils/test-wrapper'
import HomePage from '.'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<HomePage />', () => {
	it('Should match the snapshot', () => {
		const wrapper = renderer.create(
			<TestWrapper>
				<HomePage />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
