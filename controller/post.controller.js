const db = require('../db');

class PostController {
  async createPost(req, res) {
    try {
      const { id, name } = req.body;
      const newPost = await db.query('INSERT INTO post (id, name) values ($1, $2) RETURNING *', [
        id,
        name,
      ]);
      res.json(newPost.rows[0]).status(200);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async getAllPosts(req, res) {
    try {
      const posts = await db.query('SELECT * FROM  post');
      res.json(posts.rows).status(200);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async getPost(req, res) {
    try {
      const id = req.params.id;
      const post = await db.query('SELECT * FROM post where id = $1', [id]);

      res.json(post.rows[0]).status(200);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async editPost(req, res) {
    try {
      const { id, name } = req.body;
      const post = await db.query('UPDATE post set name = $1 where id = $2 RETURNING *', [
        name,
        id,
      ]);
      res.json(post.rows[0]).status(200);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async deletePost(req, res) {
    try {
      const id = req.params.id;
      const deletedPost = await db.query('DELETE FROM post where id = $1 RETURNING *', [id]);
      res.json(deletedPost.rows[0]).status(200);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
}

module.exports = new PostController();
