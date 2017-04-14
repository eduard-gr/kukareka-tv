function share(src){
	var WS = (window.WebSocket || window.MozWebSocket),
		connection;

	try{
		connection = new WS('ws://10.0.0.5:8080');
	}catch(e){
		alert('Cant connect to server');
		return;
	}
	
	connection.onopen=function(){
		this.send(JSON.stringify({type:"player"}));
		this.send(JSON.stringify({video:{url:src}}));
		alert(src);
		this.close();
	};
	
	connection.onclose=function(event){
		switch(event.code){
			case 1000:
				//"Normal closure, meaning that the purpose for which the connection was established has been fulfilled."
			break;
			case 1001:
				alert("An endpoint is \"going away\", such as a server going down or a browser having navigated away from a page.");
			break;
			case 1002:
				alert("An endpoint is terminating the connection due to a protocol error");
			break;
			case 1003:
				alert("An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).");
			break;
			case 1004:
				alert("Reserved. The specific meaning might be defined in the future.");
			break;
			case 1005:
				alert("No status code was actually present.");
			break;
			case 1006:
				alert("The connection was closed abnormally, e.g., without sending or receiving a Close control frame");
			break;
			case 1007:
				alert("An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [http://tools.ietf.org/html/rfc3629] data within a text message).");
			break;
			case 1008:
				alert("An endpoint is terminating the connection because it has received a message that \"violates its policy\". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.");
			break;
			case 1009:
				alert("An endpoint is terminating the connection because it has received a message that is too big for it to process.");
			break;
			case 1010:
				alert("An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: " + event.reason);
			break;
			case 1011:
				alert("A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.");
			break;
			case 1015:
				alert("The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).");
			break;
			default:
				alert("Unknown reason");
		}
	}
}

document.addEventListener('DOMContentLoaded', function() {
	
	document.getElementById('console').onclick=function(){
		var src = prompt("Kukareka TV", "");
		if (src != null) {
			share(src)
		}
	};

	document.getElementById('clear').onclick=function(){
		chrome.extension.getBackgroundPage().playlist=null;
		for(var i=0;i<playlist.length;i++){
			table.deleteRow(i);
		}
	};


	var playlist = chrome.extension.getBackgroundPage().playlist;
	
	if(!playlist){
		return;
	}
	
	var table = document.getElementById('list');
	for(var i=0;i<playlist.length;i++){
		var row = table.insertRow(),
			btn = document.createElement('BUTTON'),
			url = playlist[i],
			urn = url.substr(url.lastIndexOf("/") + 1);

		btn.classList.add('play');
		btn.src = url;
		btn.onclick=function(){share(this.src)};

		row.insertCell().textContent = urn;
		row.insertCell().appendChild(btn);
	}
	

});
