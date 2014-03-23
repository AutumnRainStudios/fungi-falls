var StateLost = function(game) {
	this.game = game;
	this.logo = null;
	this.menuSelected = 'start';
	this.cursors = null;
	this.gui = {};
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

		this.startMenu = game.add.sprite(game.camera.width/2, 500, 'retryOptions');
		this.startMenu.anchor.setTo(0.5, 0.5);
		this.startMenu.fixedToCamera = true;

		this.gui.shroom = game.add.sprite(480, 320, 'shroom1');
		this.gui.shroom.fixedToCamera = true;
		this.gui.score = game.add.text(520, 320, "x" + score, {
	        font: "40px Arial",
	        fill: "#ffffff",
	        align: "left"
	    });

		this.controls.create();
		this.controls.enable();
	},
	
	update: function() {

		this.background.scroll();
		this.controls.update();

		if (this.controls.input.right) {
			this.startMenu.frame = 1;
			this.menuSelected = 'start';
		} else if (this.controls.input.left) {
			this.startMenu.frame = 0;
			this.menuSelected = 'retry';
		}

		if (this.controls.input.a) {
			if (this.menuSelected == 'start') {
				this.destroy();
				game.state.start('start');
			} else {
				this.destroy();
				game.state.start('game');
			}
			score = 0;
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