import BaseService from './baseService'
import historyService from './historyService'
import firebase from 'firebase'

class QuizService extends BaseService {
	constructor() {
		super()
		this.ref = this.app.firestore().collection('quizzes')
	}

	//TODO: Add Error Handling

	setQuiz(quiz) {
		if (quiz.id) {
			return this.updateQuiz(quiz)
		}
		quiz.createdBy = this.uid
		quiz.createdAt = new Date()
		quiz.authorImg = this.auth.currentUser.photoURL
		return this.ref.add(quiz)
	}

	updateQuiz(quiz) {
		return this.ref.doc(quiz.id).set(quiz)
	}

	completeQuiz(quizResult) {
		const { quiz } = quizResult
		historyService.addHistory(quizResult)
		const result = { ...quizResult }
		delete result.quiz
		this.ref.doc(quiz.id).update({
			completedBy: firebase.firestore.FieldValue.arrayUnion({
				uid: this.uid,
				email: this.auth.currentUser.email,
				photo: this.auth.currentUser.photoURL,
				result,
			}),
		})
	}

	async getPersonal() {
		const data = await this.ref.where('createdBy', '==', this.uid).get()
		const quizList = []
		data.forEach((doc) => {
			quizList.push({ ...doc.data(), id: doc.id })
		})
		return quizList
	}

	deleteQuiz(id) {
		return this.ref.doc(id).delete()
	}

	filterPersonal = (data) => {
		const quizList = []
		data.forEach((doc) => {
			const data = doc.data()

			if (data.createdBy !== this.uid) {
				quizList.push({ ...data, id: doc.id })
			}
		})

		return quizList
	}

	async getAvailable() {
		const data = await this.ref.where('isPublic', '==', true).get()

		const available = this.filterPersonal(data).filter((doc) => {
			// filer completed by the current user
			return !doc.completedBy.some((a) => a.uid === this.uid)
		})

		return available
	}

	async getCompleted() {
		const history = await historyService.getHistory()

		const completed = {}
		history.forEach(({ data }) => {
			const { correct, description, duration, passedAt, score, title, total } =
				data
			if (completed[data.quiz] === undefined) {
				completed[data.quiz] = { title, description, completions: [] }
			}
			completed[data.quiz].completions.push({
				total,
				correct,
				duration,
				passedAt,
				score,
			})
		})
		return completed
	}

	releaseQuiz(qid, completedBy) {
		this.ref.doc(qid).update({
			completedBy,
		})
	}

	async getById(id) {
		const doc = await this.ref.doc(id).get()
		return { id: doc.id, data: doc.data() }
	}
}
export default new QuizService()
