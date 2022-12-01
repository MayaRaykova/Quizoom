import { shallow } from 'enzyme'
import React from 'react'
// import { createRender } from 'react-test-renderer'
import { act, create } from 'react-test-renderer'
import TestWrapper from '../../utils/test-wrapper'
import AvailableQuizList from './AvailableQuizList'
import CompletedQuizList from './CompletedQuizList'
import CompletedUsers from './CompletedUsers'
import OwnQuizList from './OwnQuizList'
import UserData from './UserData'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<AvailableQuizList />', () => {
	it('Should match the snapshot', () => {
		act(() => {
			const wrapper = shallow(
				<TestWrapper>
					<AvailableQuizList />)
				</TestWrapper>
			)
			expect(wrapper).toMatchSnapshot()
		})
	})
})

describe('<CompletedQuizList />', () => {
	it('Should match the snapshot', () => {
		act(() => {
			const wrapper = shallow(
				<TestWrapper>
					<CompletedQuizList />)
				</TestWrapper>
			)
			expect(wrapper).toMatchSnapshot()
		})
	})
})

describe('<CompletedUsers />', () => {
	it('Should match the snapshot', () => {
		act(() => {
			const wrapper = create(
				<TestWrapper>
					<CompletedUsers />)
				</TestWrapper>
			).toJSON()
			expect(wrapper).toMatchSnapshot()
		})
	})
})

describe('<OwnQuizList />', () => {
	it('Should match the snapshot', () => {
		act(() => {
			const wrapper = shallow(
				<TestWrapper>
					<OwnQuizList />)
				</TestWrapper>
			)
			expect(wrapper).toMatchSnapshot()
		})
	})
})

describe('<UserData />', () => {
	it('Should match the snapshot', () => {
		act(() => {
			const wrapper = shallow(
				<TestWrapper>
					<UserData />)
				</TestWrapper>
			)
			expect(wrapper).toMatchSnapshot()
		})
	})
})
