class HandleHome {
  constructor() {
    this.listen()
  }

  listen() {
    const logoutButton = document.querySelector('#logout')

    if (logoutButton) {
      logoutButton.addEventListener('click', this.logout)
    }

    const createSessionForm = document.querySelector('#create-session')

    createSessionForm.addEventListener('submit', this.createSession)
  }

  async logout(e) {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content')

    e.preventDefault()

    if (location.protocol === 'http:') {
      location.pathname = '/'
    }

    const res = await fetch('/logout', {
      method: 'POST',
      headers: {
        'X-CSRF-TOKEN': csrfToken,
      },
    })

    if (res.ok) {
      location.pathname = '/'
    }
  }

  async createSession(e) {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content')

    e.preventDefault()
    const usernameField = document.querySelector('#username')

    if (usernameField) {
      if (!usernameField.value) {
        const errorText = document.querySelector('#username + span')
        errorText.innerText = 'Please enter a username.'
        return
      }
    }

    const res = await fetch('/drawings', {
      method: 'POST',
      body: JSON.stringify({
        name: usernameField ? usernameField.value : '',
      }),
      headers: {
        'X-CSRF-TOKEN': csrfToken,
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      const data = await res.json()
      const drawing = data.drawing

      if (usernameField) {
        location = `/drawings/${drawing.uuid}?name=${usernameField.value}`
      } else {
        location = `/drawings/${drawing.uuid}`
      }
    }
  }
}

new HandleHome()
