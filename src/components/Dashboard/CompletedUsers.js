import React from 'react'
import {
	Chip,
	Avatar,
	withStyles,
	Tooltip,
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
	makeStyles,
} from '@material-ui/core'
import quizService from '../../services/quizService'
import { timeOptions } from '../../utils'
import { ExpandMore } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightMedium,
		marginLeft: theme.spacing(1),
	},
	head: {
		fontWeight: theme.typography.fontWeightMedium,
		backgroundColor: 'rgba(192,192,192,0.1)',
	},
}))

const HtmlTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid #dadde9',
	},
}))(Tooltip)

const CompleteUser = (props) => {
	const classes = useStyles()
	const {
		setModalDialog,
		setLoading,
		loadOwnQuizes,
		completedBy,
		duration,
		id,
	} = props
	const handleReleaseComplete = (qid, uid, arr) => {
		setModalDialog({
			title: 'Are you sure?',
			message:
				'This will allow that person to try the quiz again. But will remove it from that list.',
			handleYes: () => {
				setModalDialog({ open: false })
				setLoading(true)
				quizService.releaseQuiz(
					qid,
					arr.filter((u) => u.uid !== uid)
				)
				loadOwnQuizes()
			},
			handleNo: () => {
				setModalDialog({ open: false })
			},
			open: true,
		})
	}

	return (
		<>
			{completedBy && completedBy.length > 0 && (
				<Accordion elevation={0} className={classes.root}>
					<AccordionSummary
						expandIcon={<ExpandMore />}
						className={classes.head}
					>
						<Typography className={classes.heading}>Completed by</Typography>
					</AccordionSummary>
					<AccordionDetails>
						{completedBy.map((p) => {
							const { correct, passedAt, timeLeft, total } = p.result

							const min = parseInt((duration - timeLeft) / 60, 10)
							const sec = parseInt((duration - timeLeft) % 60, 10)

							return (
								<HtmlTooltip
									key={p.uid}
									title={
										<>
											<em>
												{passedAt
													.toDate()
													.toLocaleDateString('en', timeOptions)}
											</em>
											<br />
											<em>Result:</em>&nbsp;
											<b>{`${correct}/${total}`}</b>
											<br />
											<em>Time:</em>&nbsp;
											<b>{`${min}:${sec}`}</b>
										</>
									}
								>
									<Chip
										avatar={<Avatar alt={p.email} src={p.photo} />}
										label={p.email}
										onDelete={() =>
											handleReleaseComplete(id, p.uid, completedBy.slice(0))
										}
										variant='outlined'
										color='primary'
									/>
								</HtmlTooltip>
							)
						})}
					</AccordionDetails>
				</Accordion>
			)}
		</>
	)
}

export default CompleteUser
