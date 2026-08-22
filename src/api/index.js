const app = require("../src/app");
const connectMongo = require("../src/config/mongo");

connectMongo().catch((err) => console.error("Mongo connection failed:", err.message));

module.exports = app;