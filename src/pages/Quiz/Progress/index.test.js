import React from 'react'
import { act, create } from 'react-test-renderer'
import TestWrapper from '../../../utils/test-wrapper'
import Progress from '.'
import Body from './Body'
import Nav from './Nav'
import QuizActive from './QuizActive'
import QuizResult from './QuizResult'
import userService from '../../../services/userService'

import { shallow } from 'enzyme'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useLayoutEffect: jest.requireActual('react').useEffect,
}))

describe('<Progress />', () => {
	it('Should match the snapshot', () => {
		jest.spyOn(React, 'useEffect').mockImplementation((f) => f())
		jest.spyOn(userService, 'getCurrentUser').mockImplementation(() => {
			return {}
		})

		act(() => {
			const match = { params: { id: 1 }, isExact: true, path: '', url: '' }

			const wrapper = shallow(
				<TestWrapper>
					<Progress match={match} />
				</TestWrapper>
			)
			expect(wrapper).toMatchSnapshot()
		})
	})
})

describe('<Body />', () => {
	it('Should match the snapshot', () => {
		act(() => {
			const wrapper = create(
				<TestWrapper>
					<Body question={{}} />
				</TestWrapper>
			).toJSON()
			expect(wrapper).toMatchSnapshot()
		})
	})
})

describe('<Nav />', () => {
	it('Should match the snapshot', () => {
		act(() => {
			const wrapper = create(
				<TestWrapper>
					<Nav questions={[]} />
				</TestWrapper>
			).toJSON()
			expect(wrapper).toMatchSnapshot()
		})
	})
})

describe('<QuizActive />', () => {
	it('Should match the snapshot', () => {
		act(() => {
			const wrapper = create(
				<TestWrapper>
					<QuizActive quiz={{ data: { questions: [{ userAnswers: [] }] } }} />
				</TestWrapper>
			).toJSON()
			expect(wrapper).toMatchSnapshot()
		})
	})
})

describe('<QuizResult />', () => {
	it('Should match the snapshot', () => {
		act(() => {
			const wrapper = create(
				<TestWrapper>
					<QuizResult />
				</TestWrapper>
			).toJSON()
			expect(wrapper).toMatchSnapshot()
		})
	})
})
