function setVideoHook(video){
	if(video.hasHook===true){
		return;
	}
	
	video.addEventListener('play',function(event){
		try{
			chrome.runtime.sendMessage(this.currentSrc);
		}catch(e){
			console.log(e)
		}
	});
	video.hasHook=true;	
}

function searchStream(doc){
	var video = doc.getElementsByTagName('video'); 
	for(var i=0;i<video.length;i++){
		video[i].ownerDocument.addEventListener('DOMNodeInserted',function(event){
			if(event.target.nodeName==="VIDEO"){
				setVideoHook(event.target);
			}
		});
		setVideoHook(video[i]);
	}

	var frame = doc.getElementsByTagName('iframe'); 
	for(var i=0;i<frame.length;i++){
		try{
			searchStream(frame[i].contentWindow.document)
		}catch(e){
			console.log(e)
		}
	}
}
searchStream(document);
