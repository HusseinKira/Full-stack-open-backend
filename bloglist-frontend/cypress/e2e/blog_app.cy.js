describe('blog app', () => {
  beforeEach(function() {
    cy.request('POST','http://localhost:3003/api/testing/reset')
    const user = {
   username:'hussein',
   password:'kkk123',
   name:'hussein'
    }
  cy.request('POST','http://localhost:3003/api/users',user)
    cy.visit('http://localhost:3000')
  })

  it('loginform is default', () => {
    cy.contains('Login:')
    cy.contains('username')
    cy.contains('password')
  })

  describe('logging',()=>{
it('login with right creds', ()=>{
cy.get('#username').type('hussein')
cy.get('#password').type('kkk123')
cy.get('#login-button').click()
cy.contains('logged-in')
})

it('login with wrong creds', ()=>{
  cy.get('#username').type('hussein')
  cy.get('#password').type('aaaaaa')
  cy.get('#login-button').click()
  cy.get('.error')
  .should('contain', 'Wrong username or password')
  .and('have.css', 'color', 'rgb(212, 49, 43)')
  cy.get('html').should('not.contain', 'logged-in')
  })

  })
  
  
 describe('when logged', ()=>{
 
  beforeEach(function() {
cy.request('POST','http://localhost:3003/api/login',{username:'hussein' ,password:'kkk123'})
.then(({ body }) => {
  localStorage.setItem('loggedbloguser', JSON.stringify(body))
  cy.visit('http://localhost:3000')
})
  })
it('create a blog', ()=>{
cy.get('#createblog').click()
cy.get('#title').type('test')
cy.get('#url').type('test.com')
cy.get('#author').type('tester')
cy.get('#create').click()
cy.contains('test tester')
})

describe('a blog exists',()=>{
beforeEach(function(){
  cy.get('#createblog').click()
  cy.get('#title').type('test')
  cy.get('#url').type('test.com')
  cy.get('#author').type('tester')
  cy.get('#create').click()
  cy.get('#veiw-button').click()
})

it('user can like a blog',()=>{
cy.get('#like-button').click()
cy.contains('likes:1')
})

it('user can delete created blog',()=>{
  cy.get('#delete-button').click()
 
})

it('another user try to delete',()=>{

cy.contains('logout').click()
const user = {
  username:'mark',
  password:'kkk123',
  name:'mark'
   }
 cy.request('POST','http://localhost:3003/api/users',user)
 cy.get('#username').type('mark')
 cy.get('#password').type('kkk123')
 cy.get('#login-button').click()
 cy.get('#veiw-button').click()
cy.get('html').should('not.contain','#delete-button')

})

it.only('most likes is sorted first',()=>{
  cy.get('#like-button').click()
  cy.wait()
  cy.contains('hide').click()
  cy.get('#createblog').click()
  cy.get('#title').type('test with less likes')
  cy.get('#url').type('test.com')
  cy.get('#author').type('tester')
  cy.get('#create').click()
  cy.get('.blog').eq(0).should('contain', 'test tester')
cy.get('.blog').eq(1).should('contain', 'test with less likes tester')


})



})






 })

})