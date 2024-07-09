const mongoose = require("mongoose");
require("dotenv").config();

const dataBaseURL = process.env.DBURL;



Main()
    .then(() => {
        console.log("Database connected successfully")
    })
    .catch((error) => {
        console.log("Something went wrong while connecting to the database" + error)
    })

async function Main(){
    await mongoose.connect(dataBaseURL)
}


const roomSchema = new mongoose.Schema({
    roomName: { type: String, required: true, unique: true },
    code: { type: String, default: "" }
});


const UserRoom = mongoose.model("UserRoom", roomSchema);

module.exports = {
    UserRoom
};
