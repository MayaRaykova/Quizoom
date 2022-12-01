import React from 'react'
import renderer from 'react-test-renderer'
import TestWrapper from '../../utils/test-wrapper'
import EditableTextField from '.'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<EditableTextField />', () => {
	it('should match the snapshot', () => {
		const wrapper = renderer.create(
			<TestWrapper>
				<EditableTextField />)
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
