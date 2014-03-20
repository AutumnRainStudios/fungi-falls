Section = function(initState) {
	this.running = typeof initState !== 'undefined' ? initState : false;
	this.initialised = typeof initState !== 'undefined' ? initState : false;
};
Section.prototype = {
	start : function(){
		this.initialised = true;
		this.running = true;
	},

	isRunning : function() {
		if (this.running) {
			return true;
		} else {
			return false;
		}
	},

	pause : function() {
		this.running = false;
	},

	resume : function() {
		this.running = true;
	},

	reset : function() {
		this.running = false;
		this.initialised = false;
	},

	toggle : function() {
		if (this.running) {
			this.running = false;
			return false;
		} else {
			this.running = true;
			return true;
		}
	}
}