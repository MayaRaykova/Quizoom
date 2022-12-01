import React from 'react'
import renderer from 'react-test-renderer'
import TestWrapper from '../../../utils/test-wrapper'
import AdminContent from '.'
import Questions from './Questions'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<AdminContent />', () => {
	it('Should match the snapshot', () => {
		const wrapper = renderer.create(
			<TestWrapper>
				<AdminContent />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})

describe('<Questions />', () => {
	it('Should match the snapshot', () => {
		const wrapper = renderer.create(
			<TestWrapper>
				<Questions questions={[]} />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
