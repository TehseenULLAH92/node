/**
 * Created by Tehseen on 12/30/2015.
 */

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

/*app.get('/', function(req, res){
    res.send('Hello world');
});*/
app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});
/*app.get('/socket', function(req, res){
    res.sendFile(__dirname+'/socket.io.js');
});*/
io.on('connection', function(socket){
    console.log('a user connected');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('app listening at http://%s:%s', host, port);
});
