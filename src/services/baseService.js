import app from './firebase'
import 'firebase/auth'
class BaseService {
	constructor() {
		this.app = app
		this.auth = this.app.auth()
	}

	get uid() {
		return this.auth.currentUser?.uid
	}
}

export default BaseService
