import React from 'react'
import { withStyles } from '@material-ui/core'
import RegisterForm from '../../components/Forms/User/Register'

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
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(),
	},
	submit: {
		marginTop: theme.spacing(),
	},
})

const RegisterPage = (props) => {
	return <RegisterForm {...props} />
}

export default withStyles(styles)(RegisterPage)
