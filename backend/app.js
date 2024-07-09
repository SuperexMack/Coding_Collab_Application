const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const { exec } = require("child_process")
const fs = require("fs")
const cors = require("cors")
const { UserRoom } = require("./Schema")

const server = http.createServer(app)

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}))

app.use(express.json())

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeader: ['Content-Type']
    }
})

global.rooms = {}

io.on("connection", (socket) => {
    socket.on("Roomjoined", async (room) => {
        socket.join(room)

        let checkRoom = await UserRoom.findOne({ roomName: room })
        if (!checkRoom) {
            checkRoom = new UserRoom({ roomName: room })
            await checkRoom.save()
        }

        socket.emit("AlreadyAssignedCode", global.rooms[room] || "")

        const rooms = await UserRoom.find({}, 'roomName')
        io.emit("roomsUpdated", rooms.map(myroom => myroom.roomName))
    })

    socket.on("CodeUpdated", async ({ room, code }) => {
        global.rooms[room] = code
        socket.to(room).emit("AlreadyAssignedCode", code)
    })
})

app.get("/rooms", async (req, res) => {
    const rooms = await UserRoom.find({}, 'roomName');
    res.json({
        allrooms: rooms.map(room => room.roomName)
    })
})

app.post("/getCode", (req, res) => {
    let code = req.body.code
    let InputFileName = `Input.cpp`;
    let OutputFileName = `OUtput.exe`;

    fs.writeFileSync(InputFileName, code)

    exec(`g++ ${InputFileName} -o ${OutputFileName} && ${OutputFileName}`, (error, stdout, stderr) => {
        fs.unlinkSync(InputFileName)
        if (fs.existsSync(OutputFileName)) {
            fs.unlinkSync(OutputFileName)
        }
        if (error) {
            res.json({ err: stderr })
        } else {
            res.json({ output: stdout })
        }
    })
})

const PORT = 9000

server.listen(PORT, () => {
    console.log(`the server is running on port ${PORT}`)
})
