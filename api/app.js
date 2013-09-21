var restify = require('restify');
var mongoose = require('mongoose');

function respond(req, res, next) {
     res.send('hello ' + req.params.name);
}

var server = restify.createServer();
mongoose.connect('mongodb://write:coolbreadshirt@widmore.mongohq.com:10000/ScreenEasy');

var UserLocation = mongoose.model('UserLocation', { 
   place: {
      coords: {
         latitude: Number,
         longitude: Number,
      },
      locality: String,
      administrative_area_level_1: String,
      neighborhood: String
   },
   user_id: String, 
   created: {type: Date, default: Date.now},
   name: String});

server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);
server.use(restify.bodyParser()); 
server.use(restify.queryParser()); 

server.get('/hello/:name', respond);
server.get('/location', function(req,res) {
   console.log(req.params);
   UserLocation.find({}).where('user_id').ne(req.params.user_id).exec(function(err,rows){
      res.send(rows)  
   });
});
server.post('location/', function(req,res) {
   var loc = new UserLocation(req.body);
   loc.save(function (err) {
        if (err) // ...
             res.send({status:'error'});
        res.send({status:'success'});
   });

});

server.listen(8080, function() {
     console.log('%s listening at %s', server.name, server.url);
});
