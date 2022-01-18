const express = require('express');
const router = express.Router();
const { Region } = require('../../models');

router.get('/region', async (req, res) => {
    const regions = await Region.findAll();
    res.json(regions);
});

module.exports = router;