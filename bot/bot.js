'use strict';

const Hapi = require('hapi');
const Good = require('good');
const apiai = require('apiai');
const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

// bot details

var app = apiai("2133f6ece7f443bd9460fd5f13f3f849");


server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});
server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (req, reply) {
        //reply.file('./public/hello.html',response);
        var request = app.textRequest(req.params.name, {
            sessionId: '1'
        });
        request.on('response', function(response) {
            console.log(response.result.resolvedQuery);
            console.log(response.result.fulfillment.speech);
            //reply.file('./public/hello.html',response);
            //reply('<h1>'+response.result.resolvedQuery+'</h1>');
            reply(
              '<h1>'+response.result.resolvedQuery+'</h1><p>'+response.result.fulfillment.speech+'</p>');
        });
        request.on('error', function(error) {
            console.log(error);
        });
        request.end();
    }
});

// server.route({
//     method: 'GET',
//     path: '/{name}',
//     handler: function (req, reply) {
//
//       var request = app.textRequest(req.params.name, {
//           sessionId: '1'
//       });
//
//       request.on('response', function(response) {
//           console.log(response);
//           reply(response);
//       });
//
//       request.on('error', function(error) {
//           console.log(error);
//       });
//       request.end();
//         //reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
//     }
// });

server.register({
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}, (err) => {

    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start((err) => {

        if (err) {
            throw err;
        }
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
