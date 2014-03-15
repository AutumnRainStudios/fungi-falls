var StateStart = function(game) {
	gameState = 'start';
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

		level.createBackground();

		this.logo = game.add.sprite(game.camera.width/2, 180, 'logo');
		this.logo.anchor.setTo(0.5,0.5);
		this.logo.fixedToCamera = true;

		this.startMenu = game.add.sprite(game.camera.width/2, 410, 'startOptions');
		this.startMenu.anchor.setTo(0.5, 0.5);
		this.startMenu.fixedToCamera = true;

		this.controls.create();
		//entities.create();

		//this.cursors = this.game.input.keyboard.createCursorKeys();
		//this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);


	},
	
	update: function() {

		this.controls.update();

		game.physics.collide(level.boundary, entities.startBombs);

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
		console.log('destroyed');
	},

	render: function() {
		this.controls.render();
	}
}