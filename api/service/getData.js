const { Region, User, Store } = require('../../models');
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
    createTestDB: async (req, res) => {
        testDb();
        res.json();
    }
}

module.exports = getData;