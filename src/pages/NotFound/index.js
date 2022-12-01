import React from 'react'
import { Paper, Avatar, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
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
	},
}))

const NotFound = () => {
	const classes = useStyles()
	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar} src='/logo.jpg' />
				<br />
				<Typography component='h1' variant='h5'>
					Content Not Found
				</Typography>
			</Paper>
		</main>
	)
}

export default NotFound
