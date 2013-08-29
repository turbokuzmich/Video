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
				'pause_threshold': 0.4,
				'misc_button_visible': 'm-visible'
			}
		},

		'player': null,

		'video': null,
		'misc': null,

		'video_paused_at': null,

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

				var index = $(this).data('misc');

				if (index != null) {
					that._playMisc(index);
				};
			});
		},

		'_processMiscs': function() {
			var videos = this.get('videos')
			,	thres = this.get('settings').pause_threshold
			,	half = thres / 2;

			_.each(videos, function(video) {
				var miscs = video.misc;

				_.each(miscs, function(misc) {
					misc.start -= half;
					misc.end = misc.start + thres;
					misc.suspend = false;
				});
			});
		},

		'_setupPlayer': function() {
			var that = this
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
								'data': that.get('videos')[that.video].misc[that.misc]
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
								'data': that.get('videos')[that.video].misc[that.misc]
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
								'data': that.get('videos')[that.video].misc[that.misc]
							});
						};
					});

					this.on('prev', function() {
						that.fire('playerPrev');
					});

					this.on('next', function() {
						that.fire('playerNext');
					});

					this.on('timeupdate', function() {
						var time = this.currentTime()
						,	miscs = that.get('videos')[that.video].misc;

						if (that.misc == null) {
							_.each(miscs, function(misc, index) {
								if (misc.suspend) {
									if (time < misc.start || time > misc.end) {
										misc.suspend = false;
									};
								} else {
									if (time >= misc.start && time <= misc.end) {
										that._miscInvitation(index);
									};
								}
							});
						};
					});

					that.fire('playerGotVideos', that.get('videos'));
					that.fire('playerReady');

					that._setVideo(0);
				});
		},

		'_setVideo': function(index) {
			var video_data = this.get('videos')[index];

			this.video = index;
			this.player.src([
				{
					'type': 'video/mp4',
					'src': video_data.path + '.mp4'
				}, {
					'type': 'video/webm',
					'src': video_data.path + '.webm'
				}, {
					'type': 'video/ogg',
					'src': video_data.path + '.flv'
				}
			]);
		},

		'_playVideo': function(index, time) {
			this.misc = null;
			this._setVideo(index);

			var player = this.player
			,	wait_timer
			,	cb;

			if (time == null) {
				player.play();
			} else {
				player.on('loadedmetadata', function() {
					time = parseFloat(time.toFixed(1));
					cb = arguments.callee;
					wait_timer = setInterval(function() {
						if (player.tech.el_.seekable.length) {
							player.currentTime(time);
							player.play();

							player.off('loadedmetadata', cb);
							clearInterval(wait_timer);
						};
					}, 50);
				});
			};
		},

		'_setMisc': function(index) {
			var video_data = this.get('videos')[this.video].misc[index];

			this.misc = index;
			this.player.src([
				{
					'type': 'video/mp4',
					'src': video_data.path + '.mp4'
				}, {
					'type': 'video/webm',
					'src': video_data.path + '.webm'
				}, {
					'type': 'video/ogg',
					'src': video_data.path + '.flv'
				}
			]);
		},

		'_playMisc': function(index, time) {
			this._setMisc(index);

			var player = this.player
			,	wait_timer
			,	cb

			if (time == null) {
				player.play();
			} else {
				player.on('loadedmetadata', function() {
					time = parseFloat(time.toFixed(1));
					cb = arguments.callee;
					wait_timer = setInterval(function() {
						if (player.tech.el_.seekable.length) {
							player.currentTime(time);
							player.play();

							player.off('loadedmetadata', cb);
							clearInterval(wait_timer);
						};
					}, 50);
				});
			};
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

		'_miscInvitation': function(index) {
			var misc = this.get('videos')[this.video].misc[index];
				misc.suspend = true;

			this.$misc
				.addClass(this.get('settings').misc_button_visible)
				.data('misc', index);

			this._pauseVideo();
			this.fire('playerMiscFound', {
				'video': this.video,
				'misc': index
			});
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
					this.video_paused_at = null;
					break;
				case 'misc':
					break;
			};

			this.$misc
				.removeClass(this.get('settings').misc_button_visible)
				.data('misc', null);
		},

		'_onPlayerPause': function(event, data) {
			switch (data.type) {
				case 'video':
					this.video_paused_at = this.player.currentTime();
					break;
				case 'misc':
					break;
			};
		},

		'_onPlayerEnded': function(event, data) {
			switch (data.type) {
				case 'video':
					this._playNext();
					break;
				case 'misc':
					this._playVideo(this.video, this.video_paused_at);
					break;
			}
		},

		'initialize': function() {
			this._findElements();
			this._bindEvents();
			this._processMiscs();
			this._setupPlayer();
		}
	});

	window.Player = Player;

})(jQuery);