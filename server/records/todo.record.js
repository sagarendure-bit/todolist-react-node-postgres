const { pool } = require("../utils/db");

class TodoRecord {
  constructor(obj) {
    if (!obj.todo || obj.todo.length < 3 || obj.todo.length > 50) {
      throw new Error(
        "Todo must have at least 3 characters and less than 50 characters."
      );
    }

    this.id = obj.id;
    this.todo = obj.todo;
  }

  static async listAll() {
    const { rows } = await pool.query(
      "SELECT * FROM todos ORDER BY id ASC"
    );

    return rows.map((row) => new TodoRecord(row));
  }

  static async getOne(id) {
    const { rows } = await pool.query(
      "SELECT * FROM todos WHERE id = $1",
      [id]
    );

    return rows.length === 0 ? null : new TodoRecord(rows[0]);
  }

  async insert() {
    const { rows } = await pool.query(
      "INSERT INTO todos (todo) VALUES ($1) RETURNING id",
      [this.todo]
    );

    this.id = rows[0].id;
    return this.id;
  }

  async update(id, todo) {
    await pool.query(
      "UPDATE todos SET todo = $1 WHERE id = $2",
      [todo, id]
    );
  }

  async delete() {
    await pool.query(
      "DELETE FROM todos WHERE id = $1",
      [this.id]
    );
  }
}

module.exports = {
  TodoRecord,
};