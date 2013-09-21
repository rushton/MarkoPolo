var restify = require('restify');
var mongoose = require('mongoose');

function respond(req, res, next) {
     res.send('hello ' + req.params.name);
}

var server = restify.createServer();
mongoose.connect('mongodb://write:coolbreadshirt@widmore.mongohq.com:10000/ScreenEasy');

var UserLocation = mongoose.model('UserLocation', { lat: String, long: String, user_id: String, created:  {type: Date, default: Date.now}});

server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);
server.use(restify.bodyParser()); 

server.get('/hello/:name', respond);
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
