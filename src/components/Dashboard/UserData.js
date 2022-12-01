import React, { useContext, createRef, useState, useEffect } from 'react'
import {
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	Divider,
	ListItemText,
	CircularProgress,
	Tooltip,
	Avatar,
	withStyles,
	Link,
} from '@material-ui/core'
import { PersonRounded, EmailRounded } from '@material-ui/icons'
import EditableTextField from '../EditableTextField'
import UserContext from '../../Context'
import userService from '../../services/userService'

const styles = (theme) => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	avatar: {
		width: theme.spacing(15),
		height: theme.spacing(15),
		cursor: 'pointer',
	},
	file: {
		opacity: '0%',
		position: 'absolute',
	},
})

const UserData = (props) => {
	const { classes } = props
	const { updateUser } = useContext(UserContext)
	const [userName, setUserName] = useState('')
	const [userImg, setUserImg] = useState('')
	const [userEmail, setUserEmail] = useState('')

	useEffect(() => {
		setUserImg(userService.getCurrentUser().userImg)
		setUserName(userService.getCurrentUser().userName)
		setUserEmail(userService.getCurrentUser().userEmail)
	}, [])

	const fileRef = createRef()

	const imageHandler = (event) => {
		if (event.target.files.length === 0) {
			return
		}
		const imageFile = event.target.files[0]
		const reader = new FileReader()

		reader.onload = () => {
			if (reader.readyState === 2) {
				setUserImg(reader.result)
				updateUser({
					userImg: reader.result,
				})
				userService.addImage(imageFile)
			}
		}

		reader.readAsDataURL(imageFile)
	}

	const triggerInputFile = () => {
		if (fileRef.current !== undefined && fileRef.current.click !== undefined) {
			fileRef.current.click()
		}
	}

	const saveName = (newName) => {
		updateUser({ userName: newName })
		userService.updateName(newName)
	}
	return (
		<Grid container>
			<Grid item xs={4} md={3} lg={2}>
				{userImg ? (
					<Tooltip
						title={
							<>
								Is that you? <br />
								Click to change the picture.
							</>
						}
					>
						<Avatar
							className={classes.avatar}
							alt={userName}
							src={userImg}
							onClick={triggerInputFile}
						/>
					</Tooltip>
				) : (
					<CircularProgress />
				)}
				<input
					id='img-input'
					accept='image/*'
					type='file'
					className={classes.file}
					onChange={imageHandler}
					ref={fileRef}
				/>
			</Grid>
			<Grid item xs={8} md={9} lg={10}>
				<List className={classes.root}>
					<ListItem>
						<ListItemAvatar>
							<PersonRounded color='primary' />
						</ListItemAvatar>
						<EditableTextField text={userName} callback={saveName} />
					</ListItem>
					<Divider />
					<Link href={`mailto://${userEmail}`}>
						<ListItem>
							<ListItemAvatar>
								<EmailRounded color='primary' />
							</ListItemAvatar>
							<ListItemText primary={userEmail} />
						</ListItem>
					</Link>
				</List>
			</Grid>
		</Grid>
	)
}

export default withStyles(styles)(UserData)
