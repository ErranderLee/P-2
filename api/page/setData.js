const express = require('express');
const router = express.Router();
const { User, Post } = require('../../models');

router.post('/like', async (req, res) => {
    const exUser = req.user;
    const post = new Post(req.body.post);
    console.log(post);
    await exUser.addPost(post);
    res.json();
});

router.delete('/like', async (req, res) => {
    const exUser = req.user;
    const post = new Post(req.body.post);
    await exUser.removePost(post);
});

module.exports = router;