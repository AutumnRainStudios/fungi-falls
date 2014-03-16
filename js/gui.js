var Gui = function(game) {
	this.game = game;
};
Gui.prototype = {



	createStartScreen: function(){},



	
	render: function() {
		if (debug == true){
			//game.debug.renderText("FPS: " + game.time.fps, 850, 30);
		}	
	},
}