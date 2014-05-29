
var config = require('./config.json');

// Http server and socket.io start
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Redis init
var redis = require('redis');
var publisher = redis.createClient();
var subscriber = redis.createClient();

app.set('view engine', 'ejs');
app.set('views', config.views.path);


app.get('/', function (req, res) {
	res.render('index');
});

app.get('/g/:matchId', function (req, res) {

});

var keys = {
  right: 0,
  left: 1,
  up: 2,
  down: 3,
  a: 4,
  b: 5,
  select: 6,
  start: 7
};

io.on('connection', function(socket){
	socket.on('command', function (key){
		publisher.publish('command', keys[key]);
		socket.broadcast.emit('command', {user: 'someone', key: key});
	});
});

subscriber.subscribe('picture');

subscriber.on('message', function (channel, msg) {
	
	switch (channel) {
		case 'picture':
			io.sockets.emit('picture', msg);
			break;
		default:
			console.log('unhandled subscribed event');
	}

});


http.listen(process.env.PORT || config.app.port || 8000);