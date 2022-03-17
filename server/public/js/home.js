const logout = document.querySelector("#logout")
const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute("content")

if (logout) {
  logout.addEventListener("click", async (e) => {
    e.preventDefault()
    const res = await fetch("http://localhost:8000/logout", {
      method: "POST",
      headers: {
        "X-CSRF-TOKEN": csrfToken,
      },
    })

    if (res.ok) {
      location.pathname = "/"
    }
  })
}
