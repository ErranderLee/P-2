const express = require('express');
const router = express.Router();
const { Region, User } = require('../../models');

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


module.exports = router;