enyo.kind({
	name: "KukarekaTV.PlayVideo.MainView",
	kind: "moon.VideoPlayer",
 	autoplay: true,
	tap: function() {
		this.showFSControls();
		return true;
	}
});
