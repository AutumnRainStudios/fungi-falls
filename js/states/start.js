var StateStart = function(game) {
	this.game = game;
};
StateStart.prototype = {
	
	preload : function() {
		this.controls = new Controls(game);
	},
	
	create : function() {
		this.controls.create();
	},
	
	update : function() {
		this.controls.update();
	},
	
	render : function() {
		//this.game.debug.text(this.controls.input.left, 20, 20);
		this.controls.render();
	}
	
};