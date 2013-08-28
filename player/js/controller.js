(function($) {

	var player = videojs('player', {
		'width': '100%',
		'height': '100%',
		'controls': true,
		'nativeControlsForTouch': false
	}, function() {
		this.src([
			{ type: "video/mp4", src: "/videos/small.mp4" },
			{ type: "video/webm", src: "/videos/small.webm" },
			{ type: "video/ogg", src: "/videos/small.flv" }
		]);
	});

})(jQuery);