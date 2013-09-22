var restify = require('restify');
var mongoose = require('mongoose');
var twilio = require('twilio');

function respond(req, res, next) {
     res.send('hello ' + req.params.name);
}

var tclient = new twilio.RestClient('AC7fe56257ebd5ecf76f306b9de4037339', '12cfb959bae16d9e4450e6949ffe58ee');
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
   image: String,
   created: {type: Date, default: Date.now},
   number: String,
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
   UserLocation.find({}).where('user_id').sort('-created').limit(5).exec(function(err,rows){
      res.send(rows)  
   });
});
server.post('/location/', function(req,res) {
   var loc = new UserLocation(req.body);
   loc.save(function (err) {
        if (err) // ...
             res.send({status:'error'});
        res.send({status:'success'});
   });

});

server.post('/text', function(req,res) {
      tclient.sms.messages.create({
         to:req.body.to,
         from:req.body.from,
         body:req.body.body
      },
      function(err, message) {
         if (err)
            res.send({'status': 'error', 'message': err})
         else
            res.send({'status': 'success'})
      });
});

server.listen(8080, function() {
     console.log('%s listening at %s', server.name, server.url);
});
