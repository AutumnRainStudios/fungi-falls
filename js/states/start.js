var StateStart = function(game) {
	this.game = game;
	this.logo = null;
	this.menuSelected = null;
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


		enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

		this.cursors = this.game.input.keyboard.createCursorKeys();


		//this.cursors.right.isDown 
		this.menuSelected = 'start';


	},
	
	update: function() {

		if (this.cursors.right.isDown) {
			this.startMenu.frame = 1;
			this.menuSelected = 'scores';
		} else if (this.cursors.left.isDown) {
			this.startMenu.frame = 0;
			this.menuSelected = 'start';
		}


		if (enter.isDown) {
			if (this.menuSelected == 'scores') {
				game.state.start('scores');
			} else {
				game.state.start('game');
			}
		}
		
	}
}