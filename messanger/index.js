/**
 * Created by Tehseen on 12/30/2015.
 */
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.get('/', function (req, res) {
    res.send('Hy Guys Please Connect Here And Start GupShup Hummm!');
});

io.on('connection', function (socket) {
    console.log('User Connected');
    socket.on('chat message', function(msg){
        io.emit('chat',msg);
        console.log(msg);
    });
   /* socket.on('disconnect', function(){
        console.log('user disconnected');
    });*/
});


var server = server.listen(8888, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://localhost:',port);
});


