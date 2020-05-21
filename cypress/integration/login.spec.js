describe('The Login Page', () => {

  before(() => {
    cy.exec('npm run db:reset')
    cy.request('POST', 'http://localhost:1337/auth/local/register', Cypress.config('user'))
      .its('body')
      .as('currentUser')
  })

  beforeEach(() => {
    cy.visit('/login')
  })

  it('should load', () => {
    cy.visit('/login')
  })

  it('should type correct email', () => {
    cy.get('input[formcontrolname=identifier]')
      .type('email@hotmail.com')
      .should('have.class', 'ng-valid')
  })

  it('should type incorrect email', () => {
    cy.get('input[formcontrolname=identifier]')
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
    cy.get('input[formcontrolname=identifier]')
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

  it('should log in', () => {
    cy.get('input[formcontrolname=identifier]')
      .type(Cypress.config('user').identifier)
    cy.get('input[formcontrolname=password]')
      .type(`${Cypress.config('user').password}{enter}`)
    cy.url().should('include', '/home')
  })

  it('should not log in', () => {
    cy.get('input[formcontrolname=identifier]')
      .type('hola@hotmail.com')
    cy.get('input[formcontrolname=password]')
      .type('hola1234{enter}')
    cy.url().should('include', '/login')
  })

  it('should have the submit button disable', () => {
    cy.get('input[formcontrolname=identifier]')
      .type('hola')
    cy.get('button[type=submit]')
      .should('have.attr', 'disabled')
  })

  it('should redirect to /signup when clicking link', () => {
    cy.get('a[href="/signup"]').click()
    cy.url().should('include', '/signup')
  })

})
