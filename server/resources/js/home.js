const logoutButton = document.querySelector("#logout")
const createSessionForm = document.querySelector("#create-session")
const usernameField = document.querySelector("#username")

const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content")

const logout = async (e) => {
  e.preventDefault()

  if (location.protocol === "http:") {
    location.pathname = "/"
  }

  const res = await fetch("/logout", {
    method: "POST",
    headers: {
      "X-CSRF-TOKEN": csrfToken,
    },
  })

  if (res.ok) {
    location.pathname = "/"
  }
}

const createSession = async (e) => {
  e.preventDefault()

  const res = await fetch("/drawings", {
    method: "POST",
    body: JSON.stringify({
      name: usernameField ? usernameField.value : "",
    }),
    headers: {
      "X-CSRF-TOKEN": csrfToken,
      "Content-Type": "application/json",
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

if (logoutButton) {
  logoutButton.addEventListener("click", logout)
}

createSessionForm.addEventListener("submit", createSession)
