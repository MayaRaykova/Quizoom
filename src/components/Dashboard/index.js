import React from 'react'
import Header from '../Header'
import { Grid, Paper, withStyles, Box, Typography } from '@material-ui/core'
import UserData from './UserData'
import OwnQuizList from './OwnQuizList'
import AvalableQuizList from './AvailableQuizList'
import CompletedQuizList from './CompletedQuizList'

const styles = (theme) => ({
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
		margin: theme.spacing(1),
	},
	content: {
		minHeight: '85vh',
	},
})

const Profile = (props) => {
	const { classes } = props

	return (
		<>
			<Header />
			<Grid container>
				<Grid item xs={12} sm={6}>
					<Paper className={classes.paper}>
						<Box className={classes.content}>
							<UserData /> <br /> <hr />
							<Typography variant='h6'>Your Quizzes</Typography>
							<OwnQuizList />
							<br /> <hr />
							<Box>
								<Typography variant='h6'>Completed</Typography>
								<CompletedQuizList />
							</Box>
						</Box>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Paper className={classes.paper}>
						<Box className={classes.content}>
							<Typography variant='h6'>Available for you</Typography>
							<AvalableQuizList />
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</>
	)
}

export default withStyles(styles)(Profile)
