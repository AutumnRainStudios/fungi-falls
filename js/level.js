 Level  = function(game) {
	this.game = game;
	this.boundary = null;
	this.platforms = {
		above: null,
		below: null
	};
	this.worldHeight = 0;
	this.worldWidth = 0;
	
	this.entityCollector = null;

	this.bossArena = {
		ledges : [
			{sprite: 'shroomPlatformRed', x: 100, y: 510},
			{sprite: 'shroomPlatformRedSmall', x: 50, y: 400},
			{sprite: 'shroomPlatformTan', x: 924, y: 510},
			{sprite: 'shroomPlatformTanSmall', x: 974, y: 400}
		]

	}
}

Level.prototype = {
	
	create: function() {

		this.createBackground();
	
		this.worldHeight = game.world.height;
		this.worldWidth = game.world.width;
		this.bed.animations.play('empty');


		//  Groups for platforms
		this.platforms = this.game.add.group();
		this.boundary = this.game.add.group();
		
		this.entityCollector = this.game.add.sprite(0, 740, 'hitBox');
		this.entityCollector.scale.setTo(this.worldWidth/20, 1);
		this.entityCollector.fixedToCamera = true;
	 
		// Here we create the ground.
		this.ground = this.boundary.create(0, this.worldHeight - 35, 'ground');
		this.ground.scale.setTo(15, 1);
		this.ground.body.immovable = true;

		this.bossPlatform = this.platforms.create(0, 600, 'ground');
		this.bossPlatform.scale.setTo(15, 1);
		this.bossPlatform.body.immovable = true;
		
		this.generateLedges(this.worldWidth/12*1.5, this.worldHeight - 200);
		this.generateLedges(this.worldWidth/12*6.5, this.worldHeight - 300);

		this.generateBossArena(this);
		
	},


	createBackground : function() {

		this.game.world.setBounds(0, 0, 1024, 4096);



		this.ground = this.game.add.sprite(0, game.world.height - 35, 'ground');
		this.ground.scale.setTo(15, 1);
		this.ground.body.immovable = true;


		this.bed = this.game.add.sprite(game.world.width/2, game.world.height-165, 'bed');
		this.bed.animations.add('sleep', [0, 1, 2, 3, 4], 4, true);
		this.bed.animations.add('empty', [6], 1, true);
		this.bed.animations.play('sleep');

		game.camera.y = game.world.height;

	},

	
	generateLedges : function(startX, startY) {

		this.previousY = startY;
		
		while (this.previousY > 700) {
			//previous.x = Math.random()*(this.worldWidth/12*4)+startX;
			this.makeLedge(Math.random()*(this.worldWidth/12*4)+startX, this.previousY);
			this.previousY -= 180;
		}
		
	},

	generateBossArena: function(env) {

		this.bossArena.ledges.forEach(function(entry) {
			//console.log
			env.ledge = env.platforms.create(entry.x, entry.y, entry.sprite);
			env.ledge.body.immovable = true;
			env.ledge.anchor.setTo(0.5,0.5);
			env.ledge.body.checkCollision.left = false;
			env.ledge.body.checkCollision.right = false;
			env.ledge.body.checkCollision.bottom = false;
			env.ledge.body.moves = false;
		});
	},
	
	makeLedge : function(x, y) {

		this.random = Math.random();
		this.ledge = null;

		if (this.random <= 0.25) {
			this.ledge = this.platforms.create(x, y, 'shroomPlatformRed');
		} else if (this.random > 0.25 && this.random <= 0.5) {
			this.ledge = this.platforms.create(x, y, 'shroomPlatformTan');
		} else if (this.random > 0.5 && this.random <= 0.75) {
			this.ledge = this.platforms.create(x, y, 'shroomPlatformTanSmall');
		} else {
			this.ledge = this.platforms.create(x, y, 'shroomPlatformRedSmall');
		}

		this.ledge.body.immovable = true;
		this.ledge.anchor.setTo(0.5,0.5);
		this.ledge.body.checkCollision.left = false;
		this.ledge.body.checkCollision.right = false;
		this.ledge.body.checkCollision.bottom = false;
		this.ledge.body.moves = false;
	},

	updateBackground: function() {
		this.bg_night.alpha = (game.camera.y/this.worldHeight)+0.1;
		this.bg_outside.tilePosition.y = game.camera.y*0.2;
	},

	platformCollision: function(){
		if (player.sprite.body.velocity.y < 0){ 
			return false;
		}else{
			return true;
		}
	},
	
	dropPlatform2: function(platform) {
		//console.log(this);
		//console.log(platform);
		platform.kill();
	},
	
	dropPlatform: function(collector, platform){
		platform.kill();
		//	console.log(platform);
		
		//this.game.time.events.add(Phaser.Timer.SECOND/2, level.dropPlatform2, this, platform);
		
		//level.dropPlatform2(platform);
		
	},

	goalFail: function() {
		console.log('You Lost!');
		var state = game.state.getCurrentState();
		//state.destroy();
		game.state.start('lost');
	},

	goalComplete: function() {
		console.log('You Win!');
	},
	
	
}

