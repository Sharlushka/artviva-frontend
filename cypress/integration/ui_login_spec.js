describe('Login using UI', function () {
	it('logs in using UI', () => {
		cy.visit('/login')
		// enter valid username and password
		cy.get('[data-cy=emailInput]').type(Cypress.env('email'))
		cy.get('[data-cy=passwordInput]').type(Cypress.env('password'))
		cy.get('[data-cy=loginBtn]').click().wait(500)
	
		// confirm we have logged in successfully
		cy.location('pathname').should('equal', '/')
		cy.contains('Blog app')
		.should('be.visible')
		.then(() => {
			/* global window */
			const userString = window.localStorage.getItem('loggedUserJSON')
			expect(userString).to.be.a('string')
			const user = JSON.parse(userString)
			expect(user).to.be.an('object')
			expect(user).to.have.keys([
				'token',
				'username',
				'email',
				'id'
			])
			expect(user.token).to.be.a('string')
		})

		// logout
		cy.get('[data-cy=logoutBtn]').click()
		cy.location('pathname').should('equal', '/')
	})
	
	it('does not log in with invalid password', () => {
		cy.visit('/login')
		cy.location('pathname').should('equal', '/login')

		// valid email and invalid pass
		cy.get('[data-cy=emailInput]').type(Cypress.env('email'))
		cy.get('[data-cy=passwordInput]').type('WrongPass')
		cy.get('[data-cy=loginBtn]').click().wait(250)
	
		// still on /login page plus an error is displayed
		cy.location('pathname').should('equal', '/login')
		cy.contains('.alert-danger', 'invalid username or password').should(
			'be.visible'
		)
	})
})
