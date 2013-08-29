(function($) {

	var Player = Base.extend({
		'defaults': {
			'selectors': {
				'player': '#player',
				'misc': ''
			},

			'player': {},

			'videos': [],

			'settings': {
				'prev_threshold': 5,
				'pause_threshold': 0.4
			}
		},

		'player': null,
		'video': null,
		'misc': null,

		'_bindEvents': function() {
			this.listen('menuItemPlay', _.bind(this._onMenuItemPlay, this));
			this.listen('menuItemPause', _.bind(this._onMenuItemPause, this));
			this.listen('playerPrev', _.bind(this._onPlayerPrev, this));
			this.listen('playerNext', _.bind(this._onPlayerNext, this));
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
						that.fire('playerPlay', {
							'index': that.video,
							'data': that.get('videos')[that.video]
						})
					});

					this.on('pause', function() {
						that.fire('playerPause', {
							'index': that.video,
							'data': that.get('videos')[that.video]
						});
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

						_.each(miscs, function(misc, index) {
							if (misc.suspend) {
								if (time < misc.start || time > misc.end) {
									misc.suspend = false;
								};
							} else {
								if (time >= misc.start && time <= misc.end) {
									misc.suspend = true;
									player.pause();
									that.fire('playerMiscFound', {
										'video': that.video,
										'misc': index
									});
								};
							}
						});
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
			this._setVideo(index);
			this.player.play();
		},

		'_pauseVideo': function() {
			this.player.pause();
		},

		'_resumeVideo': function() {
			this.player.play();
		},

		'_onMenuItemPlay': function(event, data) {
			var index = data.index;

			if (index === this.video) {
				this._resumeVideo();
			} else {
				this._playVideo(index);
			};
		},

		'_onMenuItemPause': function(event, data) {
			this._pauseVideo();
		},

		'_onPlayerPrev': function(event) {
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

		'_onPlayerNext': function(event) {
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

		'initialize': function() {
			this._bindEvents();
			this._processMiscs();
			this._setupPlayer();
		}
	});

	window.Player = Player;

})(jQuery);