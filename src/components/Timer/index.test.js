import React from 'react'
import renderer from 'react-test-renderer'
import TestWrapper from '../../utils/test-wrapper'
import Timer from '.'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<Timer />', () => {
	it('Should match the snapshot', () => {
		const wrapper = renderer.create(
			<TestWrapper>
				<Timer />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
