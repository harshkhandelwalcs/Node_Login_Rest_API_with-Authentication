var express = require('express');
var router = express.Router();


// home Route
router.get('/', function (req, res) {
  res.send('Hello! This is Login REST_API ');
});



module.exports = router;