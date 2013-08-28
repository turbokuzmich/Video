/**
 * Previous video
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.PrevButton = vjs.Button.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Button.call(this, player, options);
  }
});

vjs.PrevButton.prototype.buildCSSClass = function(){
  return 'vjs-prev-control ' + vjs.Button.prototype.buildCSSClass.call(this);
};

vjs.PrevButton.prototype.onClick = function(){
  this.player_.trigger('prev');
};