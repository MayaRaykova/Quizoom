import React from 'react'
import {
	List,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	Tooltip,
} from '@material-ui/core'
import { Edit } from '@material-ui/icons'

const Questions = (props) => {
	const { questions, editQuestion, activeQuestionIndex } = props

	return (
		<List>
			{questions.map(({ question }, i) => {
				const styles = i === activeQuestionIndex ? { display: 'none' } : {}
				return (
					<div style={styles} key={question}>
						<ListItem>
							<ListItemText primary={question} />
							<ListItemSecondaryAction>
								<Tooltip title='Edit question and answers' placement='left'>
									<IconButton
										edge='end'
										aria-label='edit'
										color='primary'
										onClick={() => editQuestion(i)}
									>
										<Edit />
									</IconButton>
								</Tooltip>
							</ListItemSecondaryAction>
						</ListItem>
					</div>
				)
			})}
		</List>
	)
}

export default Questions
