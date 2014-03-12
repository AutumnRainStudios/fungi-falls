var StateStart = function(game) {
	this.game = game;
	this.logo = null;
	this.menuSelected = 'start';
};
StateStart.prototype = {
	preload: function() {
		
	},
	
	create: function() {

		level.createBackground();

		this.logo = game.add.sprite(game.camera.width/2, 180, 'logo');
		this.logo.anchor.setTo(0.5,0.5);
		this.logo.fixedToCamera = true;

		this.startMenu = game.add.sprite(game.camera.width/2, 410, 'startOptions');
		this.startMenu.anchor.setTo(0.5, 0.5);
		this.startMenu.fixedToCamera = true;

		controls.create();

	},
	
	update: function() {

		if (controls.cursors.right.isDown || this.game.input.dpad_r) {
			this.startMenu.frame = 1;
			this.menuSelected = 'scores';
		} else if (controls.cursors.left.isDown || this.game.input.dpad_l) {
			this.startMenu.frame = 0;
			this.menuSelected = 'start';
		}


		if (controls.enter.isDown || this.game.input.button_a) {
			if (this.menuSelected == 'scores') {
				game.state.start('scores');
			} else {
				game.state.start('game');
			}
		}
		
	}
}