(function($) {

	var player
	,	videos = [{
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP1',
			'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка',
			'misc': {
				'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksG1',
				'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка'
			}
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP2',
			'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка',
			'hide': true,
			'misc': {
				'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksG2',
				'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка'
			}
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP3',
			'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка',
			'hide': true,
			'misc': {
				'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksG3',
				'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка'
			}
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP4',
			'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка',
			'hide': true,
			'misc': {
				'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksG4',
				'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка'
			}
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP5',
			'name': 'Кредитный риск'
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP6',
			'name': 'Модель LGD',
			'misc': {
				'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksG6',
				'name': 'Модель LGD'
			}
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP7',
			'name': 'Стоимость под риском дефолта. Модель EAD'
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP8',
			'name': 'Рыночный риск',
			'misc': {
				'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksG8',
				'name': 'Рыночный риск'
			}
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP9',
			'name': 'Надбавка за риск торговой книги',
			'misc': {
				'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksG9',
				'name': 'Надбавка за риск торговой книги'
			}
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP10',
			'name': 'Операционный риск'
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP11',
			'name': 'Внешние и внутренние данные о потерях. Сбор данных о потерях',
			'misc': {
				'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksG11',
				'name': 'Внешние и внутренние данные о потерях. Сбор данных о потерях'
			}
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP12',
			'name': 'Внешние и внутренние данные о потерях. Сбор данных о потерях',
			'hide': true,
			'misc': {
				'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksG12',
				'name': 'Внешние и внутренние данные о потерях. Сбор данных о потерях'
			}
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP13',
			'name': 'Внешние и внутренние данные о потерях. Сбор данных о потерях',
			'hide': true,
			'misc': {
				'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksG13',
				'name': 'Внешние и внутренние данные о потерях. Сбор данных о потерях'
			}
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP14',
			'name': 'Прочие риски'
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP15',
			'name': 'Процессы. На примере корпоративного кредитного риска'
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP16',
			'name': 'Процессы. На примере корпоративного кредитного риска',
			'hide': true
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP17',
			'name': 'Активы, взвешенные с учетом риска',
			'misc': {
				'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksG17',
				'name': 'Активы, взвешенные с учетом риска'
			}
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP18',
			'name': 'Расчет экономического капитала'
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP19',
			'name': 'Стресс-тестирование',
			'misc': {
				'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksG19',
				'name': 'Стресс-тестирование'
			}
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP20',
			'name': 'Аппетит к риску. Лимиты. Процесс стратегического и бизнес-планирования',
			'misc': {
				'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksG20',
				'name': 'Аппетит к риску. Лимиты. Процесс стратегического и бизнес-планирования'
			}
		}, {
			'path': 'https://sberbank-school.ru/video/synergy/risks/videos/mrisksP21',
			'name': 'Заключительное слово'
		}];

	/*,	videos = [{
			'path': 'video/mrisksP1',
			'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка',
			'misc': {
				'path': 'video/mrisksG1',
				'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка'
			}
		}, {
			'path': 'video/mrisksP2',
			'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка',
			'hide': true,
			'misc': {
				'path': 'video/mrisksG2',
				'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка'
			}
		}, {
			'path': 'video/mrisksP3',
			'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка',
			'hide': true,
			'misc': {
				'path': 'video/mrisksG3',
				'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка'
			}
		}, {
			'path': 'video/mrisksP4',
			'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка',
			'hide': true,
			'misc': {
				'path': 'video/mrisksG4',
				'name': 'Предпосылки построения системы интегрированного управления рисками Сбербанка'
			}
		}, {
			'path': 'video/mrisksP5',
			'name': 'Кредитный риск'
		}, {
			'path': 'video/mrisksP6',
			'name': 'Модель LGD',
			'misc': {
				'path': 'video/mrisksG6',
				'name': 'Модель LGD'
			}
		}, {
			'path': 'video/mrisksP7',
			'name': 'Стоимость под риском дефолта. Модель EAD'
		}, {
			'path': 'video/mrisksP8',
			'name': 'Рыночный риск',
			'misc': {
				'path': 'video/mrisksG8',
				'name': 'Рыночный риск'
			}
		}, {
			'path': 'video/mrisksP9',
			'name': 'Надбавка за риск торговой книги',
			'misc': {
				'path': 'video/mrisksG9',
				'name': 'Надбавка за риск торговой книги'
			}
		}, {
			'path': 'video/mrisksP10',
			'name': 'Операционный риск'
		}, {
			'path': 'video/mrisksP11',
			'name': 'Внешние и внутренние данные о потерях. Сбор данных о потерях',
			'misc': {
				'path': 'video/mrisksG11',
				'name': 'Внешние и внутренние данные о потерях. Сбор данных о потерях'
			}
		}, {
			'path': 'video/mrisksP12',
			'name': 'Внешние и внутренние данные о потерях. Сбор данных о потерях',
			'hide': true,
			'misc': {
				'path': 'video/mrisksG12',
				'name': 'Внешние и внутренние данные о потерях. Сбор данных о потерях'
			}
		}, {
			'path': 'video/mrisksP13',
			'name': 'Внешние и внутренние данные о потерях. Сбор данных о потерях',
			'hide': true,
			'misc': {
				'path': 'video/mrisksG13',
				'name': 'Внешние и внутренние данные о потерях. Сбор данных о потерях'
			}
		}, {
			'path': 'video/mrisksP14',
			'name': 'Прочие риски'
		}, {
			'path': 'video/mrisksP15',
			'name': 'Процессы. На примере корпоративного кредитного риска'
		}, {
			'path': 'video/mrisksP16',
			'name': 'Процессы. На примере корпоративного кредитного риска',
			'hide': true
		}, {
			'path': 'video/mrisksP17',
			'name': 'Активы, взвешенные с учетом риска',
			'misc': {
				'path': 'video/mrisksG17',
				'name': 'Активы, взвешенные с учетом риска'
			}
		}, {
			'path': 'video/mrisksP18',
			'name': 'Расчет экономического капитала'
		}, {
			'path': 'video/mrisksP19',
			'name': 'Стресс-тестирование',
			'misc': {
				'path': 'video/mrisksG19',
				'name': 'Стресс-тестирование'
			}
		}, {
			'path': 'video/mrisksP20',
			'name': 'Аппетит к риску. Лимиты. Процесс стратегического и бизнес-планирования',
			'misc': {
				'path': 'video/mrisksG20',
				'name': 'Аппетит к риску. Лимиты. Процесс стратегического и бизнес-планирования'
			}
		}, {
			'path': 'video/mrisksP21',
			'name': 'Заключительное слово'
		}];*/

	if (ie8) {
		player = {
			'isFullyWatched': function() {
				return _.every(videos, function(vid) {
					return !!vid.watched;
				});
			}
		};

		window.setWatched = function(index) {
			videos[index].watched = true;
		};
		window.swfLoaded = function() {
			(ie ? window : document)['player'].setVideos(videos);
		};

		var flashvars = {}
		,	params = { "allowScriptAccess": "always", "wmode" : "transparent" }
		,	attributes = { "id": "player" };

		$('.wrap').remove();
		$('.ie8-player-container').removeClass('hide');

		swfobject.embedSWF("player.swf", "ie8-player", "960", "540", "11.0.0", "/js/libz/swfobject/expressInstall.swf", flashvars, params, attributes);
	} else {
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
				'videos': videos
			});
	};
	
	// скормление
	(function() {
	    pipwerks.SCORM.version = '1.2';
	    var unloaded = false;
	    
	    function sendScore(score) {
	        score = parseInt(score);

	        pipwerks.SCORM.set("cmi.core.score.raw", "" + score);
			pipwerks.SCORM.set("cmi.core.lesson_status", "completed");
	        pipwerks.SCORM.save();
	    };

	    function unloadHandler(){
	        if (!unloaded) {
	        	pipwerks.SCORM.init();
	        	if (player.isFullyWatched()) {
	        		sendScore(100);
	        	};
	            pipwerks.SCORM.quit();
	            unloaded = true;
	        };
	    };

	    window.onbeforeunload = unloadHandler;
	    window.onunload = unloadHandler;
	})();

})(jQuery);