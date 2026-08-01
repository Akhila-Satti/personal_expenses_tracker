const mongoose = require("mongoose");
const dns=require('dns');
dns.setServers([
  '1.1.1.1','8.8.8.8'
])
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB listening");
  } catch (error) {
    console.error("Database Connection Failed:", error.message);
    process.exit(1);
  }
};


module.exports = connectDB;