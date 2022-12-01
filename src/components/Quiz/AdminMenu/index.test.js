import React from 'react'
import renderer from 'react-test-renderer'
import TestWrapper from '../../../utils/test-wrapper'
import AdminMenu from '.'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<AdminMenu />', () => {
	it('Should match the snapshot', () => {
		const wrapper = renderer.create(
			<TestWrapper>
				<AdminMenu />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
