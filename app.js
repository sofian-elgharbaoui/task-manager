const express = require("express");
const app = express();

// connect to db
const connectDB = require("./db/connect");
require("dotenv").config();

// bring routes
const tasksRoute = require("./routes/tasks");

// // For parsing application/json
app.use(express.json());

// // For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// // the public folder has to be placed besides the app.js.file
app.use(express.static("./public"));

// // this the Routes rout - mention the method has used here
app.use("/api/v1/tasks", tasksRoute);

const port = 3000;
// connect to MongoDB
(async () => {
  try {
    await connectDB(process.env.uri); // this is a promise of the connection
    // // spin up the server if the connection has been established successfully.
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.error(error);
  }
})();
