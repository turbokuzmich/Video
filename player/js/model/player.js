(function($) {

	var Player = Base.extend({
		'defaults': {
			'selectors': {
				'player': '.player'
			},
			'videos': []
		},

		'initialize': function() {
		}
	});

	window.Player = Player;

})(jQuery);