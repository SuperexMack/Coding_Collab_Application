const express = require("express")
const app = express()
const { Server } = require("socket.io")
const { exec } = require("child_process")
const http = require("http")
const server = http.createServer(app)
const { UserRoom } = require("./Schema")
const fs = require("fs")
const cors = require('cors')

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}))

const io = new Server(server, {

    cors: {
        origin: "http://localhost:5173",
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type']
    }

})

app.use(express.json());


global.rooms = {};

// creating the room

io.on("connection", (socket) => {

    console.log("New client connected")

    socket.on("AllocateRoom", async (MyallRooms) => {

        socket.join(MyallRooms)
        let checkUser = await UserRoom.findOne({ roomName: MyallRooms })
        if (!checkUser) {
            checkUser = new UserRoom({ roomName: MyallRooms })
            await checkUser.save()
        }

       
        socket.emit("CodeArrived", global.rooms[MyallRooms] || "")

        const roomAllocation = await UserRoom.find({}, "roomName")
        io.emit("RoomsUpdated", roomAllocation.map((r) =>
            r.roomName
        ))
    })

    socket.on("CodeUpdated", async ({ roomName, code }) => {
        global.rooms[roomName] = code
        socket.to(roomName).emit("CodeArrived", code)
    })

})




app.get("/getRooms", async (req, res) => {
    let AllRooms = await UserRoom.find({}, "roomName")
    res.json({
        AllRoomsAllocation: AllRooms.map((rooms) =>
            rooms.roomName
        )
    })
})

// Compiler Code

app.post("/getCode", (req, res) => {
    let code = req.body.code
    let InputFile = `input.cpp`;
    let OutputFile = `output.exe`;

    fs.writeFileSync(InputFile, code)

    exec(`g++ ${InputFile} -o ${OutputFile} && ${OutputFile}`, (error, stdout, stderr) => {
        fs.unlinkSync(InputFile);
        if (fs.existsSync(OutputFile)) {
            fs.unlinkSync(OutputFile)
        }

        if (error) {
            res.json({
                allerr: stderr
            })
        }
        else {
            res.json({
                output: stdout
            })
        }
    })


})

let PORT = 5000

server.listen(PORT, () => {
    console.log(`Server is running on the port Number ${PORT}`)
})

