(function($) {

	var Player = Base.extend({
		'defaults': {
			'selectors': {
				'player': '#player',
				'misc': '.button-misc'
			},

			'player': {},

			'videos': [],

			'settings': {
				'prev_threshold': 5,
				'misc_show_at': -15,
				'misc_hide_at': -5,
				'misc_button_visible_class': 'm-visible'
			}
		},

		'player': null,

		'video': null,
		'misc': null,

		'misc_button_visible': false,
		'should_show_misc': false,

		'_findElements': function() {
			this.$misc = $(this.get('selectors').misc);
		},

		'_bindEvents': function() {
			var that = this;

			this.listen('menuItemPlay', _.bind(this._onMenuItemPlay, this));
			this.listen('menuItemPause', _.bind(this._onMenuItemPause, this));
			this.listen('playerPlay', _.bind(this._onPlayerPlay, this));
			this.listen('playerPause', _.bind(this._onPlayerPause, this));
			this.listen('playerEnded', _.bind(this._onPlayerEnded, this));
			this.listen('playerPrev', _.bind(this._onPlayerPrev, this));
			this.listen('playerNext', _.bind(this._onPlayerNext, this));

			this.$misc.on('click', function(e) {
				e.preventDefault();

				that._hideMiscButton();
				that.should_show_misc = true;
			});
		},

		'_setupPlayer': function() {
			var that = this
			,	misc_show_at = this.get('settings').misc_show_at
			,	misc_hide_at = this.get('settings').misc_hide_at

			,	$player = $(this.get('selectors').player)

			,	player = videojs($player.attr('id'), this.get('player'), function() {
					that.player = this;

					this.on('play', function() {
						if (that.misc == null) {
							that.fire('playerPlay', {
								'type': 'video',
								'index': that.video,
								'data': that.get('videos')[that.video]
							});
						} else {
							that.fire('playerPlay', {
								'type': 'misc',
								'index': that.misc,
								'data': that.get('videos')[that.video].misc
							});
						};
					});

					this.on('pause', function() {
						if (that.misc == null) {
							that.fire('playerPause', {
								'type': 'video',
								'index': that.video,
								'data': that.get('videos')[that.video]
							});
						} else {
							that.fire('playerPause', {
								'type': 'misc',
								'index': that.misc,
								'data': that.get('videos')[that.video].misc
							});
						};
					});

					this.on('ended', function() {
						if (that.misc == null) {
							that.fire('playerEnded', {
								'type': 'video',
								'index': that.video,
								'data': that.get('videos')[that.video]
							});
						} else {
							that.fire('playerEnded', {
								'type': 'misc',
								'index': that.misc,
								'data': that.get('videos')[that.video].misc
							});
						};
					});

					this.on('fullscreenchange', function() {
						that.fire('playerFullscreen', this.isFullScreen);
					});

					this.on('prev', function() {
						that.fire('playerPrev');
					});

					this.on('next', function() {
						that.fire('playerNext');
					});

					this.on('timeupdate', function() {
						var time = this.currentTime()
						,	duration = this.duration()
						,	misc = that.get('videos')[that.video].misc;

						if (that.misc == null && !that.should_show_misc && misc) {
							if (time >= (duration + misc_show_at) && time <= (duration + misc_hide_at)) {
								that._showMiscButton();
							} else {
								that._hideMiscButton();
							};
						};
					});

					that.fire('playerGotVideos', that.get('videos'));
					that.fire('playerReady');

					that._setVideo(0);
				});

		},

		'_src': function(path) {
			this.player.src([
				{
					'type': 'video/mp4',
					'src': path + '.mp4'
				}, {
					'type': 'video/webm',
					'src': path + '.webm'
				}, {
					'type': 'video/flv',
					'src': path + '.flv'
				}
			]);
		},

		'_play': function(time) {
			var player = this.player
			,	tech = player.techName.toLowerCase();

			if (time == null) {
				player.play();
			} else {
				if (tech === 'flash') {
					player.on('playing', function() {
						var playing_cb = arguments.callee;

						player.pause();
						player.off('playing', playing_cb);

						player.on('canplaythrough', function() {
							var canplaythrough_cb = arguments.callee;

							player.currentTime(time);
							player.play();
							player.off('canplaythrough', canplaythrough_cb);
						});
					});
					player.play();
				} else {
					player.on('loadedmetadata', function() {
						var loadedmetadata_cb = arguments.callee
						,	wait_timer;

						wait_timer = setInterval(function() {
							if (player.tech.el_.seekable.length) {
								player.currentTime(time);
								player.play();

								player.off('loadedmetadata', loadedmetadata_cb);
								clearInterval(wait_timer);
							};
						}, 20);
					});
				};
			};
		},

		'_setVideo': function(index) {
			this.video = index;

			this._src(this.get('videos')[index].path);
		},

		'_playVideo': function(index, time) {
			this.misc = null;
			this.should_show_misc = false;
			this._setVideo(index);
			this._play(time);
		},

		'_setMisc': function(index) {
			this.misc = index;
			
			this._src(this.get('videos')[this.video].misc.path);
		},

		'_playMisc': function(index, time) {
			this._setMisc(index);
			this._play(time);
		},

		'_pauseVideo': function() {
			this.player.pause();
		},

		'_resumeVideo': function() {
			this.player.play();
		},

		'_playPrev': function() {
			if (this.misc != null) return;

			var videos = this.get('videos')
			,	video = this.video
			,	time = this.player.currentTime()
			,	threshold = this.get('settings').prev_threshold;

			if (video == null) {
				this._setVideo(videos.length - 1);
				return;
			} else {
				if (time < threshold) {
					video--;
					if (video === -1) video = videos.length - 1;

					this._playVideo(video);
				} else {
					this.player.currentTime(0);
				};
			};
		},

		'_playNext': function() {
			if (this.misc != null) return;

			var videos = this.get('videos')
			,	video = this.video;

			if (video == null) {
				this._setVideo(0);
				return;
			} else {
				video++;
				if (video === videos.length) video = 0;

				this._playVideo(video);
			};
		},

		'_showMiscButton': function() {
			if (this.misc_button_visible) return;
				this.misc_button_visible = true;

			this.$misc.addClass(this.get('settings').misc_button_visible_class);
		},

		'_hideMiscButton': function() {
			if (this.misc_button_visible === false) return;
				this.misc_button_visible = false;

			this.$misc.removeClass(this.get('settings').misc_button_visible_class);
		},

		'_onMenuItemPlay': function(event, data) {
			var index = data.index;

			if (index === this.video) {
				if (this.misc == null) {
					this._resumeVideo();
				} else {
					this._playVideo(this.video, this.video_paused_at);
				};
			} else {
				this._playVideo(index);
			};
		},

		'_onMenuItemPause': function(event, data) {
			this._pauseVideo();
		},

		'_onPlayerPrev': function(event) {
			this._playPrev();
		},

		'_onPlayerNext': function(event) {
			this._playNext();
		},

		'_onPlayerPlay': function(event, data) {
			switch (data.type) {
				case 'video':
					break;
				case 'misc':
					break;
			};
		},

		'_onPlayerPause': function(event, data) {
			switch (data.type) {
				case 'video':
					break;
				case 'misc':
					break;
			};
		},

		'_onPlayerEnded': function(event, data) {
			switch (data.type) {
				case 'video':
					if (this.should_show_misc) {
						this._playMisc(this.video);
					} else {
						this._playNext();
					};
					break;
				case 'misc':
					this.should_show_misc = false;
					this.misc = null;
					this._playNext();
					break;
			}
		},

		'initialize': function() {
			this._findElements();
			this._bindEvents();
			this._setupPlayer();
		}
	});

	window.Player = Player;

})(jQuery);