var StateLost = function(game) {
	this.game = game;
	this.logo = null;
	this.menuSelected = 'start';
	this.cursors = null;
};
StateLost.prototype = {
	preload: function() {
		this.background = new Background(game);
		this.controls = new Controls(game, 'buttons');
	},
	
	create: function() {

		this.background.makeSky();
		this.background.makeBackground();
		this.background.fadeLoop();

		this.logo = game.add.sprite(game.camera.width/2, 240, 'died');
		this.logo.anchor.setTo(0.5,0.5);
		this.logo.fixedToCamera = true;

		this.startMenu = game.add.sprite(game.camera.width/2, 500, 'startOptions');
		this.startMenu.anchor.setTo(0.5, 0.5);
		this.startMenu.fixedToCamera = true;

		this.controls.create();
		this.controls.enable();

	},
	
	update: function() {

		this.background.scroll();
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
		//delete this.controls;
		console.log(game.state.current + ': destroyed');
	},

	render: function() {
		game.time.advancedTiming = true;
		game.debug.text("FPS: " + game.time.fps, 850, 10);
		this.controls.render();
	}
}