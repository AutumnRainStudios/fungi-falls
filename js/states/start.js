var StateStart = function(game) {
	this.game = game;
	this.logo = null;
	this.menuSelected = 'start';
	this.cursors = null;
};
StateStart.prototype = {
	preload: function() {
		this.controls = new Controls(game, 'buttons');
	},
	
	create: function() {

		this.bg_dawn = this.game.add.sprite(0, 0, 'bg_dawn');
		this.bg_dawn.width = game.camera.width;
		this.bg_dawn.height = game.camera.height;

		this.bg_night = this.game.add.sprite(0, 0, 'bg_night');
		this.bg_night.width = game.camera.width;
		this.bg_night.height = game.camera.height;


		this.bgFade = game.add.tween(this.bg_night)
			.to({ alpha: 0 }, 5000, Phaser.Easing.Linear.None)
			.to({ alpha: 1 }, 5000, Phaser.Easing.Linear.None)
			.loop()
			.start();


		this.bg_outside = this.game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_outside');
		this.bg_outside.alpha = 0.5;
		this.bg_inside = this.game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_inside');



		this.logo = game.add.sprite(game.camera.width/2, 240, 'logo');
		this.logo.anchor.setTo(0.5,0.5);
		this.logo.fixedToCamera = true;

		this.startMenu = game.add.sprite(game.camera.width/2, 500, 'startOptions');
		this.startMenu.anchor.setTo(0.5, 0.5);
		this.startMenu.fixedToCamera = true;

		this.controls.create();

	},
	
	update: function() {

		this.bg_outside.tilePosition.y++;
		this.bg_inside.tilePosition.y += 2;

		this.controls.update();

		if (this.controls.input.right) {
			this.startMenu.frame = 1;
			this.menuSelected = 'scores';
		} else if (this.controls.input.left) {
			this.startMenu.frame = 0;
			this.menuSelected = 'start';
		}

		if (this.controls.input.a) {
			if (this.menuSelected == 'scores') {
				this.destroy();
				game.state.start('scores');
			} else {
				this.destroy();
				game.state.start('game');
			}
		}
	},

	destroy: function() {
		delete this.controls;
		console.log(game.state.current + ': destroyed');
	},

	render: function() {
		game.debug.renderText("FPS: " + game.time.fps, 850, 10);
		this.controls.render();
	}
}