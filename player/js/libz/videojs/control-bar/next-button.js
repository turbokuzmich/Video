/**
 * Next video
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
vjs.NextButton = vjs.Button.extend({
  /** @constructor */
  init: function(player, options){
    vjs.Button.call(this, player, options);
  }
});

vjs.NextButton.prototype.buildCSSClass = function(){
  return 'vjs-next-control ' + vjs.Button.prototype.buildCSSClass.call(this);
};

vjs.NextButton.prototype.onClick = function(){
  this.player_.trigger('next');
};