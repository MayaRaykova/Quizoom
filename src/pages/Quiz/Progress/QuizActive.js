import React, { Fragment, useState } from 'react'

import QuizNav from './Nav'
import QuizActiveBody from './Body'

const QuizActive = (props) => {
	const {
		quiz: {
			data: { questions },
		},
		handleEndQuizClick,
	} = props

	const [active, setActiveQuestion] = useState(0)

	const handleAnswer = (a, remove) => {
		const question = questions[active]

		if (!question?.userAnswers) {
			question.userAnswers = []
		}

		if (question.type === 'multiple') {
			const set = new Set(question.userAnswers)
			remove ? set.delete(a) : set.add(a)
			question.userAnswers = Array.from(set)
		} else {
			if (a.trim() === '') question.userAnswers = []
			else question.userAnswers = [a]
		}
		console.log(question.userAnswers)
	}

	const changeQuestion = (i) => {
		setActiveQuestion(i)
	}

	return (
		<Fragment>
			<QuizNav
				questions={questions}
				changeQuestion={changeQuestion}
				handleEndQuizClick={handleEndQuizClick}
			/>
			<QuizActiveBody
				question={questions[active]}
				handleAnswer={handleAnswer}
			/>
		</Fragment>
	)
}

export default QuizActive
