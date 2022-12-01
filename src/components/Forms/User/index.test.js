import React from 'react'
import renderer from 'react-test-renderer'
import { Register } from './Register'
import { SignIn } from './Login'
import TestWrapper from '../../../utils/test-wrapper'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<RegisterForm />', () => {
	it('should match the snapshot', () => {
		const wrapper = renderer.create(
			<TestWrapper>
				<Register classes={{ main: {} }} />)
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})

describe('<LoginForm />', () => {
	it('should match the snapshot', () => {
		const wrapper = renderer.create(
			<TestWrapper>
				<SignIn classes={{ main: {} }} />)
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
