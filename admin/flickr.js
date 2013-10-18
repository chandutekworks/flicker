
/**
 * Module dependencies.'
 */
var express = require('express')
  , dust = require('dust')
  , routes = require('./routes')  
  ,flickr=require('./routes/flickrcontroller')  
  , http = require('http')
  , path = require('path') 
, cons = require('consolidate')
, https = require('https')
,  fs = require('fs');

var httpsOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
};

var app = express();
app.use(express.static(__dirname+'/static' ));
// assign the dust engine to .dust files
app.engine('dust', cons.dust);
app.use(express.cookieParser());
app.use(express.session({secret: 'XYZ123'}));

app.configure(function(){
  app.set('port', process.env.PORT || 3332);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'dust');
  app.use(express.favicon(__dirname + '/images/favicon.ico'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(__dirname+'/static'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


app.get('/',flickr.homepage);
app.get('/imagesList',flickr.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
