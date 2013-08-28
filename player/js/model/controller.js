(function($) {

	var Controller = Base.extend({
		'defaults': {
			'selectors': {
				'player': '.player'
			},
			'player': {
				'playlist': [
					[
						{ 'mp4'		:'../videos/small.mp4'	},
						{ 'webm'	:'../videos/small.webm'	},
						{ 'flv'		:'../videos/small.flv'	},
					]
				],
				'ratio': 320 / 560
			}
		},

		'initialize': function() {
			this._initPlayer();
		},

		'_initPlayer': function() {
			var selector = this.get('selectors').player
			,	settings = this.get('player');
		}
	});

	window.Controller = Controller;

})(jQuery);