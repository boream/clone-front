describe('The Signup Page', () => {

  before(() => {
    cy.exec('npm run db:reset')
    cy.request('POST', 'http://localhost:1337/auth/local/register', Cypress.config('user'))
      .its('body')
      .as('currentUser')
  })

  beforeEach(() => {
    cy.visit('/signup')
  })

  it('should type correct email', () => {
    cy.get('input[formcontrolname=email]')
      .type('email@hotmail.com')
      .should('have.class', 'ng-valid')
  })

  it('should type incorrect email', () => {
    cy.get('input[formcontrolname=email]')
      .type('email')
      .should('have.class', 'ng-invalid')
      .should('have.class', 'input-error')
  })

  it('should type correct password', () => {
    cy.get('input[formcontrolname=password]')
      .type('123456')
      .should('have.class', 'ng-valid')
  })

  it('should type incorrect password', () => {
    cy.get('input[formcontrolname=password]')
      .type('1234')
      .should('have.class', 'ng-invalid')
      .should('have.class', 'input-error')
  })

  it('should make invalid inputs if nothing is typed', () => {
    cy.get('input[formcontrolname=email]')
      .focus()
      .blur()
      .should('have.class', 'ng-invalid')
      .should('have.class', 'input-error')
    cy.get('input[formcontrolname=password]')
      .focus()
      .blur()
      .should('have.class', 'ng-invalid')
      .should('have.class', 'input-error')
  })

  it('should sign up', () => {
    cy.server()
    cy.route('POST', 'http://localhost:1337/auth/local/register').as('signup')
    cy.get('input[formcontrolname=firstname]')
      .type('new user')
    cy.get('input[formcontrolname=lastname]')
      .type('new user lastname')
    cy.get('input[formcontrolname=email]')
      .type('newuser@hotmail.com')
    cy.get('input[formcontrolname=username]')
      .type('newuser')
    cy.get('input[formcontrolname=password]')
      .type('user1234{enter}')
    cy.wait('@signup').its('status').should('eq', 200)
    cy.url().should('include', '/login')
  })

  it('should not sign up', () => {
    cy.server()
    cy.route('POST', 'http://localhost:1337/auth/local/register').as('signup')
    cy.get('input[formcontrolname=firstname]')
      .type(Cypress.config('user').firstname)
    cy.get('input[formcontrolname=lastname]')
      .type(Cypress.config('user').lastname)
    cy.get('input[formcontrolname=email]')
      .type(Cypress.config('user').email)
    cy.get('input[formcontrolname=username]')
      .type(Cypress.config('user').username)
    cy.get('input[formcontrolname=password]')
      .type(`${Cypress.config('user').password}{enter}`)
    cy.wait('@signup').its('response.body.message').should('deep.eq', [{
      messages: [{
        id: 'Auth.form.error.email.taken',
        message: 'Email is already taken.'
      }]
    }])
    cy.url().should('include', '/signup')
  })

  it('should have the submit button disable', () => {
    cy.get('input[formcontrolname=email]')
      .type('hola')
    cy.get('button[type=submit]')
      .should('have.attr', 'disabled')
  })

  it('should redirect to /login when clicking link', () => {
    cy.get('a[href="/login"]').click()
    cy.url().should('include', '/login')
  })

})
