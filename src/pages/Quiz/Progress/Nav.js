import React from 'react'

import {
	Paper,
	Box,
	Button,
	ButtonGroup,
	createTheme,
	ThemeProvider,
	Container,
	Grid,
} from '@material-ui/core'
import { green } from '@material-ui/core/colors'

const QuizNav = ({ questions, changeQuestion, handleEndQuizClick }) => {
	const handleClick = (e, i) => {
		changeQuestion(i)
	}
	const theme = createTheme({
		palette: {
			primary: {
				main: green[500],
				contrastText: '#fff',
			},
		},
	})

	return (
		<ThemeProvider theme={theme}>
			<Container>
				<Paper>
					<Grid container>
						<Grid item xs={10}>
							<Box
								display='flex'
								justifyContent='space-around'
								flexDirection='row'
								p={3}
							>
								<ButtonGroup
									disableElevation
									variant='outlined'
									color='primary'
								>
									{questions.map((n, i) => (
										<Button
											key={i}
											variant={
												n.userAnswers && n.userAnswers.length > 0
													? 'contained'
													: 'outlined'
											}
											onClick={(e) => handleClick(e, i)}
										>
											{i + 1}
										</Button>
									))}
								</ButtonGroup>
							</Box>
						</Grid>
						<Grid item xs={2}>
							<Box
								display='flex'
								justifyContent='space-around'
								flexDirection='row'
								p={3}
							>
								<Button
									variant='contained'
									color='primary'
									onClick={handleEndQuizClick}
								>
									End
								</Button>
							</Box>
						</Grid>
					</Grid>
				</Paper>
			</Container>
		</ThemeProvider>
	)
}

export default QuizNav
