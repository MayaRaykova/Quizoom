import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { Button, Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}))

export default function ModalDialog(props) {
	const { open, handleYes, handleNo, title, message } = props

	const classes = useStyles()

	return (
		<div>
			<Modal
				aria-labelledby='modal-dialog-title'
				aria-describedby='modal-dialog-description'
				className={classes.modal}
				open={open}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
				disableEscapeKeyDown
				onClose={(event, reason) => {
					if (reason === 'backdropClick') {
						return false
					}
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<h2 id='modal-dialog-title'>{title}</h2>
						<p
							id='modal-dialog-description'
							dangerouslySetInnerHTML={{ __html: message }}
						></p>

						<Box display='flex' mt={2} justifyContent='space-around'>
							<Button autoFocus onClick={() => handleNo()} color='primary'>
								Cancel
							</Button>
							<Button onClick={() => handleYes()} color='primary'>
								Ok
							</Button>
						</Box>
					</div>
				</Fade>
			</Modal>
		</div>
	)
}
