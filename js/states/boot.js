// Performs pre-load actions
var StateBoot = function(game){};
StateBoot.prototype = {
	preload: function() {
		game.load.image('loadbar1', 'assets/gui/loadbar_1.png');
		game.load.image('loadbar2', 'assets/gui/loadbar_2.png');
		game.load.image('bg', 'assets/gui/bg.png');
	},

	create: function() {
		game.state.start('loading');
	},
}