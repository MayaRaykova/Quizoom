import React from 'react'
import renderer from 'react-test-renderer'
import TestWrapper from '../../../utils/test-wrapper'
import Answers from './Answers'
import SetQuestion from './SetQuestion'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<Answers />', () => {
	it('should match the snapshot', () => {
		const wrapper = renderer.create(
			<TestWrapper>
				<Answers selectedValue={jest.fn()} answers={[]} />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})

describe('<SetQuestion />', () => {
	it('should match the snapshot', () => {
		const wrapper = renderer.create(
			<TestWrapper>
				<SetQuestion />
			</TestWrapper>
		)
		expect(wrapper).toMatchSnapshot()
	})
})
