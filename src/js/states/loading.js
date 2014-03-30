var StateLoading = function(game){
	this.game = game;
	this.enter = null;
	this.fade = 60;
	this.bg = null;
};
StateLoading.prototype = {
	preload: function() {

		this.bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg');

		this.preloadBar1 = game.add.sprite(172, 320, 'loadbar1');
		this.preloadBar1.anchor.setTo(0, 0.5);
		this.preloadBar1.fixedToCamera = true;

		this.preloadBar2 = game.add.sprite(172, 320, 'loadbar2');
		this.preloadBar2.anchor.setTo(0, 0.5);
		this.preloadBar2.cropEnabled;
		this.preloadBar2.fixedToCamera = true;

		loadAssets();

	},

	loadUpdate: function() {
		this.preloadBar2.crop(new Phaser.Rectangle(0, 0, (this.game.load.progress/100)*682, 41));

	},

	create: function() {
		//game.state.start('start');
	},

	update: function() {

		if (this.cache.isSoundDecoded('music'))
		{
			this.ready = true;
			game.state.start('start');
			this.destroy();
		}

	},

	destroy: function(){
		//delete this.level;
	}
}