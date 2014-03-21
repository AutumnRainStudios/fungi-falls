Section = function(init, run) {
	this.running = typeof run !== 'undefined' ? run : false;
	this.initialised = typeof init !== 'undefined' ? init : false;
	//this.init();
};
Section.prototype = {
	start : function(){
		this.initialised = false;
		this.running = false;
	},

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