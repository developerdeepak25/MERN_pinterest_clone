// server/server.js
require("dotenv").config();

const http = require("http");
const app = require("./app");
const connectDB = require("./config/dbConfig");

// Set the port (process.env.PORT for production, 5000 for development)
const port = process.env.PORT || 5000;
app.set("port", port);


// / Connect to the database
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Listen on provided port
server.listen(port);

// Event listener for HTTP server "listening" event
server.on("listening", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
