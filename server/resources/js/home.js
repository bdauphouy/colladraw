class HandleHome {
  constructor() {
    this.listen()
    this.drawingUuid = null
    this.handleModal()
  }

  listen() {
    const logoutButton = document.querySelector('#logout')

    if (logoutButton) {
      logoutButton.addEventListener('click', this.logout)
    }

    const createSessionForm = document.querySelector('#create-session')

    if (createSessionForm) {
      createSessionForm.addEventListener('submit', this.createSession)
    }

    const joinSessionForm = document.querySelector('#join-session')

    if (joinSessionForm) {
      joinSessionForm.addEventListener('submit', this.joinSession)
    }
  }

  joinSession(e) {
    e.preventDefault()
    const usernameField = document.querySelector('.username')
    const params = new URLSearchParams(window.location.search)

    if (usernameField) {
      if (!usernameField.value) {
        const errorText = document.querySelector('.username + span')
        errorText.innerText = 'Please enter a username.'
        return
      }
    }

    location.href = usernameField
      ? `/drawings/${params.get('session')}?name=${usernameField.value}`
      : `/drawings/${params.get('session')}`
  }

  async logout(e) {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content')

    e.preventDefault()

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

    const usernameField = document.querySelector('.username')

    if (usernameField) {
      if (!usernameField.value) {
        const errorText = document.querySelector('.username + span')
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
        location.href = `?modal=true&session=${drawing.uuid}&name=${usernameField.value}`
      } else {
        location.href = `?modal=true&session=${drawing.uuid}`
      }
    }
  }

  handleModal() {
    const modal = document.querySelector('#create-session-modal')
    const closeModalButton = document.querySelector('#close-modal')
    const modalUuid = document.querySelector('#modal-uuid')
    const copyButton = document.querySelector('#copy-button')
    const drawButton = document.querySelector('#draw')
    const urlParams = new URLSearchParams(window.location.search)
    const params = {
      name: urlParams.get('name'),
      session: urlParams.get('session'),
      modal: urlParams.get('modal'),
    }
    const urlToShare = `${location.origin}/?ask=true&session=${params.session}`

    const openModal = () => {
      modalUuid.value = urlToShare
      modal.showModal()
    }

    const closeModal = () => {
      modal.close()
      modal.style.display = 'none'
    }

    const draw = () => {
      location.href = params.name
        ? `${location.origin}/drawings/${params.session}?name=${params.name}`
        : `${location.origin}/drawings/${params.session}`
    }

    const copyUrl = async () => {
      await navigator.clipboard.writeText(urlToShare)
      copyButton.innerText = 'Copied'
      copyButton.classList.add('copied')

      setTimeout(() => {
        copyButton.innerText = 'Copy'
        copyButton.classList.remove('copied')
      }, 3000)
    }

    if (params.modal === 'true') {
      openModal()
    } else {
      closeModal()
    }

    copyButton.addEventListener('click', copyUrl)
    closeModalButton.addEventListener('click', closeModal)
    drawButton.addEventListener('click', draw)
  }
}

new HandleHome()
