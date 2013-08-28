(function($) {

	var Base = Backbone.Model.extend({
		'fire': function(event, args) {
			$(document).trigger(event, arguments);
		},
		'listen': function(event, cb) {
			var that = this;

			$(document).on(event, function(event, event_name, data) {
				cb.call(that, event, data);
			});
		}
	});

	window.Base = Base;

})(jQuery);