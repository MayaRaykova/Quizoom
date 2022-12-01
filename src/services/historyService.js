import BaseService from './baseService'

class HistoryService extends BaseService {
	constructor() {
		super()
		this.ref = this.app.firestore().collection('history')
	}

	addHistory(quizResult) {
		const { quiz, correct, total, timeLeft, passedAt } = quizResult
		const {
			id,
			data: { title, description, duration },
		} = quiz

		const history = {
			uid: this.uid,
			correct,
			total,
			duration: duration - timeLeft,
			passedAt,
			quiz: id,
			title,
			description,
			score: parseFloat(correct / total).toFixed(2),
		}
		this.ref.add(history)
	}

	async getHistory() {
		const data = await this.ref
			.where('uid', '==', this.uid)
			.orderBy('passedAt', 'desc')
			.get()
		const history = []
		data.forEach((doc) => history.push({ id: doc.id, data: doc.data() }))
		return history
	}
}

export default new HistoryService()
