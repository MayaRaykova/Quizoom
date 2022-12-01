import React from 'react'
import {
	FormControlLabel,
	Radio,
	FormControl,
	RadioGroup,
	Box,
	IconButton,
} from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons'

const Single = (props) => {
	const { answers, updateAnswers } = props

	const selectedValue = () => {
		for (const a of answers) {
			if (a.correct) {
				return a.text
			}
		}
		return ''
	}

	const handleRadioChange = (event) => {
		const updated = answers.map((a) => {
			a.correct = a.text === event.target.value
			return a
		})
		updateAnswers(updated)
	}

	const handleDeleteAnswer = (key) => {
		const updated = answers.filter((a) => a.text !== key).slice(0)
		updateAnswers(updated)
	}

	return (
		<FormControl fullWidth>
			<RadioGroup
				aria-label='quiz'
				name='quiz'
				value={selectedValue()}
				onChange={handleRadioChange}
			>
				{answers.map((a, i) => {
					return (
						<Box
							key={a.text}
							display='flex'
							justifyContent='space-between'
							flexDirection='row'
						>
							<FormControlLabel
								value={a.text}
								control={<Radio />}
								label={a.text}
							/>
							<IconButton
								data-cy={`delete-answer-${i}`}
								aria-label='delete'
								color='secondary'
								onClick={() => handleDeleteAnswer(a.text)}
							>
								<DeleteForever />
							</IconButton>
						</Box>
					)
				})}
			</RadioGroup>
		</FormControl>
	)
}

export default Single
