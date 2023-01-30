const { Router } = require("express");
const { check } = require("express-validator");
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");
const { isValidID, isUniqueTitle } = require("../helpers/dbValidators");
const { validFields } = require("../middlewares/validFields");

const router = Router();

router.get("/tasks", getAllTasks);

router.get("/tasks/:id", [check("id").custom(isValidID), validFields], getTask);

router.post(
  "/tasks",
  [check("title").custom(isUniqueTitle), validFields],
  createTask
);

router.put(
  "/tasks/:id",
  [
    check("title").custom(isUniqueTitle),
    check("id").custom(isValidID),
    validFields,
  ],
  updateTask
);

router.delete(
  "/tasks/:id",
  [check("id").custom(isValidID), validFields],
  deleteTask
);

module.exports = router;
