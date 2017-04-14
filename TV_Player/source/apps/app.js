enyo.kind({
	name: "KukarekaTV.Application",
	kind: "enyo.Application",
	view: "KukarekaTV.PlayVideo.MainView",
	ws:null,
	connect:function(){
		this.disconnect();
		var url = '11.0.0.5';
		var app = this;
		
		try{
			this.ws = new WebSocket('ws://'+url+':8080');
		}catch(e){
			//console.log(e)
			return;
		}

		this.ws.onopen = function () {
			this.send(JSON.stringify({type:"tv"}));			
		};
		
		
		this.ws.onerror = function(error){
			//console.log(error);
			app.disconnect();
		};
	
		this.ws.onmessage = function (message) {
			try{
				var json = JSON.parse(message.data);
				app.view.src = json.video.url;
				app.view.srcChanged();
			}catch(error){
				console.log(error);
				return;
			}
		};
					
	},
	disconnect:function(){
		if(this.ws){
			this.ws.close();
			this.ws=null;
		}
	}
});
