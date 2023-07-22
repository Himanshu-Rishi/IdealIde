const mongoose = require("mongoose");

exports.connectToDb = async()=>
{
    try {
        const urlStr = "mongodb://127.0.0.1:27017/test"
        await mongoose.connect(urlStr);   
    } catch (error) {
        console.log(error);
    }
    console.log("Database connected successfully!");
}