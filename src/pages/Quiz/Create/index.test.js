import React from 'react'
import { act } from 'react-test-renderer'
import { shallow } from 'enzyme'
import TestWrapper from '../../../utils/test-wrapper'
import AddQuestions from './AddQuestions'
import CreateQuiz from '.'

describe('<AddQuestions />', () => {
	it('Should match the snapshot', () => {
		act(() => {
			const wrapper = shallow(
				<TestWrapper>
					<AddQuestions />
				</TestWrapper>
			)

			expect(wrapper).toMatchSnapshot()
		})
	})
})

describe('<CreateQuiz />', () => {
	it('Should match the snapshot', () => {
		act(() => {
			const wrapper = shallow(
				<TestWrapper>
					<CreateQuiz />
				</TestWrapper>
			)

			expect(wrapper).toMatchSnapshot()
		})
	})
})
