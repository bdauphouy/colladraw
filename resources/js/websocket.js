class Websocket {
    constructor(cd, drawingId, username) {
        this.cd = cd
        this.drawingId = drawingId
        this.username = username
    }

    _events = []

    init(canvas) {
        const clientId = Math.random().toString(16).slice(2)

        // let selectedText = null;
        //
        // element-clicked, element-selected, element-deselected, element-moved, element-transform, element-created
        // canvas.addEventListener('element-clicked', (e) => {
        //   console.log('element-clicked', e.detail);
        // });
        //
        // canvas.addEventListener('element-selected', (e) => {
        //   console.log('element-selected', e.detail);
        //
        //   if (e.detail.element instanceof CanvasText) {
        //     selectedText = e.detail.element;
        //   }
        // });
        //
        // canvas.addEventListener('element-deselected', (e) => {
        //   console.log('element-deselected', e.detail);
        //   selectedText = null;
        // });
        //
        // canvas.addEventListener('element-moved', (e) => {
        //   console.log('element-moved', e.detail);
        // });
        //
        // canvas.addEventListener('element-transform', (e) => {
        //   console.log('element-transform', e.detail);
        // });
        //
        // canvas.addEventListener('element-created', (e) => {
        //   console.log('element-created', e.detail);
        // });
        //
        // document.querySelector('#text-input').addEventListener('input', (e) => {
        //   if (selectedText) {
        //     selectedText.text = e.target.value;
        //     colladraw.draw()
        //   }
        // });

        const socket = io("http://localhost:8001")

        socket.on("connect", () => {
            console.info("Websocket connected")

            socket.emit("join-drawing", {
                room: `drawing-${this.drawingId}`,
                username: this.username,
            })

            window.addEventListener('beforeunload', (e) => {
                socket.emit("leave-drawing", {
                    room: `drawing-${this.drawingId}`,
                    username: this.username,
                })
            })

            socket.on('user-joined', ({ username }) => {
                const userJoinedEvent = this._events.find(event => event.name === 'user-joined')
                if (userJoinedEvent) {
                    userJoinedEvent.callback(username)
                }
            })

            socket.on('user-left', ({ username }) => {
                const userLeftEvent = this._events.find(event => event.name === 'user-left')
                if (userLeftEvent) {
                    userLeftEvent.callback(username)
                }
            })

            socket.on("update-drawing", ({ emitterId, ...data }) => {
                if (emitterId !== clientId) {
                    this.cd.load(data)
                }
            })

            const send = () => {
                socket.emit("update-drawing", {
                    data: this.cd.toJSON(),
                    emitterId: clientId,
                    room: `drawing-${this.drawingId}`
                })
            }

            canvas.addEventListener("element-created", send)
            canvas.addEventListener("element-moved", send)
            canvas.addEventListener("element-transform", send)
        })
    }

    on(name, callback) {
        this._events.push({ event: name, callback })
    }
}

export default Websocket
