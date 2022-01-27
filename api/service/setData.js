const { Post } = require('../../models');
const setData = {
    postLike: async (req, res) => {
        const exUser = req.user;
        const post = new Post(req.body.post);
        const message = await exUser.addPost(post);
        res.json();
    },
    deleteLike: async (req, res) => {
        const exUser = req.user;
        const post = new Post(req.body.post);
        const message = await exUser.removePost(post);
        res.json();
    }
}

module.exports = setData;