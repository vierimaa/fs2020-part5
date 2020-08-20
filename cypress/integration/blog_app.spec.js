describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Ode Velli',
      username: 'olli',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('Login').click()
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login',function() {
    it('user can log in', function() {
      cy.contains('Login').click()
      cy.get('#username').type('olli')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Ode Velli Logged in')
    })

    it('login fails with wrong password', function() {
      cy.contains('Login').click()
      cy.get('#username').type('olli')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password!')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Ode Velli logged in')
    })
  })

  describe('When logged in',function() {
    beforeEach(function() {
      cy.login({ username: 'olli', password: 'salainen' })
    })

    it('blog creation works', function() {
      cy.contains('Create').click()
      cy.get('#title').type('Blog creation works')
      cy.get('#author').type('Cypress Hill')
      cy.get('#url').type('www.working.hard')
      cy.get('#create-blog-btn').click()

      cy.get('.notification')
        .should('contain', 'New blog Blog creation works added')
    })

    describe('When blogs exist',function() {
      beforeEach(function() {
        cy.createBlog({ title: 'Hits from the bong', author: 'Cypress Hill', url: 'www.high-hills.org', likes: 420 })
        cy.createBlog({ title: 'Insane in the membrane', author: 'Hypress Cill', url: 'www.low-hills.org', likes: 77 })
        cy.createBlog({ title: 'Tequilla Sunrise', author: 'Cypress Cill', url: 'www.low-chills.org', likes: 88 })
      })

      it('Liking a blog  works', function() {     
        cy.contains('Hits from the bong')
          .parent()
          .find('button')
          .contains('View')
          .click()
        cy.contains('Hits from the bong')
          .parent()
          .find('button')
          .contains('Like')
          .click()
        cy.contains('Likes 421')
      })

      it('Deleting a blog  works', function() {     
        cy.contains('Insane in the membrane')
          .parent()
          .find('button')
          .contains('Delete')
          .click()

        cy.get('html').should('not.contain', 'Insane in the membrane')
      })

      it('Blogs are ordered by likes', function() {     
        cy.get('.view-btn').should('have.length', 3)
          .each(button => cy.wrap(button).click())

        cy.get('.likes').eq(0).contains('420')
        cy.get('.likes').eq(1).contains('88')
        cy.get('.likes').eq(2).contains('77')
      })
    })
  })
})