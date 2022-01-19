const express = require('express');
const router = express.Router();
const { Region, User } = require('../../models');

router.get('/region', async (req, res) => {
    console.log(req.session);
    const regions = await Region.findAll();
    res.json(regions);
});

module.exports = router;