var stateLoading = function(game){
	var enter = null;
};
stateLoading.prototype = {
	preload: function() {
		this.game.load.image('logo', 'assets/logo.png');

		player = new Player(game);
		player.preload();

		level = new Level(game);
		level.preload();

		entities = new Entities(game);
		entities.preload();
	
		controls = new Controls(game, 'buttons');
		controls.preload();
	},
	create: function() {

		level.createBackground();

		game.camera.y = game.world.height;

		var logo = this.game.add.sprite(512, game.world.height-400, 'logo');
		logo.anchor.setTo(0.5,0.5);

		document.getElementById("hud_start").style.display='block';

		enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

	},
	update: function() {

		if (enter.isDown) {
			game.state.start('game');
		}
		
	}
}