var StateLoading = function(game){
	this.game = game;
	this.enter = null;
	this.fade = 60;
	this.bg = null;
};
StateLoading.prototype = {
	preload: function() {

		this.bg = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg');

		this.logo = game.add.sprite(game.camera.width/2, 180, 'logo');
		this.logo.anchor.setTo(0.5, 0.5);
		this.logo.fixedToCamera = true;

		this.preloadBar1 = game.add.sprite(172, 410, 'loadbar1');
		this.preloadBar1.anchor.setTo(0, 0.5);
		this.preloadBar1.fixedToCamera = true;

		this.preloadBar2 = game.add.sprite(172, 410, 'loadbar2');
		this.preloadBar2.anchor.setTo(0, 0.5);
		this.preloadBar2.cropEnabled;
		this.preloadBar2.fixedToCamera = true;

		//this.game.load.setPreloadSprite(this.reloadBar2);

		player = new Player(game);
		player.preload();

		level = new Level(game);
		level.preload();

		entities = new Entities(game);
		entities.preload();

		enemies = new Enemies(game);
		enemies.preload();
	
		controls = new Controls(game, 'buttons');
		controls.preload();

	},

	loadUpdate: function() {
		this.preloadBar2.crop.width = (this.game.load.progress/100)*682;
	},

	create: function() {

		var start = function() {
			game.state.start('start');
		}

		console.log(this.fade);

		this.fade2 = this.fade;

		level.createBackground();

		this.bg.bringToTop();
		this.bg.height = game.world.height;
		this.logo.bringToTop();
		this.preloadBar1.bringToTop();
		this.preloadBar2.bringToTop();

		this.bgFade = this.game.add.tween(this.bg);
		this.bgFade.to( { alpha: 0 }, 1000, Phaser.Easing.Quadratic.InOut, false, 0, 0, false);
		this.bgFade.onComplete.add(start, this);
		this.bgFade.start();


	},

	update: function() {
		/*
		this.bg.alpha = this.fade2/this.fade;
		this.preloadBar1.alpha = this.fade2/this.fade;
		this.preloadBar2.alpha = this.fade2/this.fade;

		if (this.fade2 == 0){
			game.state.start('start');
		}

		this.fade2 -= 1;
		*/
	}
}