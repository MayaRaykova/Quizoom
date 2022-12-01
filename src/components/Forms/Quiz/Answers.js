import React from 'react'
import Single from './AnswerTypes/Single'
import Multiple from './AnswerTypes/Multiple'
import Open from './AnswerTypes/Open'

const Answers = (props) => {
	const { answers, questionType, updateAnswers } = props

	return (
		<>
			{questionType === 'single' && (
				<Single answers={answers} updateAnswers={updateAnswers} />
			)}
			{questionType === 'multiple' && (
				<Multiple answers={answers} updateAnswers={updateAnswers} />
			)}
			{questionType === 'open' && (
				<Open answers={answers} updateAnswers={updateAnswers} />
			)}
		</>
	)
}

export default Answers
