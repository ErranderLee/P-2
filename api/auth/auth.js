const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User, Region, User_Region } = require('../../models');

router.post('/signup', async (req, res) => {
    const { id, password, region } = req.body;
    const exUser = await User.findOne({ where: { id } });
    const response = { success: true, msg: "회원가입 성공!" };
    if(exUser) {
        response.success = true;
        response.msg = "이미 가입된 아이디입니다."
        res.json(response);
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ id, password: hash });
    
    res.json(response);
});

module.exports = router;