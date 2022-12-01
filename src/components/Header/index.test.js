import React from 'react'
import { act } from 'react-test-renderer'
import { shallow } from 'enzyme'
import TestWrapper from '../../utils/test-wrapper'
import Header from '.'
import AuthMenu from './AuthMenu'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<Header />', () => {
	it('Should match the snapshot', () => {
		act(() => {
			const wrapper = shallow(
				<TestWrapper>
					<Header />
				</TestWrapper>
			)
			expect(wrapper).toMatchSnapshot()
		})
	})
})

describe('<AuthMenu />', () => {
	it('Should match the snapshot', () => {
		act(() => {
			const wrapper = shallow(
				<TestWrapper>
					<AuthMenu />
				</TestWrapper>
			)
			expect(wrapper).toMatchSnapshot()
		})
	})
})
