const db = require('../db');

class UserController {
  async createUser(req, res) {
    const { name, password } = req.body;
    const newPerson = await db.query(
      'INSERT INTO person (name, password) values ($1, $2) RETURNING *',
      [name, password]
    );
  }
}

module.exports = new UserController();
