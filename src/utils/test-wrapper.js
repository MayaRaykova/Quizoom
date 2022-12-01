import React from 'react'
import Context from '../Context'
import { createTheme, ThemeProvider } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

jest.mock('../services/firebase.js', () => {
	const set = jest.fn()

	return {
		app: { firestore: jest.fn(), auth: jest.fn() },
		auth: jest.fn(() => ({
			//currentUser: {},
		})),
		firestore: jest.fn(() => ({
			collection: jest.fn(),
		})),
		storage: jest.fn(),
		database: jest.fn(() => ({
			ref: jest.fn(() => ({
				push: jest.fn(() => ({
					set,
				})),
			})),
		})),
	}
})

const TestWrapper = (props) => {
	function FakeThemeProvider({ children }) {
		const theme = createTheme()
		return <ThemeProvider theme={theme}>{children}</ThemeProvider>
	}
	return (
		<Context.Provider
			value={{
				quiz: { title: '', questions: [], IsPublic: true, duration: 0 },
			}}
		>
			<FakeThemeProvider>
				<BrowserRouter>{props.children}</BrowserRouter>
			</FakeThemeProvider>
		</Context.Provider>
	)
}

export default TestWrapper
