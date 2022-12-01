import React, { useState, useContext } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import {
	Paper,
	Typography,
	FormControl,
	InputLabel,
	Input,
	Button,
	Checkbox,
	FormControlLabel,
	Box,
	TextField,
	InputAdornment,
	FormHelperText,
} from '@material-ui/core'
import UserContext from '../../../Context'
import Header from '../../../components/Header'

const styles = (theme) => ({
	main: {
		width: 'auto',
		display: 'block',
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		[theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(
			3
		)}px`,
	},
	avatar: {
		margin: theme.spacing(),
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		marginTop: theme.spacing(2),
		width: 130,
	},
})

const Quiz = (props) => {
	const {
		quiz: { title, description, isPublic, duration },
		updateQuiz,
	} = useContext(UserContext)

	const { classes, history } = props

	const [quizTitle, setTitle] = useState(title)
	const [quizDescription, setDescription] = useState(description)
	const [quizIsPublic, setPublic] = useState(isPublic)
	const [quizDuration, setQuizDuration] = useState(duration)
	const [validators, setValidators] = useState({
		title: '',
		description: '',
		duration: '',
	})

	const continueClickHandler = () => {
		if (validateForm()) {
			updateQuiz({
				title: quizTitle,
				description: quizDescription,
				isPublic: quizIsPublic,
				duration: quizDuration,
			})
			history.push('/quiz/edit/questions')
		}
	}

	const cancel = () => {
		if (history.length > 0) {
			history.goBack()
		} else {
			history.replace('/dashboard')
		}
	}

	return (
		<>
			<Header title={quizTitle} />
			<main className={classes.main}>
				<Paper className={classes.paper}>
					<Typography component='h1' variant='h5'>
						Enter Quiz details
					</Typography>
					<form
						className={classes.form}
						onSubmit={(e) => e.preventDefault() && false}
					>
						<FormControl margin='normal' required fullWidth>
							<InputLabel htmlFor='title'>Title</InputLabel>
							<Input
								id='title'
								name='title'
								autoComplete='off'
								autoFocus
								value={quizTitle}
								error={!!validators.title}
								onChange={(e) => setTitle(e.target.value)}
							/>
							<FormHelperText id='title-helper-text'>
								{validators.title}
							</FormHelperText>
						</FormControl>
						<FormControl margin='normal' required fullWidth>
							<InputLabel htmlFor='description'>Description</InputLabel>
							<Input
								id='description'
								name='descripion'
								autoComplete='off'
								multiline
								value={quizDescription}
								error={!!validators.description}
								onChange={(e) => setDescription(e.target.value)}
							/>
							<FormHelperText id='description-helper-text'>
								{validators.description}
							</FormHelperText>
						</FormControl>
						<Box
							display='flex'
							justifyContent='space-between'
							alignItems='flex-end'
							alignContent='flex-end'
							flexDirection='row'
						>
							<FormControl margin='normal' required fullWidth>
								<FormControlLabel
									control={
										<Checkbox
											checked={quizIsPublic}
											onChange={(e) => setPublic(e.target.checked)}
											name='is-public'
											color='primary'
										/>
									}
									label='Public'
								/>
							</FormControl>
							<FormControl margin='normal' required>
								<FormControlLabel
									control={
										<TextField
											type='number'
											name='quiz-duration'
											color='primary'
											InputProps={{
												inputProps: { min: 1 },
												startAdornment: (
													<InputAdornment position='start'>
														<AccessTimeIcon />
													</InputAdornment>
												),
											}}
											value={quizDuration / 60}
											error={!!validators.duration}
											onChange={(e) => setQuizDuration(e.target.value * 60)}
											label='Duration (min)'
										/>
									}
								/>
								<FormHelperText id='duration-helper-text'>
									{validators.duration}
								</FormHelperText>
							</FormControl>
						</Box>
						<Box
							display='flex'
							justifyContent='space-between'
							flexDirection='row'
							bgcolor='background.paper'
						>
							<Button
								type='submit'
								variant='contained'
								color='secondary'
								onClick={cancel}
								className={classes.submit}
							>
								Cancel
							</Button>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								onClick={continueClickHandler}
								className={classes.submit}
							>
								Continue
							</Button>
						</Box>
					</form>
				</Paper>
			</main>
		</>
	)

	function validateForm() {
		const errors = { title, description, duration }
		errors.title =
			!quizTitle || quizTitle.length < 3
				? 'Title must be at least 3 characters.'
				: ''

		errors.description =
			!quizDescription || quizDescription.length < 3
				? 'Description must be at least 3 characters.'
				: ''

		errors.duration =
			!quizDuration || quizDuration < 1
				? 'Duration must be at least one minute.'
				: ''

		setValidators(errors)

		return !Object.entries(errors).find(([k, v]) => v.length > 0)
	}
}

export default withStyles(styles)(Quiz)
