const express = require('express');
const router = new express();
const userController = require('./controller/user.controller.js');
const postController = require('./controller/post.controller.js');
const { checkToken, createToken } = require('./middleware/auth.js');

router.post('/createuser', createToken, userController.createUser);

router.post('/postcreate', checkToken, postController.createPost);
router.post('/postdelete/:id', checkToken, postController.deletePost);
router.post('/postedit', checkToken, postController.editPost);
router.get('/postall', checkToken, postController.getAllPosts);
router.get('/post/:id', checkToken, postController.getPost);

module.exports = router;