// const path = require("path");
const Task = require("../models/tasks");
const getTasks = (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "../public/index.html")); // the point is neccessary before slash
  //   fs.readFile("../public/index.html", "utf8", (err, data) => {
  //     if (err) console.log(err.message);
  //     // // I had to put the return keywork here to send the code outsite the fs.readfile()
  //     return res.send(data);
  //   });
  res.send("get all tasks");
};

const getSingleTask = (req, res) => {
  res.json(req.params);
};

const createTask = async (req, res) => {
  await Task.create(req.body);
  // res.send(req.body);
  //   res.json("new task has been created");
};

const updateTask = (req, res) => {
  res.json(+req.params.id);
  // res.send("edit on a task");
};

const deleteTask = (req, res) => {
  res.json(+req.params.id);
  //   res.send("the task was deleted successfuly");
};

module.exports = {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
