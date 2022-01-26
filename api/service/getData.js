const { Region, User, Store, Likes, Post } = require('../../models');
const testDb = require('../../testDb');
const getData = {
    getRegions: async (req, res) => {
        console.log(req.query);
        let regions;
        if(Object.keys(req.query) == 0) {
            regions = await Region.findAll();
        } else {
            const exUser = await User.findOne({ where: { userid: req.query.userid } });
            regions = await exUser.getRegions();
        }
        res.json(regions);
    },
    getPosts: async (req, res) => {
        const region = await Region.findOne({ where : { name: req.query.region } });
        const posts = await region.getPosts({ include: { model: Store }});
        let likePosts;
        if(req.isAuthenticated() === true) {
            likePosts = await region.getPosts({
                include: {
                    model: User,
                    where: {
                        userid: req.user.userid
                    }
                }
            }
            );
            res.json({ posts: posts, likePosts: likePosts });
        }
        else res.json({ posts: posts, likePosts: null });
    },
    isliked: async (req, res) => {
        console.log(req.query);
        const isliked = await Likes.findOne({
            where : {
                UserUserid: req.user.userid,
                PostPostid: req.query.postid
            }
        });
        if (isliked === null) {
            res.json(false);
        } else {
            res.json(true);
        }
    },
    getLikePosts: async (req, res) => {
        const exUser = req.user;
        const likePosts = await exUser.getPosts({ include: [{ model:Store }, { model:Region }] });
        if(likePosts === null) {
            res.json(null);
        } else {
            res.json(likePosts);
        }
    },
    createTestDB: async (req, res) => {
        testDb();
        res.json();
    },
}

module.exports = getData;