"use strict";
process.title = 'KukarekaTV';


var WebSocket = require('websocket').server;
var http = require('http');
var server = http.createServer(function(request, response) {});

var tv = [];
var player = [];

server.listen(8080, function() { });

var ws = new WebSocket({httpServer: server});

console.log(new Date(), " WebSocket server start");

ws.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    
    connection.on('message', function(message) {
        if (message.type === 'utf8'){
            var json = JSON.parse(message.utf8Data);
            if(json.type === "tv"){
				if(!this.type){
					this.type = "tv";
					tv.push(this);
					console.log(new Date(), ' TV connected:'+this.remoteAddress);
				}
            }else if(json.type === "player"){
				if(!this.type){
					this.type = "player";
					player.push(this);
					console.log(new Date(), ' Player connected:'+this.remoteAddress);
				}
            }else{
                if(json.video){
					console.log(new Date(), ' send to TV:'+message.utf8Data, tv.length);
					
                    for(var i=0;i<tv.length;i++){
                        if(tv[i] != this){
                            tv[i].sendUTF(message.utf8Data);
                        }
                    }
                }
            }
        }
    });

    connection.on('close', function(connection){
        if(!this.type){
			console.log(new Date(), ' close connection:'+this.remoteAddress);
            return;
        }
		
        if(this.type === "tv"){
            for(var i=0;i<tv.length;i++){
                if(tv[i] === this){
                    tv.splice(i, 1);
                    console.log(new Date(), ' TV close connection:'+this.remoteAddress);
                }
            }
        }else if(this.type === "player"){
            for(var i=0;i<player.length;i++){
                if(player[i] === this){
                    player.splice(i, 1);
                    console.log(new Date(),' Player close connection:'+this.remoteAddress);
                }
            }
        }
    });
});
