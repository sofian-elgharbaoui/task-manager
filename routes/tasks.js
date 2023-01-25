const express = require("express");
const tasksRoute = express.Router();

const {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

tasksRoute.route("/").get(getTasks).post(createTask);
tasksRoute
  .route("/:id")
  .get(getSingleTask)
  .patch(updateTask)
  .delete(deleteTask);

module.exports = tasksRoute;
