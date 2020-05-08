console.log('app started')

const config = {
  API_URL: 'https://private-b2e6827-robustatask.apiary-mock.com',
  API_PATH_SIGNUP: '/auth/register',
  API_PATH_SIGNIN: '/auth/login',
}

const navLinks = [...document.querySelectorAll('.nav-link')]
const form = document.getElementById('signup-form')
const formFields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    username: document.getElementById('username'),
    password: document.getElementById('password')
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (!link.classList.contains('active')) {
      link.id === 'to-signup' ? switchTab('signup') : switchTab('login')
    }
  })
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  formHandler({ name: 'test' }, 'signup')
})

const switchTab = (tab) => {
  const signupOnlyfields = [...document.querySelectorAll('.signup-only')]
  const signupNavLink = document.getElementById('to-signup')
  const loginNavLink = document.getElementById('to-login')
  const submitBtn = document.getElementById('submit-btn')
  if (tab === 'signup') {
    signupNavLink.classList.add('active')
    loginNavLink.classList.remove('active')
    formFields.password.autocomplete = 'new-password'
    submitBtn.textContent = 'Signup'
    signupOnlyfields.forEach((field) => {
      field.style.display = 'block'
      field.getElementsByTagName('input')[0].required = true
    })
  } else {
    loginNavLink.classList.add('active')
    signupNavLink.classList.remove('active')
    formFields.password.autocomplete = 'current-password'
    submitBtn.textContent = 'Login'
    signupOnlyfields.forEach((field) => {
      field.style.display = 'none'
      field.getElementsByTagName('input')[0].required = false
    })
  }
}

const formHandler = async (payload, type) => {
  const url = `${config.API_URL}${
    type === 'signup' ? config.API_PATH_SIGNUP : config.API_PATH_SIGNIN
  }`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
}
