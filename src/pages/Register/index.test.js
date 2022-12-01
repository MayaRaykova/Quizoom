import React from 'react'
import renderer from 'react-test-renderer'
import TestWrapper from '../../utils/test-wrapper'
import { Register } from '../../components/Forms/User/Register'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<Register />', () => {
	it('Should match the snapshot', () => {
		const wrapper = renderer.create(
			<TestWrapper>
				<Register classes={{ main: {} }} />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
