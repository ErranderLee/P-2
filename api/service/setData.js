const { Post } = require('../../models');
const setData = {
    postLike: async (req, res) => {
        const exUser = req.user;
        const post = new Post(req.body.post);
        console.log(post);
        await exUser.addPost(post);
        res.json();
    },
    deleteLike: async (req, res) => {
        const exUser = req.user;
        const post = new Post(req.body.post);
        await exUser.removePost(post);
    }
}

module.exports = setData;