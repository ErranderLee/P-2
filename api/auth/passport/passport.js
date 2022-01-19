const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../../models/user');
const bcrypt = require('bcrypt');

module.exports = () => {
    passport.serializeUser((userid, done) => {
        done(null, userid);
    });
    
    passport.deserializeUser((userid, done) => {
        User.findOne({ where: { userid }})
        .then((user) => done(null, user))
        .catch((err) => done(err));
    })

    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'password',
        // session: true,
        // passReqToCallback: false
    }, async (id, password, done) => {
        try {
            const exUser = await User.findOne({ where: { id: id }});
            if(exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if(result) {
                    done(null, exUser.userid);
                } else {
                    done(null, false, { msg: '비밀번호가 일치하지 않습니다.' });
                }
            } else {
                done(null, false, { msg: '아이디가 존재하지 않습니다. '});
            }
        } catch(err) {
            console.error(err);
            done(err);
        }
    }));
}