import React, { useState, useEffect, Fragment } from 'react'

import {
	Paper,
	Box,
	RadioGroup,
	Radio,
	Typography,
	FormControlLabel,
	Container,
	FormControl,
	FormLabel,
	Checkbox,
	TextField,
} from '@material-ui/core'

const QuizActiveBody = (props) => {
	const { handleAnswer, question } = props
	const [answers, setAnswers] = useState([])

	const handleRadioChange = (event) => {
		handleAnswer(event.target.value.trim())
	}

	const handleCheckboxChange = (event) => {
		handleAnswer(event.target.value, !event.target.checked)
	}

	const handleInputChange = (event) => {
		handleAnswer(event.target.value)
	}

	useEffect(() => {
		setAnswers(question?.answers || [])
	}, [question])

	return (
		<Fragment>
			<Container>
				<Paper>
					<Box m={2} px={3} py={2} display='flex'>
						<Typography variant='h6'>{question?.question}</Typography>
					</Box>
				</Paper>
			</Container>
			<Container>
				<Paper>
					<Box
						display='flex'
						flexDirection='column'
						alignItems='flex-start'
						px={5}
						py={2}
					>
						<FormControl fullWidth component='fieldset'>
							<FormLabel component='legend'></FormLabel>
							{question.type === 'multiple' &&
								answers.map((a) => (
									<FormControlLabel
										key={a.text}
										value={a.text}
										control={
											<Checkbox
												color='primary'
												onChange={handleCheckboxChange}
												checked={
													question.userAnswers &&
													question.userAnswers.length > 0
														? question.userAnswers.includes(a.text)
														: false
												}
											/>
										}
										label={a.text}
									/>
								))}
							{question.type === 'open' && (
								<TextField
									id='user-answer'
									label='Your answer'
									onChange={handleInputChange}
									value={
										question.userAnswers && question.userAnswers.length > 0
											? question.userAnswers[0]
											: ''
									}
								/>
							)}
							{(question.type === 'single' || !question?.type) && (
								<RadioGroup
									value={
										question.userAnswers && question.userAnswers.length > 0
											? question.userAnswers[0]
											: ''
									}
									onChange={handleRadioChange}
								>
									{answers.map((a) => (
										<FormControlLabel
											key={a.text}
											value={a.text}
											control={<Radio color='primary' />}
											label={a.text}
										/>
									))}
								</RadioGroup>
							)}
						</FormControl>
					</Box>
				</Paper>
			</Container>
		</Fragment>
	)
}

export default QuizActiveBody
