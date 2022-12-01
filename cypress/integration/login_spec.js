describe('Login', () => {
	before(() => {
		cy.visit('http://localhost:3000')
	})

	after(() => {
		cy.get('[data-cy=authMenu]').then(($el) => {
			$el.click()
			cy.get('li').contains('Logout').click()
		})
	})

	it('User sould not login when credentials are invalid', () => {
		cy.contains('Login').click()
		cy.get('#email').clear().type('notexist@email.com')
		cy.get('#password').clear().type('123456asdasdasdasdsda7sdf9as876dfas876')
		cy.get('button').contains('Sign in').click()
		cy.get('#client-snackbar').should('have.text', 'Login failed')
	})

	it('User sould login when credentials are valid', () => {
		cy.contains('Login').click()
		cy.get('#email').clear().type('raykov@email.com')
		cy.get('#password').clear().type('123456')
		cy.get('button').contains('Sign in').click()
		cy.get('a[href^="mailto"]').should('have.text', 'raykov@email.com')
	})
})
