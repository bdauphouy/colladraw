class Websocket {
    constructor(cd, drawingId, username) {
        this.cd = cd
        this.drawingId = drawingId
        this.username = username
    }

    _events = []

    init(canvas) {
        const clientId = Math.random().toString(16).slice(2)

        const socket = io("https://ws.colladraw.fun")

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
