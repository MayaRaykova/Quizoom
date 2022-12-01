import React, { useState, useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import quizService from '../../services/quizService'
import { padZero } from '../../utils'
import Loader from '../Loader'
import {
	withStyles,
	Accordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
	Chip,
	Box,
	AccordionActions,
	Button,
} from '@material-ui/core'
import {
	ExpandMore,
	Public,
	VpnLock,
	DeleteForever,
	Settings,
	AccessTime,
} from '@material-ui/icons'
import ModalDialog from '../../components/shared/ModalDialog'
import Context from '../../Context'
import CompletedUsers from './CompletedUsers'

const styles = (theme) => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightMedium,
		marginLeft: theme.spacing(1),
	},
	label: {
		'& span': {
			color: theme.palette.text.primary,
		},
	},

	button: {
		minWidth: '100px',
	},
	duration: {
		display: 'inline-block',
		fontWeight: 'bold',
		margin: theme.spacing(0, 1, 0, 0),
		minWidth: '50px',
	},
})

const OwnQuizList = (props) => {
	const { classes } = props
	const [quizzes, setQuizzes] = useState([])
	const [loading, setLoading] = useState(true)
	const [expanded, setExpanded] = useState(false)
	const { updateQuiz, updateQuizSnapshot } = useContext(Context)

	const [modalDialog, setModalDialog] = useState({
		title: '',
		message: '',
		open: false,
		handleYes: () => {},
		handleNo: () => {},
	})

	const loadOwnQuizes = () => {
		quizService
			.getPersonal()
			.then((data) => {
				setQuizzes(data)
			})
			.finally(() => setLoading(false))
	}

	useEffect(() => {
		loadOwnQuizes()
	}, [])

	const renderChip = (isPublic) => {
		return isPublic ? (
			<Chip
				className={classes.label}
				variant='outlined'
				color='primary'
				size='small'
				icon={<Public />}
				label='public'
			/>
		) : (
			<Chip
				className={classes.label}
				variant='outlined'
				color='secondary'
				size='small'
				icon={<VpnLock />}
				label='private'
			/>
		)
	}

	const handleEditClick = (id) => {
		quizService.getById(id).then(({ data }) => {
			updateQuiz({ ...data, id })
			updateQuizSnapshot({ ...data, id })
			props.history.push('/quiz/edit/questions')
		})
	}

	const handleDeleteClick = (id) => {
		setModalDialog({
			title: 'Are you sure?',
			handleYes: () => {
				setModalDialog({ open: false })
				setLoading(true)
				quizService.deleteQuiz(id).finally(() => loadOwnQuizes())
			},
			handleNo: () => {
				setModalDialog({ open: false })
			},
			open: true,
		})
	}

	const handleChange = (panel) => (_, isExpanded) => {
		setExpanded(isExpanded ? panel : false)
	}

	const renderQuizzes = () => {
		return (
			<div className={classes.root}>
				{quizzes.length > 0 ? (
					quizzes.map((data) => {
						const { title, description, isPublic, duration, completedBy, id } =
							data
						const min = padZero(duration / 60)
						const sec = padZero(duration % 60)

						return (
							<Accordion
								key={id}
								expanded={expanded === id}
								onChange={handleChange(id)}
							>
								<AccordionSummary expandIcon={<ExpandMore />}>
									{renderChip(isPublic)}
									<Typography className={classes.heading}>{title}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Box display='flex' alignItems='center'>
										<AccessTime />
										&nbsp;
										<div className={classes.duration}>{`${min} : ${sec} `}</div>
										{description}
									</Box>
								</AccordionDetails>
								<AccordionActions>
									<Button
										data-cy={`delete-${title}`}
										size='small'
										variant='contained'
										color='secondary'
										className={classes.button}
										startIcon={<DeleteForever />}
										onClick={() => handleDeleteClick(id)}
									>
										Delete
									</Button>
									<Button
										size='small'
										variant='contained'
										color='primary'
										className={classes.button}
										startIcon={<Settings />}
										onClick={() => handleEditClick(id)}
									>
										Edit
									</Button>
								</AccordionActions>
								<Box display='flex' alignItems='center'>
									<CompletedUsers
										completedBy={completedBy}
										setModalDialog={setModalDialog}
										loadOwnQuizes={loadOwnQuizes}
										setLoading={setLoading}
										duration={duration}
										id={id}
									/>
								</Box>
							</Accordion>
						)
					})
				) : (
					<Typography variant='caption'>
						You haven't created quizzes yet
					</Typography>
				)}
				<ModalDialog {...modalDialog} />
			</div>
		)
	}

	return loading ? <Loader /> : renderQuizzes()
}

export default withRouter(withStyles(styles)(OwnQuizList))
