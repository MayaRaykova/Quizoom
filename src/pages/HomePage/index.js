import React, { useEffect } from 'react'
import { Typography, Paper, Avatar, Button } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import userService from '../../services/userService'

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
		margin: theme.spacing(2),
		backgroundColor: theme.palette.secondary.main,
		width: theme.spacing(7),
		height: theme.spacing(7),
		border: '0',
	},
	submit: {
		marginTop: theme.spacing(3),
	},
})

function HomePage(props) {
	const { classes } = props
	useEffect(() => {
		if (userService.getCurrentUser()) {
			props.history.replace('/dashboard')
		}
	}, [props.history])

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar} src='/logo.jpg' />
				<Typography component='h1' variant='h5'>
					Welcome to Quizoom
				</Typography>
				<Button
					type='submit'
					fullWidth
					variant='contained'
					color='primary'
					component={Link}
					to='/register'
					className={classes.submit}
				>
					Register
				</Button>
				<Button
					type='submit'
					fullWidth
					variant='contained'
					color='primary'
					component={Link}
					to='/login'
					className={classes.submit}
				>
					Login
				</Button>
			</Paper>
		</main>
	)
}

export default withStyles(styles)(HomePage)
