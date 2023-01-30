const db = require("../db");

const isValidID = async (id = "") => {
  if (isNaN(id)) {
    throw new Error("The id is invalid");
  }

  const { rows: task } = await db.query(
    "SELECT * FROM task WHERE id = $1",
    [id]
  );
  
  if (task.length === 0) {
    throw new Error("ID does not exist");
  }
}

const isUniqueTitle = async (title = "") => {
  const { rows: existTask } = await db.query(
    "SELECT * FROM task WHERE title = $1",
    [title]
  );

  if (existTask.length > 0) {
    throw new Error(`The title ${title} is already registered`);
  }
}

module.exports = {
  isValidID,
  isUniqueTitle
}