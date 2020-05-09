const config = {
  API_URL: 'https://private-b2e6827-robustatask.apiary-mock.com',
  API_PATH_SIGNUP: '/auth/register',
  API_PATH_SIGNIN: '/auth/login',
}

const navLinks = [...document.querySelectorAll('.nav-link')]
const form = document.getElementById('register-form')

const formFields = {
  name: document.getElementById('name'),
  email: document.getElementById('email'),
  username: document.getElementById('username'),
  password: document.getElementById('password'),
}

const validation = {
  name: false,
  email: false,
  username: false,
  password: false,
}

/**
 * Navigation links click event handler
 */
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (!link.classList.contains('active')) {
      link.id === 'to-register' ? switchTab('register') : switchTab('login')
    }
  })
})

/**
 * Form submission event handler
 */
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const requestObject = {}
  if (form.dataset.type === 'register') {
    if (
      validation.name &&
      validation.email &&
      validation.username &&
      validation.password
    ) {
      requestObject.name = formFields.name.value
      requestObject.email = formFields.email.value
      requestObject.username = formFields.username.value
      requestObject.password = formFields.password.value
      formHandler(requestObject, 'register')
    }
  } else {
    requestObject.email = formFields.email.value
    requestObject.password = formFields.password.value
    if (validation.email && validation.password) {
      formHandler(requestObject, 'login')
    }
  }
})

/**
 * Fields validation
 */
for (field in formFields) {
  const input = formFields[field]
  const formGroup = input.parentElement
  let errorSpan = formGroup.getElementsByTagName('span')[0]
  input.addEventListener('blur', () => {
    if (!input.value) {
      formGroup.classList.add('has-error')
      errorSpan.textContent = `The ${input.id} field is required.`
      validation[`${input.id}`] = false
    }
  })
  switch (input.id) {
    case 'name':
      input.addEventListener('change', () => {
        if (input.value) {
          formGroup.classList.remove('has-error')
          errorSpan.textContent = ''
          validation[`${input.id}`] = true
        }
      })
      break
    case 'email':
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      input.addEventListener('change', () => {
        let valid = emailRegex.test(input.value)
        if (!valid) {
          formGroup.classList.add('has-error')
          errorSpan.textContent = 'The email is not valid.'
          validation[`${input.id}`] = false
        } else {
          formGroup.classList.remove('has-error')
          errorSpan.textContent = ''
          validation[`${input.id}`] = true
        }
      })
      break
    case 'username':
      input.addEventListener('change', () => {
        if (input.value.length < 5) {
          formGroup.classList.add('has-error')
          errorSpan.textContent = 'Username must contain at least 4 characters.'
          validation[`${input.id}`] = false
        } else {
          formGroup.classList.remove('has-error')
          errorSpan.textContent = ''
          validation[`${input.id}`] = true
        }
      })
      break
    case 'password':
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      input.addEventListener('change', () => {
        let valid = passwordRegex.test(input.value)
        if (!valid) {
          formGroup.classList.add('has-error')
          errorSpan.textContent =
            'Password must contain 8 characters or more and at least one number.'
          validation[`${input.id}`] = false
        } else {
          formGroup.classList.remove('has-error')
          errorSpan.textContent = ''
          validation[`${input.id}`] = true
        }
      })
      break
    default:
      break
  }
}

/**
 * Switching between tabs
 * @param {String} tab, tab to navigate to register or signin
 */
const switchTab = (tab) => {
  const registerOnlyfields = [...document.querySelectorAll('.register-only')]
  const registerNavLink = document.getElementById('to-register')
  const loginNavLink = document.getElementById('to-login')
  const submitBtn = document.getElementById('submit-btn')

  initializeTab()

  if (tab === 'register') {
      document.title = 'Register | Robusta'
    form.dataset.type = 'register'
    registerNavLink.classList.add('active')
    loginNavLink.classList.remove('active')
    formFields.password.autocomplete = 'new-password'
    submitBtn.textContent = 'Register'
    registerOnlyfields.forEach((field) => {
      field.style.display = 'block'
      field.getElementsByTagName('input')[0].required = true
    })
  } else {
    document.title = 'Login | Robusta'
    form.dataset.type = 'login'
    loginNavLink.classList.add('active')
    registerNavLink.classList.remove('active')
    formFields.password.autocomplete = 'current-password'
    submitBtn.textContent = 'Login'
    registerOnlyfields.forEach((field) => {
      field.style.display = 'none'
      field.getElementsByTagName('input')[0].required = false
    })
  }
}

/**
 * Reset tab on switch
 */
const initializeTab = () => {
  for (field in formFields) {
    const input = formFields[field]
    const formGroup = input.parentElement

    input.value = ''
    formGroup.classList.remove('has-error')
    formGroup.getElementsByTagName('span')[0].textContent = ''
  }
}

/**
 * Async form handler, API Call
 * @param {Object} payload, Form data
 * @param {String} type, Register or login
 */
const formHandler = async (payload, type) => {
  const submitBtn = document.getElementById('submit-btn')
  const currentBtnHtml = submitBtn.innerHTML
  const loaderHTML = `<span class="loader"></span>`
  submitBtn.innerHTML = loaderHTML
  const url = `${config.API_URL}${
    type === 'register' ? config.API_PATH_SIGNUP : config.API_PATH_SIGNIN
  }`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const data = await response.json()
  submitBtn.innerHTML = currentBtnHtml
  if (data.success) {
    alert(data.message)
  } else {
    alert('Something went wrong!')
  }
}
