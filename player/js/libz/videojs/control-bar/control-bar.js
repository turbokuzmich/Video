/**
 * Container of main controls
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.ControlBar = vjs.Component.extend();

vjs.ControlBar.prototype.options_ = {
  loadEvent: 'play',
  children: {
    'playToggle': {},
    'currentTimeDisplay': {},
    'timeDivider': {},
    'durationDisplay': {},
    'remainingTimeDisplay': {},
    'progressControl': {},
    'fullscreenToggle': {},
    'volumeControl': {},
    'muteToggle': {},
    'nextButton': {},
    'prevButton': {}
    // 'volumeMenuButton': {}
  }
};

vjs.ControlBar.prototype.createEl = function(){
  var container = vjs.createEl('div', {
    className: 'vjs-control-bar'
  });
  var containerCenter = vjs.createEl('div', {
    className: 'vjs-control-bar-center'
  });
  var conainerLeft = vjs.createEl('div', {
    className: 'vjs-control-bar-left'
  });
  var conainerRight = vjs.createEl('div', {
    className: 'vjs-control-bar-right'
  });

  container.appendChild(conainerLeft);
  container.appendChild(containerCenter);
  container.appendChild(conainerRight);

  return container;
};
