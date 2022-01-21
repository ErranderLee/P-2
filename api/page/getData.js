const express = require('express');
const router = express.Router();
const { Region, User, Store } = require('../../models');
const testDb = require('../../testDb');

router.get('/region', async (req, res) => {
    console.log(req.query);
    let regions;
    if(Object.keys(req.query) == 0) {
        regions = await Region.findAll();
    } else {
        const exUser = await User.findOne({ where: { userid: req.query.userid } });
        regions = await exUser.getRegions();
    }
    res.json(regions);
});

router.get('/post', async (req, res) => {
    const region = await Region.findOne({ where : { name: req.query.region } });
    const posts = await region.getPosts({ include: { model: Store }});
    let likePostsIds;
    if(req.isAuthenticated() === true) {
        likePostsIds = await region.getPosts({
            include: {
                model: User,
                where: {
                    userid: req.user.userid
                }
            }
        }
        );
        // console.log(likePostsIds);
        res.json({ posts: posts, likePostsIds: likePostsIds });
    }
    else res.json({ posts: posts, likePostsIds: null });
})

router.get('/createTestDB', async (req, res) => {
    testDb();
    res.json();
})


module.exports = router;