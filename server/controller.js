const {
  insertTodo,
  fetchTodos,
  editTodo,
  fetchTodoById,
  removeTodo,
} = require("./model.js");

exports.postTodo = async (req, res, next) => {
  try {
    const { description } = req.body;
    const result = await insertTodo(description);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getTodos = async (req, res) => {
  try {
    const result = await fetchTodos();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await fetchTodoById(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.patchTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { description, completed } = req.body;
    const result = await editTodo(id, description, completed);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeTodo(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
