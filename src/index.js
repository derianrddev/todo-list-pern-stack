const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(taskRoutes);

app.use((error, req, res, next) => {
  return res.status(500).json({
    error,
  });
});

app.listen(3000);

console.log(`Server on port ${3000}`);
