import React from 'react'
import { Paper, Box, Typography } from '@material-ui/core'
import { padZero } from '../../../utils'

const QuizRezult = (props) => {
	const { correct, total, duration } = props
	const minutes = padZero(parseInt(duration / 60, 10))
	const seconds = padZero(parseInt(duration % 60, 10))
	return (
		<Paper>
			<Box
				display='flex'
				my={3}
				py={2}
				flexDirection='column'
				justifyContent='center'
			>
				<Box display='flex' py={2} flexDirection='row' justifyContent='center'>
					<h5>Your score is</h5>
				</Box>

				<Box display='flex' py={2} flexDirection='row' justifyContent='center'>
					<h1>{`${correct} / ${total}`}</h1>
				</Box>
			</Box>
			<Box display='flex' pb={2} flexDirection='row' justifyContent='center'>
				<Typography>{`You pass it in: ${minutes} : ${seconds}`}</Typography>
			</Box>
		</Paper>
	)
}

export default QuizRezult
