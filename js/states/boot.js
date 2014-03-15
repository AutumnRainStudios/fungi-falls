// Performs pre-load actions
var StateBoot = function(game){
	gameState = 'boot';
};
StateBoot.prototype = {
	preload: function() {
		game.load.image('logo', 'assets/gui/logo.png');
		game.load.image('loadbar1', 'assets/gui/loadbar_1.png');
		game.load.image('loadbar2', 'assets/gui/loadbar_2.png');
		game.load.image('bg', 'assets/gui/bg.png');
	},

	loadUpdate: function() {
	},

	create: function() {
		game.state.start('loading');
	},
}