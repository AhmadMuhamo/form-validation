console.log('app started')

const config = {
  API_URL: 'https://private-b2e6827-robustatask.apiary-mock.com',
  API_PATH_SIGNUP: '/auth/register',
  API_PATH_SIGNIN: '/auth/login',
}

const navLinks = [...document.querySelectorAll('.nav-link')]
const form = document.getElementById('signup-form')

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (!link.classList.contains('active')) {
      link.id === 'to-signup' ? switchTab('signup') : switchTab('login')
    }
  })
})

const switchTab = (tab) => {
    const signupOnlyfields = [...document.querySelectorAll('.signup-only')]
  if (tab === 'signup') {
    document.getElementById('to-signup').classList.add('active')
    document.getElementById('to-login').classList.remove('active')
    document.getElementById('password').autocomplete = 'new-password'
    document.getElementById('submit-btn').textContent = 'Signup'
    signupOnlyfields.forEach((field) => {
        field.style.display = 'block'
        field.getElementsByTagName('input')[0].required = true
    })
  } else {
    document.getElementById('to-login').classList.add('active')
    document.getElementById('to-signup').classList.remove('active')
    document.getElementById('password').autocomplete = 'current-password'
    document.getElementById('submit-btn').textContent = 'Login'
    signupOnlyfields.forEach((field) => {
        field.style.display = 'none'
        field.getElementsByTagName('input')[0].required = false
    })
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
})
