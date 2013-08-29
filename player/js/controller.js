(function($) {

	var controller = new Controller
	,	menu = new Menu
	,	player = new Player({
			'player': {
				'width': '100%',
				'height': '100%',
				'controls': true,
				'nativeControlsForTouch': false
			},
			'videos': [
				{
					'path': '../videos/video_1',
					'name': 'Мужик в синем пиджаке',
					'misc': []
				},
				{
					'path': '../videos/video_2',
					'name': 'Красиво летящие птицы',
					'misc': []
				},
				{
					'path': '../videos/misc_1',
					'name': 'Отрывок из мультфильма про монстров',
					'misc': []
				},
				{
					'path': '../videos/misc_2',
					'name': 'Отличные кадры про нашу планету',
					'misc': []
				}
			]
		});

})(jQuery);