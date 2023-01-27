const db = require("../db");

const getAllTasks = async (req, res, next) => {
  try {
    const { rows } = await db.query("SELECT * FROM task");
    res.json(rows);
  } catch (error) {
    next(error.message);
  }
};

const getTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      return res.status(400).json({
        message: `The id ${id} is not a number`,
      });
    }

    const { rows: task } = await db.query(
      "SELECT * FROM task WHERE id = $1",
      [id]
    );

    if (task.length === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task[0]);
  } catch (error) {
    next(error.message);
  }
};

const createTask = async (req, res, next) => {
  const { title, description } = req.body;

  try {
    const { rows: existTask } = await db.query(
      "SELECT * FROM task WHERE title = $1",
      [title]
    );
    if (existTask.length > 0) {
      return res
        .status(400)
        .json({ message: `The title ${title} is already registered` });
    }

    const { rows: task } = await db.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );

    res.json(task[0]);
  } catch (error) {
    next(error.message);
  }
};

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    if (isNaN(id)) {
      return res.status(400).json({
        message: `The id ${id} is not a number`,
      });
    }

    const { rows: existTask } = await db.query(
      "SELECT * FROM task WHERE title = $1",
      [title]
    );
    if (existTask.length > 0) {
      return res
        .status(400)
        .json({ message: `The title ${title} is already registered` });
    }

    const { rows: task } = await db.query(
      "UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );

    if (task.length === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(task[0]);
  } catch (error) {
    next(error.message);
  }
};

const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (isNaN(id)) {
      return res.status(400).json({
        message: `The id ${id} is not a number`,
      });
    }

    const { rowCount: task } = await db.query(
      "DELETE FROM task WHERE id = $1",
      [id]
    );

    if (task === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "The task was deleted"
    });
  } catch (error) {
    next(error.message);
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
