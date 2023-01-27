const task = require("../models/tasks");

const getTasks = async (req, res) => {
  try {
    // to get all json files inside an array
    const allTasks = await task.find({});
    res.json(allTasks);
  } catch (error) {
    res.json(error);
  }
  // // METHOD 01
  // find all tasks with name "task 1", then give me "the completed"
  // will return an array with all the matchced objects
  // task.find({ name: "task 1" },"completed", (err, tasks) => {
  //   if (err) res.json(err);
  //   res.json(tasks);
  // });

  // // METHOD 02 - preferd
  // try {
  //   const tasks = await task.find({ name: "task 1" }, "completed");
  //   res.json(tasks);
  // } catch (err) {
  //   res.json(err);
  // }

  // // METHOD 03
  // let tasks = task.find({ name: "task 2" }, "completed");

  // tasks.exec((err, tasks) => {
  //   if (err) res.json(err);
  //   res.json(tasks);
  // });

  //   res.sendFile(path.resolve(__dirname, "../public/index.html")); // the point is neccessary before slash
  //   fs.readFile("../public/index.html", "utf8", (err, data) => {
  //     if (err) console.log(err.message);
  //     // // I had to put the return keywork here to send the code outsite the fs.readfile()
  //     return res.send(data);
  //   });
};

const getSingleTask = async (req, res) => {
  try {
    let { id: taskID } = req.params;
    let specificTask = await task.findById(taskID);
    // When it comes to find (with any method of finding) and you insert an id with the same structure or
    // length of the id, but with wrong value the, the promise'll return null.
    // Then we have to do sth rather than returning null
    if (!specificTask)
      return res.json({ msg: `the id (${taskID}) doesn't match any task` });

    res.json(specificTask);
  } catch (error) {
    res.send("The id is not correct");
  }
};

const createTask = async (req, res) => {
  try {
    await task.create(req.body); // push the task to the db
    res.json(req.body);
  } catch (error) {
    res.send(error.errors.name.message);
  }
};

const updateTask = async (req, res) => {
  try {
    let { id: taskID } = req.params;
    const { name, completed } = req.body;
    const updatedTask = await task.findByIdAndUpdate(taskID, req.body, {
      // I passed the full obj to it because if I want to make an object
      // with the intended keys to be updated & their values, it'll be the same.
      new: true,
      runValidators: true,
    });
    if (!updatedTask)
      return res.send(`there is no task with this id: ${taskID}`);
    res.json(updatedTask);
  } catch (error) {
    res.send("The id is not correct");
  }
};

const deleteTask = async (req, res) => {
  const { id: taskID } = req.params;
  try {
    const deletedTask = await task.findByIdAndDelete(taskID);
    if (!deletedTask)
      return res.json({ msg: `there is no task with this id: ${taskID}` });
    res.json(deletedTask);
  } catch (error) {
    res.json({ msg: `This id (${taskID}) is not correct` });
  }
};

module.exports = {
  getTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
