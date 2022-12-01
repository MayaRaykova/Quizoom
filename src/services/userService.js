import app from './firebase'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import 'firebase/storage'

class Firebase {
	constructor() {
		this.auth = app.auth()
		this.db = app.firestore()
		this.storage = app.storage()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	async logout() {
		await this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		await this.auth.currentUser.updateProfile({
			displayName: name,
		})
	}

	updateName(newName) {
		this.auth.currentUser.updateProfile({
			displayName: newName,
		})
	}

	addImage(imageFile) {
		if (!this.auth.currentUser) {
			return alert('Not authorized')
		}
		const uploadTask = this.storage
			.ref(`/images/${imageFile.name}`)
			.put(imageFile)

		uploadTask.on(
			'state_changed',
			(snapShot) => {
				console.log(snapShot)
			},
			(err) => {
				console.error(err)
			},
			async () => {
				const photoURL = await this.storage
					.ref('images')
					.child(imageFile.name)
					.getDownloadURL()

				await this.auth.currentUser.updateProfile({
					photoURL,
				})
			}
		)
	}

	getCurrentUser() {
		const user = this.auth.currentUser
			? {
					userName: this.auth.currentUser.displayName,
					userImg: this.auth.currentUser.photoURL || '-',
					userEmail: this.auth.currentUser.email,
					userId: this.auth.currentUser.uid,
			  }
			: null
		return user
	}

	isInitialized() {
		return new Promise((resolve) => {
			this.auth.onAuthStateChanged(resolve)
		})
	}
}

export default new Firebase()
