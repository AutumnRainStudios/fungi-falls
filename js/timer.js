var Timer = function(delay, func, args){
	this.delay = delay;
	this.func = func;
	this.args = args;
	this.paused = true;
	this.timer = null;
}
Timer.prototype = {
	
	
	start : function() {
		if (this.paused == true){
		this.timer = setInterval(this.runFunction, this.delay)
		this.paused = false;
		}
	},

	pause : function() {
		this.paused = true;
		clearTimeout(this.timer);
	},
	
	runFunction: function() {
		console.log('Pull');
		this.func();
	}
	
	
	
}