Background  = function(game) {
	this.game = game;
	this.sky = {};
	this.bg = {};
}

Background.prototype = {

	create : function() {
		this.makeSky();
		this.makeBackground();
	},

	update: function() {
		this.sky.night.alpha = (game.camera.y/game.world.height)+0.1;
		this.bg.outside.tilePosition.y = game.camera.y*0.2;
	},


	makeSky : function() {
		this.sky.dawn = this.game.add.sprite(0, 0, 'bg_dawn');
		this.sky.dawn.width = game.camera.width;
		this.sky.dawn.height = game.camera.height;
		this.sky.dawn.fixedToCamera = true;

		this.sky.night = this.game.add.sprite(0, 0, 'bg_night');
		this.sky.night.width = game.camera.width;
		this.sky.night.height = game.camera.height;
		this.sky.night.fixedToCamera = true;
	},


	makeBackground : function() {
		this.bg.outside = this.game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_outside');
		this.bg.outside.alpha = 0.5;
		this.bg.inside = this.game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_inside');
		this.bg.inside.alpha = 0.8;
	},


	scroll : function() {
		this.bg.outside.tilePosition.y++;
		this.bg.inside.tilePosition.y += 2;
	},


	fadeLoop : function() {

		this.bgFade = game.add.tween(this.sky.night)
			.to({ alpha: 0 }, 5000, Phaser.Easing.Linear.None)
			.delay(2500)
			.to({ alpha: 1 }, 5000, Phaser.Easing.Linear.None)
			.loop()
			.start();

	}


}