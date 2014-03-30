Timer = function(game, delay, func, scope){
	this.game = game;
	this.delay = delay;
	this.scope = scope;
	this.func = func;
	this.args = Array.prototype.slice.call(arguments, 4);
	this.paused = true;
	this.timer = null;
	this.init();
}
Timer.prototype = {

	init : function() {
		var self = this;
		this.timer = setInterval(
			function() {
				if (!self.paused && !self.game.paused){
					self.func.apply(self.scope, self.args);
				}
			}, this.delay);
	},
	
	start : function() {
		this.paused = false;
	},

	stop : function() {
		this.paused = true;
	},
	
	destroy : function() {
		this.paused = true;
		delete this.timer;
	}
}