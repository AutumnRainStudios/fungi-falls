// game.js
// Core game script

var game = new Phaser.Game(1024, 640, Phaser.CANVAS, 'game_canvas');

var score = 0;
var difficulty = 0.7;
var temp = 0;

game.state.add('boot', StateBoot);
game.state.add('loading', StateLoading);
game.state.add('start', StateStart);
game.state.add('game', StateGame);
game.state.add('scores', StateScores);


game.state.start('boot');





var start = function(){
	game.state.start('game');
}

	






function renderPhysics(entity) {
	game.debug.renderPhysicsBody(entity.body);
}