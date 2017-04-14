chrome.runtime.onMessage.addListener(function(src, sender, sendResponse){
	if(!src){
		return;
	}
	
	if(!window.playlist){
		window.playlist = new Array();
	}
	
	window.playlist.push(src);

});
