import React from 'react'
import renderer from 'react-test-renderer'
import TestWrapper from '../../utils/test-wrapper'
import { SignIn as Login } from '../../components/Forms/User/Login'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<Login />', () => {
	it('Should match the snapshot', () => {
		const wrapper = renderer.create(
			<TestWrapper>
				<Login classes={{ main: {} }} />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
