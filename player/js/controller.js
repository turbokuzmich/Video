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
				'path': 'videos/mrisksP1',
				'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка (ч. 1)',
				'misc': {
					'path': 'videos/mrisksG1',
					'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка (ч. 1)'
				}
			}, {
				'path': 'videos/mrisksP2',
				'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка (ч. 2)',
				'misc': {
					'path': 'videos/mrisksG2',
					'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка (ч. 2)'
				}
			}, {
				'path': 'videos/mrisksP3',
				'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка (ч. 3)',
				'misc': {
					'path': 'videos/mrisksG3',
					'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка (ч. 3)'
				}
			}, {
				'path': 'videos/mrisksP4',
				'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка (ч. 4)',
				'misc': {
					'path': 'videos/mrisksG4',
					'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка (ч. 4)'
				}
			}, {
				'path': 'videos/mrisksP5',
				'name': 'Кредитный риск'
			}, {
				'path': 'videos/mrisksP6',
				'name': 'Модель LGD',
				'misc': {
					'path': 'videos/mrisksG6',
					'name': 'Модель LGD'
				}
			}, {
				'path': 'videos/mrisksP7',
				'name': 'Стоимость под риском дефолта. Модель EAD'
			}, {
				'path': 'videos/mrisksP8',
				'name': 'Рыночный риск',
				'misc': {
					'path': 'videos/mrisksG8',
					'name': 'Рыночный риск'
				}
			}, {
				'path': 'videos/mrisksP9',
				'name': 'Надбавка за риск торговой книги',
				'misc': {
					'path': 'videos/mrisksG9',
					'name': 'Надбавка за риск торговой книги'
				}
			}, {
				'path': 'videos/mrisksP10',
				'name': 'Операционный риск'
			}, {
				'path': 'videos/mrisksP11',
				'name': 'Внешние и внутренние данные о потерях. Сбор данных о потерях (ч. 1)',
				'misc': {
					'path': 'videos/mrisksG11',
					'name': 'Внешние и внутренние данные о потерях. Сбор данных о потерях (ч. 1)'
				}
			}, {
				'path': 'videos/mrisksP12',
				'name': 'Внешние и внутренние данные о потерях. Сбор данных о потерях (ч. 2)',
				'misc': {
					'path': 'videos/mrisksG12',
					'name': 'Внешние и внутренние данные о потерях. Сбор данных о потерях (ч. 2)'
				}
			}, {
				'path': 'videos/mrisksP13',
				'name': 'Внешние и внутренние данные о потерях. Сбор данных о потерях (ч. 3)',
				'misc': {
					'path': 'videos/mrisksG13',
					'name': 'Внешние и внутренние данные о потерях. Сбор данных о потерях (ч. 3)'
				}
			}, {
				'path': 'videos/mrisksP14',
				'name': 'Прочие риски'
			}, {
				'path': 'videos/mrisksP15',
				'name': 'Процессы. На примере корпоративного кредитного риска (ч. 1)'
			}, {
				'path': 'videos/mrisksP16',
				'name': 'Процессы. На примере корпоративного кредитного риска (ч. 2)'
			}, {
				'path': 'videos/mrisksP17',
				'name': 'Активы, взвешенные с учетом риска',
				'misc': {
					'path': 'videos/mrisksG17',
					'name': 'Активы, взвешенные с учетом риска'
				}
			}, {
				'path': 'videos/mrisksP18',
				'name': 'Расчет экономического капитала'
			}, {
				'path': 'videos/mrisksP19',
				'name': 'Стресс-тестирование',
				'misc': {
					'path': 'videos/mrisksG19',
					'name': 'Стресс-тестирование'
				}
			}, {
				'path': 'videos/mrisksP20',
				'name': 'Аппетит к риску. Лимиты. Процесс стратегического и бизнес-планирования',
				'misc': {
					'path': 'videos/mrisksG20',
					'name': 'Аппетит к риску. Лимиты. Процесс стратегического и бизнес-планирования'
				}
			}, {
				'path': 'videos/mrisksP21',
				'name': 'Заключительное слово'
			}]
		});

})(jQuery);