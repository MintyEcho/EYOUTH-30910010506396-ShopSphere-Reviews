const mongoose = require("mongoose");

let isConnected = false;

async function connectMongo() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log("MongoDB connected");
}

module.exports = connectMongo;