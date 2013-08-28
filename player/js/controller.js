(function($) {

	var controller = new Controller;

	var player = videojs('player', {
		'width': 960,
		'height': 540,
		'controls': true,
		'nativeControlsForTouch': false
	}, function() {
		this.src('/videos/small.webm');
	});


	player.on('prev', function() {
		console.log('prev');
	});
	player.on('next', function() {
		console.log('next');
	});

})(jQuery);