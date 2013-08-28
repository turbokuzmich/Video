(function($) {

	var Base = Backbone.Model.extend({
		'fire': function() {
			$(document).trigger.apply(this, arguments);
		},
		'listen': function(event, cb) {
			$(document).on(event, cb);
		}
	});

	window.Base = Base;

})(jQuery);