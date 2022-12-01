import React from 'react'
import renderer from 'react-test-renderer'
import TestWrapper from '../../utils/test-wrapper'
import Loader from '.'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<Loader />', () => {
	it('Should match the snapshot', () => {
		const wrapper = renderer
			.create(
				<TestWrapper>
					<Loader />
				</TestWrapper>
			)
			.toJSON()
		expect(wrapper).toMatchSnapshot()
	})
})
