(function($) {

	var Controller = Base.extend({
		'defaults': {
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

		'_bindEvents': function() {
			this.listen('platformRequest', _.bind(this._onPlatformRequested, this));
		},

		'initialize': function() {
			this._bindEvents();
		}
	});

	window.Controller = Controller;

})(jQuery);