import Colladraw, { CanvasElementType } from 'colladraw'
import Websocket from './websocket'

class HandleCanvas {
  constructor() {
    this.tools = {
      pen: CanvasElementType.PENCIL,
      rubber: CanvasElementType.ERASER,
      rectangle: CanvasElementType.RECTANGLE,
      ellipse: CanvasElementType.ELLIPSE,
      triangle: CanvasElementType.TRIANGLE,
      line: CanvasElementType.LINE,
      text: CanvasElementType.TEXT,
      background: null,
    }
    this.colors = [
      '#f3b1af',
      '#f6d09a',
      '#fafd90',
      '#b0d9a0',
      '#9fd7de',
      '#a6c3fa',
      '#e4acec',
      '#bbb2f9',
      '#c1c1c1',
      '#111111',
    ]
    this.fonts = ['Times New Roman', 'Impact', 'Comic Sans MS']
    this.headerIcons = [...document.querySelectorAll('.header-icons > li')]
    this.toggleIcons = [...document.querySelectorAll('.toggle-icon')]
    this.toolsElements = [...document.querySelectorAll('.tools > li')]
    this.colorsElements = [...document.querySelectorAll('.colors > li')]
    this.fontsElements = [...document.querySelectorAll('.fonts > li')]
    this.fontsPanel = document.querySelector('.fonts')
    this.canvas = document.querySelector('#canvas')
    this.cd = new Colladraw(this.canvas)
    this.currentColor = null
    this.currentTool = null
    this.currentFont = this.fonts[0]
    this.websocket = new Websocket(this.cd, this.drawingId, this.username)
    this.handle()

    setInterval(async () => {
      await fetch(`/api/drawings/${this.drawingId}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          drawing: this.cd.toJSON(),
        }),
      })
    }, 10000)

    if (window.drawingSaved) this.cd.load(window.drawingSaved)
  }

  get drawingId() {
    return location.pathname.split('/')[2]
  }

  get username() {
    return window.username ?? new URLSearchParams(location.search).get('name')
  }

  handle() {
    this.websocket.init(this.canvas)
    this.handleHeaderIcons()
    this.handlePanels()
    this.handleSave()
    this.handleWindowResize()
  }

  handleWindowResize() {
    const resizeCanvas = () => {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resizeCanvas)
  }

  handleHeaderIcons() {
    const profileButton = document.querySelector('#profile')
    const downloadButton = document.querySelector('#download')
    const logoutButton = document.querySelector('#logout')
    const shareButton = document.querySelector('#share')
    const saveButton = document.querySelector('#save')
    const deleteButton = document.querySelector('#delete')

    const logout = async (e) => {
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

    const toggleProfile = () => {
      downloadButton.lastElementChild.classList.remove('show')
      profileButton.lastElementChild.classList.toggle('show')
    }

    const toggleDownload = () => {
      profileButton.lastElementChild.classList.remove('show')
      downloadButton.lastElementChild.classList.toggle('show')
    }

    downloadButton.addEventListener('click', toggleDownload)

    if (profileButton) {
      profileButton.addEventListener('click', toggleProfile)
    }

    if (logoutButton) {
      logoutButton.addEventListener('click', logout)
    }
  }

  handleSave() {
    const pdfButton = document.querySelector('#save-pdf')
    const pngButton = document.querySelector('#save-png')
    const uuid = window.location.pathname.split('/').at(-1)
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content')

    const download = async (format) => {
      const res = await fetch(`/api/drawings/${uuid}/export?format=${format}`, {
        method: 'POST',
        body: JSON.stringify({
          image: this.cd.toDataURL(),
        }),
        headers: {
          'X-CSRF-TOKEN': csrfToken,
          'Content-Type': 'application/json',
        },
      })

      const blob = await res.blob()
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = uuid.split('-')[0]
      a.click()
    }

    pdfButton.addEventListener('click', () => download('pdf'))
    pngButton.addEventListener('click', () => download('png'))
  }

  handlePanels() {
    const colorPicker = document.querySelector('#color-picker')
    const undoButton = document.querySelector('#undo')
    const redoButton = document.querySelector('#redo')

    const changeColor = (e, type) => {
      const selectedShape = this.cd.elements.find((el) => el.selected)

      if (type === 'picker') {
        this.currentColor = colorPicker.value
      } else {
        const index = Number(e.target.className.at(-1)) - 1
        this.currentColor = this.colors[index]
      }

      if (selectedShape) {
        selectedShape.fillColor = this.currentColor
        this.cd.draw()
      }
    }

    const changeTool = (e) => {
      this.toolsElements.forEach((toolElement) => {
        toolElement.classList.remove('active')
      })

      this.fontsPanel.classList.remove('show')

      const toolElement = e.target

      toolElement.classList.add('active')
      this.currentTool = this.tools[toolElement.id]
      this.cd.changeToolType(this.currentTool)
    }

    const changeFont = (e) => {
      this.fontsElements.forEach((fontElement) => {
        fontElement.classList.remove('active')
      })

      const fontButton = e.target.firstElementChild
      fontButton.parentElement.classList.add('active')

      this.currentFont = fontButton.innerText
      this.cd.changeFont(`30px ${this.currentFont}`)
      this.cd.draw()
    }

    const toggleFonts = (e) => {
      this.fontsPanel.classList.toggle('show')
    }

    const togglePanel = (e) => {
      e.target.parentElement.parentElement.classList.toggle('show')
      this.fontsPanel.classList.remove('show')
    }

    const undo = () => {
      this.cd.undo()
    }

    const redo = () => {
      this.cd.redo()
    }

    this.toggleIcons.forEach((toggleIcon) => {
      toggleIcon.addEventListener('click', togglePanel)
    })

    colorPicker.addEventListener('input', (e) => changeColor(e, 'picker'))

    this.colorsElements.forEach((colorElement) => {
      colorElement.addEventListener('click', (e) => changeColor(e, 'palette'))
    })

    this.toolsElements.slice(0, -2).forEach((toolElement) => {
      toolElement.addEventListener('click', changeTool)
    })

    this.fontsElements.forEach((fontElement) => {
      fontElement.addEventListener('click', changeFont)
    })

    document.querySelector('#text').addEventListener('click', toggleFonts)

    undoButton.addEventListener('click', undo)
    redoButton.addEventListener('click', redo)
  }
}

new HandleCanvas()
