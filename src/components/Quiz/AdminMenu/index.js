import React, { useContext, useState, useEffect } from 'react'

import { Paper, Button, Box, makeStyles } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import Context from '../../../Context'
import quizService from '../../../services/quizService'
import { deepEqual } from '../../../utils'
import Green from '@material-ui/core/colors/green'
import ModalDialog from '../../shared/ModalDialog'
import QuestionTypesMenu from '../AdminMenu/QuestionTypesMenu'

const useStyles = makeStyles((theme) => ({
	green: {
		backgroundColor: Green[500],
		color: theme.palette.primary.contrastText,
		'&:hover': {
			color: theme.palette.primary.dark,
		},
		'&:disabled': {
			boxShadow: 'none',
			background: 'rgb(255, 255, 255)',
			color: 'rgba(0, 0, 0, 0.26)',
		},
	},
}))

const EditMenu = (props) => {
	const classes = useStyles()

	const { formHandler, isFormOpen, history } = props
	const { quiz, quizSnapshot } = useContext(Context)
	const [canSave, setCanSave] = useState(false)
	const [notSaved, setNotSaved] = useState(false)
	const [modalDialog, setModalDialog] = useState({
		title: '',
		message: '',
		open: false,
		handleYes: () => {},
		handleNo: () => {},
	})

	history.block(function ({ pathname }) {
		if (pathname.startsWith('/quiz/edit')) {
			return true
		}
		if (notSaved) {
			setModalDialog(() => {
				return {
					title: 'There are unsaved changes. Are you sure you want to leave?',
					open: true,
					handleYes: () => {
						setModalDialog({ open: false })
						setNotSaved(false)
						setTimeout(() => history.push(pathname), 0)
					},
					handleNo: () => {
						setModalDialog(() => ({
							open: false,
						}))
					},
				}
			})
			return false
		}
	})

	useEffect(() => {
		const errors = { questions: '' }

		errors.questions =
			!quiz?.questions || quiz.questions.length === 0
				? 'The Quiz must have at least one question.'
				: ''
		const hasNoErrors = !Object.entries(errors).find(([k, v]) => v.length > 0)
		const hasChanges = !deepEqual(quiz, quizSnapshot)
		setNotSaved(hasChanges)
		setCanSave(hasNoErrors && hasChanges && !isFormOpen)
	}, [isFormOpen, quiz, quizSnapshot])

	// const addQuestionHandler = () => {
	// 	formHandler(true, true)
	// }

	const saveQuizHandler = () => {
		setModalDialog(() => {
			return {
				title: 'Ready to save and go?',
				open: true,
				handleYes: () => {
					setModalDialog({ open: false })
					setNotSaved(false)
					setTimeout(() => {
						quizService.setQuiz(quiz)
						history.push('/dashboard')
					}, 0)
				},
				handleNo: () => {
					setModalDialog(() => ({
						open: false,
					}))
				},
			}
		})
	}

	const handleQuestionTypeSelect = (type) => {
		formHandler(true, type)
	}

	return (
		<>
			<Paper>
				<Box
					display='flex'
					justifyContent='space-between'
					flexDirection='row'
					p={1}
				>
					<Button
						color='primary'
						variant='outlined'
						component={Link}
						to='/quiz/edit'
					>
						Edit Details
					</Button>
					{/* <Button
						className={classes.green}
						color='primary'
						variant='outlined'
						onClick={addQuestionHandler}
					>
						Add Question
					</Button> */}
					<QuestionTypesMenu
						classes={classes}
						disabled={isFormOpen}
						handleQuestionTypeSelect={handleQuestionTypeSelect}
					/>
					<Button
						color='primary'
						variant={notSaved ? 'contained' : 'outlined'}
						onClick={saveQuizHandler}
						disabled={!canSave}
					>
						Save Quiz
					</Button>
				</Box>
			</Paper>
			<ModalDialog {...modalDialog} />
		</>
	)
}

export default withRouter(EditMenu)
