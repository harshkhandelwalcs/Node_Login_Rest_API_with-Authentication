var mongoose = require('mongoose');


//db connection
mongoose.connect('mongodb://localhost/node-rest-auth');
var db = mongoose.connection;

//check error
db.on('error',function(){
  console.log('error');
});

//check connection
db.once('open',function(){

  console.log('connected to DateaBase');
})

module.exports = {
  'secret': 'devdacticIsAwesome',
  'db': db
};