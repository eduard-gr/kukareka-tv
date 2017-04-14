enyo.ready(function () {
	//console.log('ready');
	
	var app = new KukarekaTV.Application({name: "app"});
	app.connect();
/*,
	constructor: function(){
		console.log('constructor');
		var self=this;
		document.addEventListener("keydown", function(inEvent){
			switch(inEvent.keyCode){
				case 415://play

				break;
				case 19://PAUSE
				case 413://STOP

				break;
				case 417://RIGHT
				
				break;
				case 412://LEFT
				
				break;
			}
		}, false);
	}*/	
	//console.log(app);
});
