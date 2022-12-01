import React, { useContext, useState, useEffect } from 'react'
import { Paper, Typography, withStyles } from '@material-ui/core'
import SetQuestionForm from '../../Forms/Quiz/SetQuestion'
import Context from '../../../Context'
import Questions from './Questions'
import CustomPaginationActionsTable from './QuestionsTable'

const styles = (theme) => ({
	root: {
		marginTop: theme.spacing(2),
	},
})

const AdminContent = (props) => {
	const { classes, formOpen, formHandler, newQuestionType } = props

	const {
		quiz: { questions },
	} = useContext(Context)

	const [activeQuestionIndex, setActiveQuestion] = useState(-1)

	const [questionList, setQuestionList] = useState(questions.slice(0))

	const formClose = () => {
		setQuestionList(questions)
		formHandler(false)
		setActiveQuestion(-1)
	}

	const editQuestion = (i) => {
		setActiveQuestion(i)
		formHandler(true)
	}

	useEffect(() => {
		setQuestionList(questions)
	}, [questions])

	return (
		<>
			<Paper className={classes.root}>
				<Typography component='h1' variant='h6'>
					Questions
				</Typography>
				{/* <Questions
					questions={questionList}
					editQuestion={editQuestion}
					activeQuestionIndex={activeQuestionIndex}
				/> */}
				<CustomPaginationActionsTable
					questions={questionList}
					editQuestion={editQuestion}
					activeQuestionIndex={activeQuestionIndex}
				/>
			</Paper>
			{formOpen && (
				<SetQuestionForm
					formClose={formClose}
					activeQuestionIndex={activeQuestionIndex}
					newQuestionType={newQuestionType}
				/>
			)}
		</>
	)
}

export default withStyles(styles)(AdminContent)
