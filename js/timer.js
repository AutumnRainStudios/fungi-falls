Timer = function(game, delay, func, scope){
	this.game = game;
	this.delay = delay;
	this.scope = scope;
	this.func = func;
	this.args = Array.prototype.slice.call(arguments, 4);
	this.paused = true;
	this.timer = null;
}
Timer.prototype = {
	
	start : function() {
		var self = this;
		this.timer = setInterval(
			function() {
				if (!self.paused && !self.game.paused){
					self.func.apply(self.scope, self.args);
				}
			}, this.delay)
		this.paused = false;
	},

	pause : function() {
		this.paused = true;
	},

	resume : function() {
		this.paused = false;
	},
	
	stop : function() {
		this.paused = true;
		delete this.timer;
	}
}