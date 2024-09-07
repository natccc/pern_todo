const {
  postTodo,
  getTodos,
  patchTodo,
  getTodoById,
  deleteTodo,
} = require("./controller.js");
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js");
//middleware
app.use(cors());
app.use(express.json());

//routes

//create a todo
app.post("/todos", postTodo);
//get all todos
app.get("/todos", getTodos);
//get a todo
app.get("/todos/:id", getTodoById);
//update a todo
app.patch("/todos/:id", patchTodo);

//delete a todo
app.delete("/todos/:id", deleteTodo);

app.all("*", (req, res, next) => {
  res.status(404).send({ message: "endpoint not found" });
});

//error handling

//psql error
app.use((err, req, res, next) => {
  if (err.code === "23502" || err.code === "22P02") {
    res.status(400).send({ message: "bad request" });
  } else {
    next(err);
  }
});

//custom error handling
app.use((err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: "internal server error" });
});

app.listen(3000, () => {
  console.log("server has started on port 3000");
});
