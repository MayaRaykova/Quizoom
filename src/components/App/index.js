import React, { useState, useEffect } from 'react'
import '../../styless.css'
import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/Login'
import Register from '../../pages/Register'
import Dashboard from '../Dashboard'
import QuizCreate from '../../pages/Quiz/Create'
import QuizQuestions from '../../pages/Quiz/Create/addQuestions'

import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Loader from '../Loader'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import auth from '../../services/userService'
import ProtectedRoute from '../ProtectedRoute'
import userService from '../../services/userService'
import UserContext from '../../Context'
import QuizProgress from '../../pages/Quiz/Progress'
import ErrorBoundary from '../ErrorBoundary'
import NotFoundPage from '../../pages/NotFound'

const App = () => {
	const [firebaseInitialized, setFirebaseInitialized] = useState(false)
	const [user, setUser] = useState({})
	const [quiz, setQuiz] = useState(emptyQuiz())
	const [quizSnapshot, setQuizSnapshot] = useState(emptyQuiz())

	function emptyQuiz() {
		return {
			id: '',
			title: '',
			description: '',
			duration: 300,
			isPublic: true,
			questions: [],
			completedBy: [],
		}
	}

	const updateUser = ({ userImg, userName, userEmail }) => {
		setUser(() => {
			const userId = userService.getCurrentUser().userId
			return {
				userName: userName || userService.getCurrentUser().userName,
				userImg: userImg || userService.getCurrentUser().userImg,
				userEmail: userEmail || userService.getCurrentUser().userEmail,
				userId,
			}
		})
	}
	const updateQuizSnapshot = (newState) => {
		if (!newState) {
			setQuizSnapshot(emptyQuiz())
			return
		}
		setQuizSnapshot(newState)
	}

	const updateQuiz = (newState) => {
		if (!newState) {
			setQuiz(emptyQuiz())
			return
		}
		setQuiz((current) => {
			return {
				...current,
				...newState,
			}
		})
	}

	useEffect(() => {
		auth.isInitialized().then((val) => {
			setFirebaseInitialized(val)
		})
	}, [])

	const theme = createTheme()

	return (
		<UserContext.Provider
			value={{
				user,
				quiz,
				quizSnapshot,
				updateUser,
				updateQuiz,
				updateQuizSnapshot,
			}}
		>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<BrowserRouter>
					{' '}
					{firebaseInitialized !== false ? (
						<ErrorBoundary>
							<Switch>
								<Route exact path='/' component={HomePage} />{' '}
								<Route exact path='/login' component={LoginPage} />{' '}
								<Route exact path='/register' component={Register} />{' '}
								<ProtectedRoute exact path='/dashboard' component={Dashboard} />{' '}
								<ProtectedRoute
									exact
									path='/quiz/edit'
									component={QuizCreate}
								/>{' '}
								<ProtectedRoute
									exact
									path='/quiz/edit/questions'
									component={QuizQuestions}
								/>{' '}
								<ProtectedRoute
									exact
									path='/quiz/progress/:id'
									component={QuizProgress}
								/>{' '}
								<Route path='*' exact={true} component={NotFoundPage} />{' '}
							</Switch>{' '}
						</ErrorBoundary>
					) : (
						<Loader />
					)}{' '}
				</BrowserRouter>{' '}
			</MuiThemeProvider>{' '}
		</UserContext.Provider>
	)
}

export default App
