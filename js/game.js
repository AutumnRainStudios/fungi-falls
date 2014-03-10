// game.js
// Core game script

var game = new Phaser.Game(1024, 640, Phaser.CANVAS, 'game_canvas');

var stateLoading = function(game){
	var enter = null;
};
stateLoading.prototype = {
	preload: function() {
		this.game.load.image('logo', 'assets/logo.png');

		player = new Player(game);
		player.preload();

		level = new Level(game);
		level.preload();

		entities = new Entities(game);
		entities.preload();
	
		controls = new Controls(game, 'buttons');
		controls.preload();
	},
	create: function() {

		this.game.world.setBounds(0, 0, 1024, 4096);

		var bg_night = this.game.add.sprite(0, 0, 'bg_night');
		bg_night.width = game.camera.width;
		bg_night.height = game.camera.height;
		bg_night.fixedToCamera = true;

		var bg_outside = this.game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_outside');
		bg_outside.alpha = 0.5;
		//bg_outside.tilePosition.y = 220;
		//bg_outside.tilePosition.x = -20;
		bg_outside.tilePosition.y = game.camera.y*0.2;
		var bg_inside = this.game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_inside');


		var ground = this.game.add.sprite(0, game.world.height - 35, 'ground');
		ground.scale.setTo(15, 1);
		ground.body.immovable = true;

		game.camera.y = game.world.height;


		var logo = this.game.add.sprite(512, game.world.height-400, 'logo');
		logo.anchor.setTo(0.5,0.5);



		var bed = this.game.add.sprite(game.world.width/2, game.world.height-165, 'bed');
		bed.animations.add('sleep', [0, 1, 2, 3, 4], 4, true);
		bed.animations.play('sleep');



		enter = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

	},
	update: function() {

		if (enter.isDown) {
			game.state.start('game');
		}
		
	}
}


var StateGame = function(game) { };
StateGame.prototype = {
	preload: function() {
	},
	
	create: function() {
		level.create();
		player.create();
		entities.create();
		controls.create();		
	},
	
	update: function() {
	
		game.physics.overlap(player.sprite, entities.shrooms, entities.collectShroom, null, this);
	
	 	game.physics.overlap(level.entityCollector, level.platforms, level.dropPlatform, null, this);
	 	game.physics.overlap(level.entityCollector, entities.shrooms, entities.recycleEntity, null, this);
	 	game.physics.overlap(level.entityCollector, entities.bombs, entities.recycleEntity, null, this);
		
		game.physics.overlap(player.sprite, level.boundary, player.fallDamage)
		game.physics.collide(player.sprite, level.platforms, null, level.platformCollision);
		
		game.physics.collide(level.boundary, player.sprite);
		game.physics.collide(level.boundary, entities.bombs);
	 	game.physics.collide(level.boundary, entities.shrooms);
		
	 	game.physics.collide(level.platforms, entities.shrooms);
		game.physics.collide(level.platforms, entities.bombs);
		
		game.physics.collide(level.platforms, player.gibs);
		game.physics.collide(level.boundary, player.gibs);
	
		player.update();
		entities.update();
		level.update();
	
		//document.getElementById("score").innerHTML=score;
	 	//document.getElementById("health").innerHTML=health;
	 	document.getElementById("health-bar").style.width= player.heart + "%";		
	},
	
	render : function() {
		game.debug.renderText("FPS: " + game.time.fps, 940, 30);

		if (debug == true){

			// Sprite debug info
			entities.bombs.forEachAlive(renderPhysics, this)
			entities.shrooms.forEachAlive(renderPhysics, this)
			level.platforms.forEachAlive(renderPhysics, this)
			entities.explosions.forEachAlive(renderPhysics, this)
	
			game.debug.renderSpriteCorners(player.sprite, false, false);
			game.debug.renderBodyInfo(player.sprite, 32, 32);
		}		
	}
}
	
var StateStartScreen = function(game) { };
StateStartScreen.prototype = {
	preload: function() {
		
	},
	
	create: function() {
		//level.create();
		//player.create();
		//entities.create();
		//controls.create();
	},
	
	update: function() {
		
	}
}



game.state.add('loading', stateLoading);
game.state.add('start', StateStartScreen);
game.state.add('game', StateGame);

game.state.start('loading');


var score = 0;
var difficulty = 0.7;
var temp = 0;

function renderPhysics(entity) {
	game.debug.renderPhysicsBody(entity.body);
}