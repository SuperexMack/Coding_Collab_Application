const mongoose = require("mongoose")
const Schema = mongoose.Schema
require("dotenv").config()
const dataBaseURL = process.env.DBURL

Main()
    .then(() => {
        console.log("Database connected successfully")
    })
    .catch((error) => {
        console.log(`Something went wrong while connecting to the database ` + error)
    })

const Main = async () => {
    await mongoose.connect(dataBaseURL)
}

const ROOMS = new Schema({
    roomName : String,
})

const UserRoom = mongoose.model("UserRoom" , ROOMS);

module.exports = {
    UserRoom
}