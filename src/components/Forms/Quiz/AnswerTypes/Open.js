import React from 'react'
import { FormControl, Box, IconButton } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons'
const Open = (props) => {
	const { answers, updateAnswers } = props

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
						<em>{a.text}</em>
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

export default Open
