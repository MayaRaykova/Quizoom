import React, { Fragment, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Header from '../../../components/Header'
import {
	Button,
	Paper,
	Typography,
	Box,
	ThemeProvider,
	createTheme,
	Container,
	makeStyles,
} from '@material-ui/core'
import Loader from '../../../components/Loader'
import { green } from '@material-ui/core/colors'
import QuizActive from './QuizActive'
import ModalDialog from '../../../components/shared/ModalDialog'
import QuizRezult from './QuizResult'
import { processQuizResult } from '../../../utils'

import quizService from '../../../services/quizService'

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
}))
const QuizProgress = (props) => {
	const classes = useStyles()
	const {
		match: {
			params: { id },
		},
		history,
	} = props

	const [quiz, setQuiz] = useState({})
	const [loading, setLoading] = useState(false)
	const [start, setStart] = useState(false)
	const [timeLeft, setTimeLeft] = useState(0)
	const [quizResult, setQuizResult] = useState(null)

	const [modalDialog, setModalDialog] = useState({
		title: '',
		message: '',
		open: false,
		handleYes: () => {},
		handleNo: () => {},
	})

	// useEffect(() => {
	// 	// Prompt confirmation when reload page is triggered
	// 	window.onbeforeunload = () => {
	// 		return ''
	// 	}

	// 	// Unmount the window.onbeforeunload event
	// 	return () => {
	// 		window.onbeforeunload = null
	// 	}
	// }, [])

	useEffect(() => {
		setLoading(true)

		quizService
			.getAvailable()
			.then((data) => {
				const quiz = data.find((q) => q.id === atob(id))
				if (quiz) {
					setQuiz({ id: quiz.id, data: quiz })
					setTimer((t) => {
						return { ...t, duration: quiz.duration }
					})
				}
			})
			.finally(() => setLoading(false))
	}, [id])

	const finishQuiz = () => {
		setStart(false)
		setTimer(() => {
			setQuizResult(() => {
				const result = processQuizResult(quiz)
				quizService.completeQuiz({
					quiz,
					correct: result[0],
					total: result[1],
					timeLeft,
					passedAt: new Date(),
				})
				return result
			})
			return {
				start: false,
				duration: timeLeft,
			}
		})
	}

	const buildEndQuizConfirmationDialog = () => ({
		title: 'Are you ready to end the quiz?',
		message: 'You will not be able to continue.',
		open: true,
		handleYes: () => {
			setModalDialog({ open: false })
			finishQuiz()
		},
		handleNo: () => {
			setModalDialog({ open: false })
		},
	})

	history.block(function () {
		if (start) {
			setModalDialog(buildEndQuizConfirmationDialog())
			return false
		}
	})

	const handleEndQuizClick = () => {
		setModalDialog(buildEndQuizConfirmationDialog())
	}

	const [timer, setTimer] = useState({
		duration: 0,
		start: false,
		complete: () => {},
		progress: () => {},
	})

	const handleQuizStartClick = () => {
		setModalDialog({
			title: 'Are you ready to start?',
			message: '',
			open: true,
			handleYes: () => {
				setModalDialog({ open: false })
				setStart(true)

				setTimer(() => ({
					duration: quiz?.data.duration,
					start: true,
					complete: () => {
						finishQuiz()
					},
					progress: (s) => {
						setTimeLeft(s)
					},
				}))
			},
			handleNo: () => {
				setModalDialog({ open: false })
			},
		})
	}

	const theme = createTheme({
		palette: {
			primary: {
				main: green[500],
				contrastText: '#fff',
			},
		},
	})

	const renderQuizResult = () => {
		if (!quizResult) {
			return
		}
		const [correct, total] = quizResult

		return (
			<QuizRezult
				correct={correct}
				total={total}
				duration={quiz?.data.duration - timer.duration}
			/>
		)
	}

	const renderButtonStart = () => (
		<ThemeProvider theme={theme}>
			<Box display='flex' py={2} flexDirection='row' justifyContent='center'>
				<Button
					className={classes.button}
					variant='contained'
					color='secondary'
					onClick={() => {
						history.goBack()
					}}
				>
					Back
				</Button>
				<Button
					className={classes.button}
					variant='contained'
					color='primary'
					onClick={handleQuizStartClick}
				>
					Start
				</Button>
			</Box>
		</ThemeProvider>
	)

	const renderQuizIntro = () => {
		const { data } = quiz

		if (start) {
			return <QuizActive quiz={quiz} handleEndQuizClick={handleEndQuizClick} />
		}

		if (Object.keys(quiz).length === 0) {
			return (
				<Container>
					<Paper>
						<Box
							display='flex'
							my={3}
							py={2}
							flexDirection='row'
							justifyContent='center'
						>
							<Typography component='h4' variant='h5'>
								This quiz is not available to you.
							</Typography>
						</Box>
						<Box
							display='flex'
							py={2}
							flexDirection='row'
							justifyContent='center'
						>
							<Typography>Please contact the author</Typography>
						</Box>
					</Paper>
				</Container>
			)
		}

		return (
			<Container>
				<Paper>
					<Box
						display='flex'
						my={3}
						py={2}
						flexDirection='row'
						justifyContent='center'
					>
						<Typography component='h1' variant='h4'>
							{data?.title}
						</Typography>
					</Box>
					<Box
						display='flex'
						py={2}
						flexDirection='row'
						justifyContent='center'
					>
						<Typography>{data?.description}</Typography>
					</Box>
				</Paper>
				{quizResult ? renderQuizResult() : renderButtonStart()}
			</Container>
		)
	}

	return (
		<Fragment>
			<Header timer={timer} />
			<ModalDialog {...modalDialog} />
			{loading ? <Loader /> : renderQuizIntro()}
		</Fragment>
	)
}

export default withRouter(QuizProgress)
