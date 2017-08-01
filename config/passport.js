var JwtStrategy = require('passport-jwt').Strategy;
var User = require('../app/models/user');
var database = require('./database');
module.exports = function (passport) {
    var opts = {};
    opts.secretOrKey = database.secret;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findOne({ id: jwt_payload.id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};