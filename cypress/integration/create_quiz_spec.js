describe('Login', () => {
	before(() => {
		//cy.visit('https://quizoom-a1d35.web.app')
		cy.visit(' http://localhost:3000')
		cy.contains('Login').click()
		cy.get('#email').clear().type('raykov@email.com')
		cy.get('#password').clear().type('123456')
		cy.get('button').contains('Sign in').click()
	})

	after(() => {
		cy.get('[data-cy=authMenu]').then(($el) => {
			$el.click()
			cy.get('li').contains('Logout').click()
		})
	})

	it('The test can be created', () => {
		cy.get('[data-cy=authMenu]').click()
		cy.get('li').contains('Add quiz').click()
		cy.get('#title').clear().type('TEST TITLE 00001')
		cy.get('#description').clear().type('TEST DESCRIPTION 00001')
		cy.get('button').contains('Continue').click()
		cy.get('h6').should('have.text', 'Quizoom: TEST TITLE 00001')
		cy.get('button').contains('Add Question').click()
		cy.get('#question').clear().type('TEST QUESTION 00001')

		cy.get('button').contains('Answer').click()
		cy.get('#answer').clear().type('TEST QUESTION 00001 - ANSWER 00001')
		cy.get('button').contains('Ok').click()
		cy.get('input[type=radio][name=quiz]').its('length').should('eq', 1)

		cy.get('button').contains('Answer').click()
		cy.get('#answer').clear().type('TEST QUESTION 00001 - ANSWER 00002')
		cy.get('button').contains('Ok').click()
		cy.get('input[type=radio][name=quiz]').its('length').should('eq', 2)

		cy.get('button').contains('Answer').click()
		cy.get('#answer').clear().type('TEST QUESTION 00001 - ANSWER 00003')
		cy.get('button').contains('Ok').click()
		cy.get('input[type=radio][name=quiz]').its('length').should('eq', 3)

		cy.get('button[data-cy=delete-answer-2]').click()
		cy.get('input[type=radio][name=quiz]').its('length').should('eq', 2)
		cy.get('input[type=radio][name=quiz]').first().check()

		cy.get('button').contains('Save Question').click()
		cy.get('button').contains('Save Quiz').click()
		cy.get('button').contains('Ok').click()

		cy.get('p')
			.contains('TEST TITLE 00001')
			.should('be.visible', 'The quiz has been created successfully')
		cy.get('p').contains('TEST TITLE 00001').click()
		cy.get('button[data-cy="delete-TEST TITLE 00001"]').click()
		cy.get('button').contains('Ok').click().as('deleteQuiz')
	})
})
