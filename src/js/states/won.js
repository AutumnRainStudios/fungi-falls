var StateWon = function(game) {
	this.game = game;
	this.gui = {};
};
StateWon.prototype = {
	preload: function() {
		this.background = new Background(game);
		this.controls = new Controls(game, 'buttons');
	},
	
	create: function() {

		this.background.makeSky();
		this.background.makeBackground();
		this.background.fadeLoop();

		this.logo = game.add.sprite(game.camera.width/2, 240, 'won');
		this.logo.anchor.setTo(0.5,0.5);
		this.logo.fixedToCamera = true;

		this.startMenu = game.add.sprite(game.camera.width/2, 500, 'return');
		this.startMenu.anchor.setTo(0.5, 0.5);
		this.startMenu.fixedToCamera = true;

		this.startMenu.animations.add('flash', [0, 1], 0.5, true);
		this.startMenu.animations.play('flash');

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

		if (this.controls.input.a) {
			this.destroy();
			score = 0;
			game.state.start('start');
		}
	},

	destroy: function() {
		//delete this.controls;
		console.log(game.state.current + ': destroyed');
	},

	render: function() {
		if (debug) {
			game.time.advancedTiming = true;
			game.debug.text("FPS: " + game.time.fps, 850, 10);
			this.controls.render();
		}
	}
}