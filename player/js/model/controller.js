(function($) {

	var Controller = Base.extend({
		'defaults': {
			'selector_container': '.wrap',

			'class_pre_init': 'pre-init',
			'default_title': 'Видеоплеер'
		},

		'isMobile': {
			Android: function() {
		        return navigator.userAgent.match(/Android/i);
		    },
		    BlackBerry: function() {
		        return navigator.userAgent.match(/BlackBerry/i);
		    },
		    iOS: function() {
		        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		    },
		    'iPad': function() {
		    	return navigator.userAgent.match(/iPad/i);
		    },
		    'iPhone': function() {
		    	return navigator.userAgent.match(/iPhone|iPod/i);
		    },
		    Opera: function() {
		        return navigator.userAgent.match(/Opera Mini/i);
		    },
		    Windows: function() {
		        return navigator.userAgent.match(/IEMobile/i);
		    },
		    any: function() {
		        return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
		    }
		},

		'_onPlatformRequested': function(e, cb) {
			if (this.isMobile.any()) {
				cb('mobile');
			} else {
				cb('desktop');
			};
		},

		'_onPlayerReady': function() {
			$(this.get('selector_container')).removeClass(this.get('class_pre_init'));
		},

		'_onPlayerPlay': function(event, data) {
			this._updateTitle('▶ ' + data.data.name);
		},

		'_onPlayerPause': function(event, data) {
			this._updateTitle(data.data.name);
		},

		'_onPlayerEnded': function() {
			this._updateTitle();
		},

		'_updateTitle': function(title) {
			if (!title) {
				title = this.get('default_title');
			};

			document.title = title;
		},

		'_bindEvents': function() {
			this.listen('platformRequest', _.bind(this._onPlatformRequested, this));
			this.listen('playerReady', _.bind(this._onPlayerReady, this));
			this.listen('playerPlay', _.bind(this._onPlayerPlay, this));
			this.listen('playerPause', _.bind(this._onPlayerPause, this));
			this.listen('playerEnded', _.bind(this._onPlayerEnded, this));
		},

		'initialize': function() {
			this._bindEvents();
			this._updateTitle();
		}
	});

	window.Controller = Controller;

})(jQuery);