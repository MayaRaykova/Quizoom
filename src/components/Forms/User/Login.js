import React, { useState, useContext } from 'react'
import {
	Typography,
	Paper,
	Avatar,
	Button,
	FormControl,
	Input,
	InputLabel,
} from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import userService from '../../../services/userService'
import Loader from '../../Loader'
import Context from '../../../Context'
import { withSnackbar } from 'notistack'

const SignIn = (props) => {
	const { classes } = props
	const { updateUser } = useContext(Context)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	return loading ? (
		<Loader />
	) : (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar} src='/logo.jpg' />
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<form
					className={classes.form}
					onSubmit={(e) => e.preventDefault() && false}
				>
					<FormControl margin='normal' required fullWidth>
						<InputLabel htmlFor='email'>Email Address</InputLabel>
						<Input
							id='email'
							name='email'
							autoComplete='off'
							autoFocus
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormControl>
					<FormControl margin='normal' required fullWidth>
						<InputLabel htmlFor='password'>Password</InputLabel>
						<Input
							name='password'
							type='password'
							id='password'
							autoComplete='off'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormControl>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						onClick={login}
						className={classes.submit}
					>
						Sign in
					</Button>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='secondary'
						component={Link}
						to='/register'
						className={classes.submit}
					>
						Register
					</Button>
				</form>
			</Paper>
		</main>
	)

	async function login() {
		setLoading(true)
		userService
			.login(email, password)
			.then(() => {
				updateUser(userService.getCurrentUser())
				setLoading(false)
				props.history.replace('/dashboard')
			})
			.catch(() => {
				props.enqueueSnackbar('Login failed', {
					variant: 'error',
				})
			})
			.finally(() => {
				setLoading(false)
			})
	}
}
export { SignIn }
export default withSnackbar(withRouter(SignIn))
