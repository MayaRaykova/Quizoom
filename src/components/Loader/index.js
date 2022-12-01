import React from 'react'
import { Paper, withStyles, CircularProgress } from '@material-ui/core'

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
		justifyContent: 'center',
		height: 200,
	},
	loader: {
		color: theme.palette.primary.light,
	},
})

const Loader = (props) => {
	const { classes } = props
	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<CircularProgress className={classes.loader} disableShrink size={100} />
			</Paper>
		</main>
	)
}

export default withStyles(styles)(Loader)
