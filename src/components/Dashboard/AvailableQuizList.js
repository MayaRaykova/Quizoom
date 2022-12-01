import React, { useEffect, useState } from 'react'
import quizService from '../../services/quizService'
import {
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Typography,
	makeStyles,
} from '@material-ui/core'
import Loader from '../Loader'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
	inline: {
		display: 'inline',
	},
}))

const AvalableQuizList = (props) => {
	const classes = useStyles()

	const { history } = props
	const [quizzes, setQuizzes] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		quizService
			.getAvailable()
			.then((data) => {
				setQuizzes(data)
			})
			.finally(() => setLoading(false))
	}, [])

	const handleQuizClick = (id) => {
		history.push(`/quiz/progress/${btoa(id)}`)
	}

	const renderQuizList = () => {
		if (!quizzes || quizzes.length === 0) {
			return (
				<Typography variant='caption'>
					There are no quizzes available for you so far
				</Typography>
			)
		}
		return (
			<List>
				{quizzes.map((data) => (
					<ListItem
						key={data.id}
						alignItems='flex-start'
						dense
						button
						onClick={() => handleQuizClick(data.id)}
					>
						<ListItemAvatar>
							<Avatar alt='author' src={data.authorImg}></Avatar>
						</ListItemAvatar>
						<ListItemText
							color='textPrimary'
							primary={data.title}
							secondary={
								<Typography>
									<Typography
										component='span'
										variant='body2'
										className={classes.inline}
										color='textPrimary'
									>
										{`${data.duration / 60} min.`}
									</Typography>
									{` — ${data.description}`}
								</Typography>
							}
						></ListItemText>
					</ListItem>
				))}
			</List>
		)
	}

	return loading ? <Loader /> : renderQuizList()
}

export default withRouter(AvalableQuizList)
