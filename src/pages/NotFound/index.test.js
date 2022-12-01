import React from 'react'
import renderer from 'react-test-renderer'
import TestWrapper from '../../utils/test-wrapper'
import NotFound from '.'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<NotFound />', () => {
	it('Should match the snapshot', () => {
		const wrapper = renderer.create(
			<TestWrapper>
				<NotFound />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
