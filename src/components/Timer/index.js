import React, { Fragment, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { padZero } from '../../utils'

const QuizTimer = (props) => {
	const { timer, history } = props
	const { duration, start, complete, progress } = timer || {}
	const [minutes, setMinutes] = useState(0)
	const [seconds, setSeconds] = useState(0)

	const [timerHandler, setTimerHandler] = useState(0)

	history.listen(() => {
		clearTimeout(timerHandler)
	})

	const updateTime = (timer) => {
		setMinutes(parseInt(timer / 60, 10))
		setSeconds(parseInt(timer % 60, 10))
	}

	const startTimer = () => {
		const interval = 1000 // ms
		let timer = duration
		let expected = Date.now() + interval
		setTimerHandler(() => {
			return setTimeout(step, interval)
		})

		function step() {
			const dt = Date.now() - expected

			updateTime(timer)

			if (--timer < 0) {
				complete()
				clearTimeout(timerHandler)
				return
			}
			progress(timer)
			expected += interval
			setTimerHandler(() => {
				return setTimeout(step, Math.max(0, interval - dt))
			})
		}
	}

	useEffect(() => {
		updateTime(timer.duration)
	}, [timer])

	useEffect(() => {
		if (start) startTimer()
		else {
			clearTimeout(timerHandler)
		}
		return () => {
			clearTimeout(timerHandler)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [start])

	return <Fragment>{`${padZero(minutes)} : ${padZero(seconds)}`}</Fragment>
}

export default withRouter(QuizTimer)
