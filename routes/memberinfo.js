var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../app/models/user');
var jwt = require('jwt-simple');
var database = require('../config/database');
require('../config/passport')(passport);

// route to a restricted info
router.get('/', passport.authenticate('jwt', { session: false }), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, database.secret);
    User.findOne({
      name: decoded.name
    }, function (err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
      } else {
        res.json({ success: true, msg: 'Welcome in the member area ' + user.name + '!' });
      }
    });
  } else {
    return res.status(403).send({ success: false, msg: 'No token provided.' });
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};


module.exports = router;