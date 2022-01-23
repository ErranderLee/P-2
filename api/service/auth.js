const { User, Region } = require('../../models');
const bcrypt = require('bcrypt');
const passport = require('passport');

const auth = {
    signup: async (req, res) => {
        const { id, password, region } = req.body;
        const exUser = await User.findOne({ where: { id } });
        const response = { success: true, msg: "회원가입 성공!" };
        if(exUser) {
            response.success = false;
            response.msg = "이미 가입된 아이디입니다."
            res.json(response);
        }
        const hash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ 
            id,
            password: hash,
        });
        const exRegion = await Region.findOne({ where: { name: region }});
        await newUser.addRegion(exRegion);
        res.json(response);
    },
    login: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            console.log(err, user, info);
            if(err) {
                res.json({ success: false, msg: '로그인 실패' });
            }
            if(info) {
                res.json({ success: false, msg: info });
            }
            return req.logIn(user, (loginError) => {
                if(loginError) {
                    console.error(loginError);
                    return;
                }
                res.json({ success: true, msg: '로그인 성공!' });
            });
        })(req, res, next);
    },
    getAuthenticatedUser: (req, res, next) => {
        if(req.isAuthenticated() === true) {
            res.json(req.user);
        } else {
            res.json({});
        }
    },
    logout: (req, res, next) => {
        req.logout();
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = auth;