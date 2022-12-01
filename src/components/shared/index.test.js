import React from 'react'
import renderer from 'react-test-renderer'
import TestWrapper from '../../utils/test-wrapper'
import ModalDialog from './ModalDialog'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<ModalDialog />', () => {
	it('Should match the snapshot', () => {
		const wrapper = renderer.create(
			<TestWrapper>
				<ModalDialog open={false} />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
