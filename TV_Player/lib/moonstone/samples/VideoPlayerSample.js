
enyo.kind({
	name: "moon.sample.VideoPlayerSample",
	classes: "moon enyo-fit enyo-unselectable moon-video-player-sample",
	fit: true,
	components: [
		{
			name: "player",
			kind: "moon.VideoPlayer",
			src: "http://media.w3.org/2010/05/bunny/movie.mp4",
			poster: "assets/video-poster.png",
			autoplay:true,
			onPlaybackControlsTapped: "controlsTapped",
			infoComponents: [
				{kind: "moon.VideoInfoBackground", orient: "left", background: true, fit: true, components: [
					{
						kind: "moon.ChannelInfo",
						channelNo: "13",
						channelName: "AMC",
						classes: "moon-2h",
						components: [
							{content: "3D"},
							{content: "Live"},
							{content: "REC 08:22", classes: "moon-video-player-info-redicon "}
						]
					},
					{
						kind: "moon.VideoInfoHeader",
						title: "Downton Abbey - Extra Title",
						subTitle: "Mon June 21, 7:00 - 8:00pm",
						subSubTitle: "R - TV 14, V, L, SC",
						description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
						components: [
							{content: "Icon 1", classes: "moon-video-player-info-icon"},
							{content: "Icon 2", classes: "moon-video-player-info-icon"},
							{content: "Icon 3", classes: "moon-video-player-info-icon"}
						]
					}
				]},
				{kind: "moon.VideoInfoBackground", orient: "right", background: true, components: [
					{kind:"moon.Clock"}
				]}
			],
			components: [
				{kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png"},
				{kind: "moon.ToggleButton", name:"controlsToggleButton", content:"Controls"},
				{kind: "moon.Button", content:"Unload", ontap:"unload"},
				{kind: "moon.Button", content:"Reload", ontap:"load"},
				{kind: "moon.ToggleButton", content:"FF/Rewind", name:"ffrewToggleButton"},
				{kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png"},
				{kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png"},
				{kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png"},
				{kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png"},
				{kind: "moon.IconButton", src: "$lib/moonstone/images/video-player/icon-placeholder.png"}
			]
		},
		{kind:"moon.Dialog", name:"tapDialog", title:"The controls were tapped.", message:"Press OK to dismiss", components: [
			{kind:"moon.Button", content:"OK", ontap:"dismissTapDialog"}
		]}
	],
	bindings: [
		{from:".$.player.disablePlaybackControls", to:".$.controlsToggleButton.value", oneWay:false},
		{from:".$.player.showFFRewindControls", to:".$.ffrewToggleButton.value", oneWay:false}
	],
	controlsTapped: function() {
		this.$.tapDialog.show();
	},
	dismissTapDialog: function() {
		this.$.tapDialog.hide();
	},
	unload: function() {
		this.$.player.unload();
	},
	load: function() {
		this.$.player.unload();
		this.$.player.setSrc("http://media.w3.org/2010/05/bunny/movie.mp4");
	}
});
