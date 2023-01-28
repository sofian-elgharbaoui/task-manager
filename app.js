const express = require("express");
const app = express();

// // connect to db
const connectDB = require("./db/connect");

// // bring the secret vars
require("dotenv").config();

const notFound = require("./middlewares/not-found");

// I create the error handler to do what I WANT; instead of sending the built-in error middleware in the res
const errorHandler = require("./middlewares/error-handler");

// // bring routes
const tasksRoute = require("./routes/tasks");

// // For parsing application/json
app.use(express.json());

// // For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// // the public folder has to be placed besides the app.js.file
app.use(express.static("./public"));

// // this the Routes rout - mention the method has used here
app.use("/api/v1/tasks", tasksRoute);

// // For the 404 page. I MUST put this middleware after I put all the pages that I have.
app.use(notFound);

// // I have to define error-handling middleware last, after other app.use() and routes calls
app.use(errorHandler);

const port = process.env.PORT || 3000;
// // connect to MongoDB
(async () => {
  try {
    await connectDB(process.env.uri); // this is a promise of the connection
    // // spin up the server if the connection has been established successfully.
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.error(error);
  }
})();
