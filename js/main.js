// game.js
// Core game script

var game = new Phaser.Game(1024, 640, Phaser.CANVAS, 'game_canvas');

var score = 0;
var difficulty = 0.7;
var temp = 0;
var gameState = '';

game.state.add('boot', StateBoot, false);
game.state.add('loading', StateLoading, false);
game.state.add('start', StateStart, false);
game.state.add('game', StateGame, false);
game.state.add('lost', StateLost, false);
//game.state.add('won', StateScores, false);
game.state.add('scores', StateScores, false);


game.state.start('boot');





var start = function(){
	game.state.start('game');
}

	






