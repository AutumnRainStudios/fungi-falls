// Performs pre-load actions
var StateBoot = function(game){
	var enter = null;
};
StateBoot.prototype = {
	preload: function() {
		game.load.image('logo', 'assets/gui/logo.png');
		game.load.image('loadbar1', 'assets/gui/loadbar_1.png');
		game.load.image('loadbar2', 'assets/gui/loadbar_2.png');
		game.load.image('bg', 'assets/gui/bg.png');
	},

	loadUpdate: function() {
		//game.load.progress
	},

	create: function() {
		game.state.start('loading');
	},
}