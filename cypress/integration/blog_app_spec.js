describe('Blog app ', function() {
	beforeEach(function() {
		cy.request('POST', '/api/testing/reset')
		cy.createUser()
	})

	it('logs in programmatically without using the UI', function () {
		cy.request('POST', '/api/login', {
			email: Cypress.env('email'),
			password: Cypress.env('password')
		})
		.its('status')
		.should('equal', 200)
	})

	it('logs in with a custom command', function () {
		cy.login().its('status').should('equal', 200)
	})

	it('fails to access protected resource', () => {
		cy.request({
			url: 'http://localhost:3003/api/users', // This?
			failOnStatusCode: false,
		})
		.its('status')
		.should('equal', 401)
	})

	describe('when logged in', function() {
		beforeEach(() => {
			cy.login()
			cy.visit('/')
		})

		it('name of the user is shown', function() {
			cy.contains('Hank tester Hill logged in')
		})

		it('blog can be added using UI', function() {
			cy.get('[data-cy=addBlogFormToggle]').click()
			cy.get('[data-cy=newTitle]')
				.type('UI test blog title')
			cy.get('[data-cy=newAuthor]')
				.type('UI author')
			cy.get('[data-cy=newUrl]')
				.type('gui.com')
			cy.get('[data-cy=createBlogBtn').click().wait(1000)
			cy.visit('/blogs')
			cy.contains('UI test blog title')
		})

		it('blog can be deleted using UI', function() {
			cy.createBlog()
			cy.visit('/blogs')
			cy.contains(Cypress.env('blogTitle')).should('not.exist')
		})

		it('can be liked', function() {
			cy.createBlog()
			cy.visit('/blogs')
			cy.get('[data-cy=likeBtn]').click()
			cy.contains('1 likes')
		})

		it('blog comment can be added', function() {
			cy.createBlog()
			cy.visit('/blogs')
			cy.get('[data-cy=blogTitleLink]').click()
			cy.get('[data-cy=commentInput]')
				.type('Cypress UI test comment')
			cy.get('[data-cy=commentBtn]').click()
			cy.contains('Cypress UI test comment')
		})

		it('blog can be added without using GUI', function() {
			cy.createBlog()
			cy.visit('/blogs')
			cy.contains(Cypress.env('blogTitle'))
		})

		it('users list can be viewed', function() {
			cy.visit('/users')
			cy.contains('Users')
			cy.contains('Hank tester Hill')
		})

		it('user can logout', function() {
			cy.get('[data-cy=logoutBtn]').click()
			cy.location('pathname').should('equal', '/')
		})
	})
})
