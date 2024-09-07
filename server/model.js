const pool = require("./db")
exports.insertTodo= async(description)=> {
    const result = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description])
    return result.rows[0];
}

exports.fetchTodos = async () => {
    const result = await pool.query("SELECT * FROM todo");
    return result.rows
}

exports.editTodo = async (id, description, completed) => {
    const result = await pool.query(
      "UPDATE todo SET description=$1, completed=$2 WHERE id = $3 RETURNING *",
      [description, completed, id]
    );
     if (result.rows.length === 0) {
        return Promise.reject({ status: 404, message: "Todo not found" });
     }
    return result.rows[0]

}

exports.fetchTodoById = async (id) => {
    const result = await pool.query("SELECT * FROM todo WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
        return Promise.reject({status:404, message:"Todo not found"})
    }
    return result
}

exports.removeTodo = async (id) => {
    const result = await pool.query(
      "DELETE FROM todo WHERE id = $1 RETURNING *",
      [id]
    );
     if (result.rows.length === 0) {
       return Promise.reject({status:404, message:"Todo not found"})
     }
    return result
}