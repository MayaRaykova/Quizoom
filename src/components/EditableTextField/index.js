import React, { useState, useEffect, createRef } from 'react'
import { Tooltip, withStyles, TextField } from '@material-ui/core'

const styles = (theme) => ({
	userName: {
		fontSize: '1rem',
	},
})

const EditableTextField = (props) => {
	const { text, callback, classes } = props

	const [isInEditMode, setEdiMode] = useState(false)
	const [newText, setNewtext] = useState(text)

	const textInput = createRef()

	const chageToEditMode = () => {
		setEdiMode(true)
	}

	const saveText = () => {
		if (callback && newText !== text) {
			callback(newText)
		}
		setEdiMode(false)
	}

	useEffect(() => {
		setNewtext(text)
	}, [text])

	useEffect(() => {
		if (textInput.current) {
			textInput.current.focus()
		}
	}, [textInput])

	const renderEditView = () => {
		return (
			<div>
				<TextField
					onChange={(e) => setNewtext(e.target.value)}
					onBlur={saveText}
					value={newText}
					ref={textInput}
					autoFocus
				/>
			</div>
		)
	}

	const renderDefaultView = () => (
		<Tooltip placement='bottom-start' title='Double click to edit'>
			<div className={classes.userName} onDoubleClick={chageToEditMode}>
				{newText}
			</div>
		</Tooltip>
	)

	return isInEditMode ? renderEditView() : renderDefaultView()
}

export default withStyles(styles)(EditableTextField)
