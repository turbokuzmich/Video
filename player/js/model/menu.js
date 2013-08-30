(function($) {

	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = (function() {
			return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) {
				window.setTimeout(callback, 1000 / 60);
			};
		})();
	};

	var Menu = Base.extend({
		'defaults': {
			'platform': 'desktop',

			'selector_wrapper': '.top-panel-container',
			'selector_puller': '.pull',
			'selector_menu_scroll': '.menu-scroll',
			'selector_menu': '.menu',
			'selector_arrow_up': '.menu-arrow.m-up',
			'selector_arrow_down': '.menu-arrow.m-down',

			'template_menu_item': doT.template('<li>{{=it.name}}</li>'),
			'class_playing': 'm-playing',
			'class_open': 'm-open',

			'is_open': false,
			'bottom_open_y': 130,
			'correct_to_bottom': 350,
			'required_velocity': 20
		},

		'_findElements': function() {
			this.$wrapper = $(this.get('selector_wrapper'));
			this.$puller = this.$wrapper.find(this.get('selector_puller'));
			this.$menu_scroll = this.$wrapper.find(this.get('selector_menu_scroll'));
			this.$menu = this.$wrapper.find(this.get('selector_menu'));
			this.$arrow_up = this.$wrapper.find(this.get('selector_arrow_up'));
			this.$arrow_down = this.$wrapper.find(this.get('selector_arrow_down'));
		},

		'_bindEvents': function() {
			this.$menu.on('click', 'li', _.bind(this._onMenuItemClick, this));
		},

		'_bindMenuScroll': function() {
			var that = this
			,	$scroll = this.$menu_scroll
			,	$menu = this.$menu
			,	$arrow_up = this.$arrow_up
			,	$arrow_down = this.$arrow_down
			,	$win = $(window)

			,	scroll_height = 0
			,	menu_height = 0
			,	scroll = 0
			,	speed = 120

			,	dir = 0
			,	last_tick = 0;

			var defineHeights = function() {
				scroll_height = $scroll.height();
				menu_height = $menu.height();
			};

			var checkArrows = function() {
				if (menu_height < scroll_height) {
					$arrow_up.addClass('hide');
					$arrow_down.addClass('hide');
				} else {
					$arrow_up.removeClass('hide');
					$arrow_down.removeClass('hide');
				};
			};

			var correctScroll = function() {
				if (menu_height < scroll_height) {
					scroll = 0;
				} else if (scroll > (menu_height - scroll_height)) {
					scroll = menu_height - scroll_height;
				};

				$scroll.scrollTop(scroll);
			};

			var tick = function() {
				if (dir != 0) {
					var now = +(new Date)
					,	stop = false
					,	time_delta = now - last_tick
					,	scroll_delta = (time_delta / 1000) * speed;

					if (dir < 0) {
						scroll -= scroll_delta;
					} else {
						scroll += scroll_delta;
					};

					if (scroll < 0) {
						scroll = 0;
						stop = true;
					};
					if (scroll > (menu_height - scroll_height)) {
						scroll = menu_height - scroll_height;
						stop = true;
					};

					$scroll.scrollTop(scroll);

					if (!stop) {
						requestAnimationFrame(tick);
					}

					last_tick = now;
				};
			};

			var updateMenu = function() {
				defineHeights();
				checkArrows();
				correctScroll();
			};

			$arrow_up.on({
				'mousedown touchstart': function(e) {
					e.preventDefault();

					dir = -1;
					last_tick = +(new Date);

					tick();
				},
				'mouseup touchend': function() {
					dir = 0;
					last_tick = 0;
				},
				'click': function(e) {
					e.preventDefault();
				}
			});

			$arrow_down.on({
				'mousedown touchstart': function(e) {
					e.preventDefault()

					dir = 1;
					last_tick = +(new Date);

					tick();
				},
				'mouseup touchend': function() {
					dir = 0;
					last_tick = 0;
				},
				'click': function(e) {
					e.preventDefault();
				}
			});

			$win.on('orientationchange', updateMenu);
			this.listen('playerFullscreen', updateMenu);
			updateMenu();
		},

		'_wirePullerDrag': function() {
			var that = this
			,	$puller = this.$puller
			,	$wrapper = this.$wrapper
			,	$body = $('body')

			,	is_dragging = false
			,	b_init = null
			,	t_start = null
			,	t_prev = null
			,	t_now = null;

			var reset = function() {
				is_dragging = false;
				b_init = null;
				t_start = null;
				t_prev = null;
				t_now = null;
			};

			var performCorrection = function() {
				var	req_vel = that.get('required_velocity')
				,	cor_bot = that.get('correct_to_bottom')
				,	vel = Math.abs(t_now - t_prev)
				,	dir = ((t_now - t_prev) > 0) ? 1 : -1 // 1 down -1 up
				,	bot = b_init - (t_now - t_start);

				if (dir > 0) { // down
					if (bot <= cor_bot || vel >= req_vel) {
						that._openMenu();
					} else {
						that._closeMenu();
					};
				} else {
					if (bot > cor_bot || vel >= req_vel) {
						that._closeMenu();
					} else {
						that._openMenu();
					};
				};
			};

			$puller.on('touchstart', function(e) {
				e.preventDefault();
                e.stopPropagation();

                e = e.originalEvent.changedTouches[0];

                is_dragging = true;
                b_init = -$wrapper.offset().top;
                t_start = e.pageY;
                t_prev = e.pageY;
                t_now = e.pageY;

                that.fire('menuDragStart');
			});

			$body.on('touchmove', function(e) {
                e = e.originalEvent.changedTouches[0];

                var d;

                if (is_dragging) {
                	t_prev = t_now;
                	t_now = e.pageY;
                	d = t_now - t_start;

                	$wrapper.css('bottom', b_init - d);

                	that.fire('menuDrag');
                };
			});

			$body.on('touchend', function(e) {
                e = e.originalEvent.changedTouches[0];

                if (is_dragging) {
                	performCorrection();
                	reset();

                	that.fire('menuDragEnd');
                };
			});
		},

		'_wirePuller': function() {
			var platform = this.get('platform')
			,	that = this;

			if (platform === 'mobile') {
				this._wirePullerDrag();
			} else {
				this.$puller.on('click', function() {
					if (that.get('is_open')) {
						that._closeMenu();
					} else {
						that._openMenu();
					};
				});
			};
		},

		'_openMenu': function() {
			var platform = this.get('platform')
			,	open_class = this.get('class_open')
			,	that = this;

			if (platform === 'mobile') {
				this.$wrapper.transit({
					'bottom': this.get('bottom_open_y')
				}, 200, function() {
					that.$wrapper.addClass(open_class).attr('style', '');
					that.set('is_open', true);
					that.fire('menuOpen');
				});
			} else {
				this.$wrapper.addClass(open_class);
				this.set('is_open', true);
				this.fire('menuOpen');
			};
		},

		'_closeMenu': function() {
			var platform = this.get('platform')
			,	open_class = this.get('class_open')
			,	that = this;

			if (platform === 'mobile') {
				this.$wrapper.transit({
					'bottom': this.$wrapper.height()
				}, 200, function() {
					that.$wrapper.removeClass(open_class).attr('style', '');
					that.set('is_open', false);
					that.fire('menuClose');
				});
			} else {
				this.$wrapper.removeClass(open_class);
				this.set('is_open', false);
				this.fire('menuClose');
			};
		},

		'_buildMenu': function(data) {
			var html = ''
			,	template = this.get('template_menu_item');

			_.each(data, function(video) {
				html += template(video);
			});

			this.$menu.html(html);
		},

		'_onPlayerPlay': function(index) {
			var playing_class = this.get('class_playing');

			this.$menu.children().removeClass(playing_class).eq(index).addClass(playing_class);
			this._closeMenu();
		},

		'_onPlayerPause': function() {
			this.$menu.children().removeClass(this.get('class_playing'));
		},

		'_onMenuItemClick': function(e) {
			e.preventDefault();

			var $item = $(e.target)
			,	index = $item.index()
			,	is_playing = $item.hasClass(this.get('class_playing'));

			var data = {
				'index': index
			};

			if (is_playing) {
				this.fire('menuItemPause', data);
			} else {
				this.fire('menuItemPlay', data);
			};
		},

		'initialize': function() {
			var that = this;

			this._findElements();
			this._bindEvents();

			this.fire('platformRequest', function(platform) {
				that.set('platform', platform);
				that._wirePuller();
			});

			this.listen('playerGotVideos', function(event, data) {
				that._buildMenu(data);
				that._bindMenuScroll();
			});

			this.listen('playerPlay', function(event, data) {
				if (data.type == 'video') {
					that._onPlayerPlay(data.index);
				};
			});

			this.listen('playerPause', function(event, data) {
				if (data.type == 'video') {
					that._onPlayerPause();
				};
			});
		}
	});

	window.Menu = Menu;

})(jQuery);