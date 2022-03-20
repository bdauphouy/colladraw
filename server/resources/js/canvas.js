import Colladraw, { CanvasElementType } from 'colladraw'
import Websocket from './websocket'

class HandleCanvas {
  constructor() {
    this.headerIcons = [...document.querySelectorAll('.header-icons > li')]
    this.toggleIcons = [...document.querySelectorAll('.toggle-icon')]
    this.toolsElements = [...document.querySelectorAll('.tools > li')]
    this.colorsElements = [...document.querySelectorAll('.colors > li')]
    this.canvas = document.querySelector('#canvas')
    this.cd = new Colladraw(this.canvas)
    this.currentColor = null
    this.currentTool = null
    this.websocket = new Websocket(this.cd)
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
    this.handle()
  }

  handle() {
    this.cd.changeFillColor('red')
    this.websocket.init(this.canvas)
    this.handleHeaderIcons()
    this.handlePanels()
    this.handleSave()
  }

  handleHeaderIcons() {
    const profile = document.querySelector('#profile')
    const download = document.querySelector('#download')

    const toggleProfile = () => {
      profile.lastElementChild.classList.toggle('show')
    }

    const toggleDownload = () => {
      download.lastElementChild.classList.toggle('show')
    }

    download.addEventListener('click', toggleDownload)

    if (profile) {
      profile.addEventListener('click', toggleProfile)
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

      const toolElement = e.target

      toolElement.classList.add('active')
      this.currentTool = this.tools[toolElement.id]
      this.cd.changeToolType(this.currentTool)
    }

    const togglePanel = (e) => {
      e.target.parentElement.parentElement.classList.toggle('show')
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

    undoButton.addEventListener('click', undo)
    redoButton.addEventListener('click', redo)
  }
}

new HandleCanvas()
