import React from 'react'
import {
	FormControlLabel,
	FormControl,
	Checkbox,
	Box,
	IconButton,
} from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons'

const Multiple = (props) => {
	const { answers, updateAnswers } = props

	const handleCheckboxChange = (event) => {
		const updated = answers.map((a) => {
			if (a.text === event.target.value) {
				a.correct = event.target.checked
			}
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
							control={
								<Checkbox
									color='primary'
									onChange={handleCheckboxChange}
									checked={a.correct}
								/>
							}
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
		</FormControl>
	)
}

export default Multiple
