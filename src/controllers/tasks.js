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
    const { rows: task } = await db.query(
      "SELECT * FROM task WHERE id = $1",
      [id]
    );

    res.json(task[0]);
  } catch (error) {
    next(error.message);
  }
};

const createTask = async (req, res, next) => {
  const { title, description } = req.body;

  try {
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
    const { rows: task } = await db.query(
      "UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );

    res.json(task[0]);
  } catch (error) {
    next(error.message);
  }
};

const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { rows: task } = await db.query(
      "DELETE FROM task WHERE id = $1 RETURNING *",
      [id]
    );

    res.json({
      message: `The task ${task[0].title} was deleted`
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
