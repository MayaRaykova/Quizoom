import React, { useState } from 'react'
import {
	Typography,
	Paper,
	Avatar,
	Button,
	FormControl,
	Input,
	InputLabel,
	FormHelperText,
} from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import userService from '../../../services/userService'
import { withSnackbar } from 'notistack'

function Register(props) {
	const { classes } = props

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repassword, setRepassword] = useState('')

	const [validators, setValidators] = useState({
		name,
		email,
		password,
		repassword,
	})

	const validEmailRegex = RegExp(
		/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
	)

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar} src='/logo.jpg'></Avatar>
				<Typography component='h1' variant='h5'>
					Register Account
				</Typography>
				<form
					className={classes.form}
					onSubmit={(e) => e.preventDefault() && false}
				>
					<FormControl margin='normal' required fullWidth>
						<InputLabel htmlFor='name'>Name</InputLabel>
						<Input
							id='name'
							name='name'
							error={!!validators.name}
							autoComplete='off'
							autoFocus
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<FormHelperText id='name-helper-text'>
							{validators.name}
						</FormHelperText>
					</FormControl>
					<FormControl margin='normal' required fullWidth>
						<InputLabel htmlFor='email'>Email Address</InputLabel>
						<Input
							id='email'
							name='email'
							error={!!validators.email}
							autoComplete='off'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<FormHelperText id='name-helper-text'>
							{validators.email}
						</FormHelperText>
					</FormControl>
					<FormControl margin='normal' required fullWidth>
						<InputLabel htmlFor='password'>Password</InputLabel>
						<Input
							name='password'
							type='password'
							id='password'
							autoComplete='off'
							value={password}
							error={!!validators.password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<FormHelperText id='name-helper-text'>
							{validators.password}
						</FormHelperText>
					</FormControl>
					<FormControl margin='normal' required fullWidth>
						<InputLabel htmlFor='password'>Confirm Password</InputLabel>
						<Input
							name='repassword'
							type='password'
							id='repassword'
							autoComplete='off'
							value={repassword}
							error={!!validators.repassword}
							onChange={(e) => setRepassword(e.target.value)}
						/>
						<FormHelperText id='name-helper-text'>
							{validators.repassword}
						</FormHelperText>
					</FormControl>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						onClick={onRegister}
						className={classes.submit}
					>
						Register
					</Button>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='secondary'
						component={Link}
						to='/login'
						className={classes.submit}
					>
						Login
					</Button>
				</form>
			</Paper>
		</main>
	)

	function validateForm() {
		const errors = { name, email, password, repassword }
		errors.name =
			!name || name.length < 3 ? 'Name must be at least 3 characters.' : ''

		errors.email = validEmailRegex.test(email)
			? ''
			: 'Email address is invalid.'

		errors.password =
			password.length < 6 ? 'Password must be at least 6 characters.' : ''

		errors.repassword =
			!errors.password && password !== repassword
				? 'Passwords does not match.'
				: ''

		setValidators(errors)

		return !Object.entries(errors).find(([, v]) => v.length > 0)
	}

	async function onRegister() {
		if (validateForm()) {
			try {
				await userService.register(name, email, password)
				props.history.replace('/dashboard')
			} catch (e) {
				const message =
					e?.code === 'auth/email-already-in-use'
						? 'Email is already registered'
						: 'Registraion failed'
				props.enqueueSnackbar(message, {
					variant: 'error',
				})
			}
		}
	}
}

export { Register }
export default withSnackbar(withRouter(Register))
