const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const { exec } = require("child_process")
const fs = require("fs")
const cors = require("cors")

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

let newCode = ''

io.on("connection" , (socket)=>{
    console.log("New client joined the coding club")
    socket.emit("AlreadyAssignedCode" , newCode)
    socket.on("CodeUpdated" , (AssignedCode)=>{
        newCode = AssignedCode
        socket.broadcast.emit("AlreadyAssignedCode",newCode)
    })
    socket.on("disconnect", () => {
        socket.broadcast.emit("AlreadyAssignedCode", newCode);
    });
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


