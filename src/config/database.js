const mongoose = require("mongoose");

const ConnectDB = async()=>{
    await mongoose.connect("mongodb+srv://dbUser:4E7m5Ko9m5Alk9Gr@clustermuster.lkwjbna.mongodb.net/devTinder")
}

exports.module ={ ConnectDB};