import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

export default function SimpleMenu(props) {
	const { classes, disabled, handleQuestionTypeSelect } = props
	const [anchorEl, setAnchorEl] = React.useState(null)

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = (type) => {
		if (['single', 'multiple', 'open'].includes(type)) {
			handleQuestionTypeSelect(type)
		}
		setAnchorEl(null)
	}

	return (
		<div>
			<Button
				className={classes.green}
				color='primary'
				variant='outlined'
				onClick={handleClick}
				disabled={disabled}
			>
				Add Question
			</Button>
			<Menu
				id='new-question-type-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={() => handleClose('single')}>Single answer</MenuItem>
				<MenuItem onClick={() => handleClose('multiple')}>
					Multiple answers
				</MenuItem>
				<MenuItem onClick={() => handleClose('open')}>Open answer</MenuItem>
			</Menu>
		</div>
	)
}
