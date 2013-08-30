(function($) {

	var controller = new Controller
	,	menu = new Menu
	,	player = new Player({
			'player': {
				'width': '100%',
				'height': '100%',
				'controls': true,
				'preload': true,
				'nativeControlsForTouch': false,

				'flash': {
					'swf': 'js/libz/videojs/video-js.swf'
				}
			},
			'videos': [{
				'path': '../videos/video_1',
				'name': 'Мужик в синем пиджаке',
				'misc': [{
					'start': 2.3,
					'path': '../videos/misc_1',
					'name': 'Отрывок из мультфильма про монстров'
				}]
			}, {
				'path': '../videos/video_2',
				'name': 'Красиво летящие птицы',
				'misc': [{
					'start': 5.7,
					'path': '../videos/misc_2',
					'name': 'Отличные кадры про нашу планету'
				}]
			}]
		});

})(jQuery);