import React, { useContext, useState } from 'react'
import Header from '../../../components/Header'
import Context from '../../../Context'
import { Redirect } from 'react-router-dom'
import AdminMenu from '../../../components/Quiz/AdminMenu'
import Container from '@material-ui/core/Container'
import AdminContent from '../../../components/Quiz/AdminContent'

const AddQuestions = () => {
	const {
		quiz: { title },
	} = useContext(Context)

	const [isFormOpen, setFormOpen] = useState(false)
	const [newQuestionType, setNewQuestionType] = useState(null)

	const formHandler = (isFormOpen, newQuestionType) => {
		setNewQuestionType(newQuestionType)
		setFormOpen(isFormOpen)
	}

	if (title) {
		return (
			<>
				<Header title={title} />
				<Container>
					<AdminMenu formHandler={formHandler} isFormOpen={isFormOpen} />
					<AdminContent
						formOpen={isFormOpen}
						formHandler={formHandler}
						newQuestionType={newQuestionType}
					/>
				</Container>
			</>
		)
	}

	return <Redirect to='/dashboard' />
}

export default AddQuestions
