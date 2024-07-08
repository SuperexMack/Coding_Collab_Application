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

const io = new Server(server , {
    cors:{
        origin: "http://localhost:5173",
        methods : ["GET","POST"],
        allowedHeader : ['Content-Type']
    }
})

// now we are going to work on the websocket

// let newCode = ''

io.on("connection" , (socket)=>{
    // now we are going to make a room LOL

    socket.on("Roomjoined" , (room)=>{
        socket.join(room)
        if (!global.rooms) {
            global.rooms = {}
        }
        if (!global.rooms[room]) {
            global.rooms[room] = "" // if room is newly made then just go and create a room with empty
        }
        socket.emit("AlreadyAssignedCode", global.rooms[room])
    
    })

    socket.on("CodeUpdated" , ({room,code})=>{
       global.rooms[room] = code
        socket.to(room).emit("AlreadyAssignedCode",code)
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
            res.json({
                err: stderr
            })
        }
        else {
            res.json({
                output: stdout
            })
        }
    })


})

const PORT = 9000

server.listen(PORT, () => {
    console.log(`the server is runnnig in the port Number ${PORT}`)
})


