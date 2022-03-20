const { Server } = require("socket.io")

require("dotenv").config()

const io = new Server({
    cors: {
        origin: "*", // TODO: change to production
        methods: ["GET", "POST"]
    }
})

io.listen(process.env.WS_PORT)
console.log(`listening on port ${process.env.WS_PORT}`)

io.on("connection", (socket) => {
    socket.on("join-drawing", function({ room, username }) {
        // console.log(`joining room ${room}`);
        socket.join(room)
        io.sockets.in(room).emit("user-joined", {
            room,
            username
        })
    })

    socket.on('leave-drawing', function({ room, username }) {
        // console.log(`leaving room ${room}`);
        socket.leave(room)
        io.sockets.in(room).emit("user-left", {
            room,
            username
        })
    })

    socket.on("update-drawing", function({ room, data, emitterId }) {
        // console.log(`new element in room ${room}`);
        io.sockets.in(room).emit("update-drawing", { ...data, emitterId })
    })
})
