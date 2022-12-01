import React from 'react'
import { act } from 'react-test-renderer'
import { shallow } from 'enzyme'
import TestWrapper from '../../utils/test-wrapper'
import ProtectedRoute from '.'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<ProtectedRoute />', () => {
	it('Should match the snapshot', () => {
		act(() => {
			const wrapper = shallow(
				<TestWrapper>
					<ProtectedRoute exact path='/' component={<h1>TEST</h1>}>
						<h1>TEST</h1>
					</ProtectedRoute>
				</TestWrapper>
			)
			expect(wrapper).toMatchSnapshot()
		})
	})
})
