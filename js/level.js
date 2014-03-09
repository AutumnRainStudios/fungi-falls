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
	
	this.temp = 0;
}

Level.prototype = {
	
	preload: function() {
		this.game.load.image('bg_dawn', 'assets/bg/bg_dawn.png');
		this.game.load.image('bg_night', 'assets/bg/bg_night.png');
		this.game.load.image('bg_inside', 'assets/bg/bg_inside.png');
		this.game.load.image('bg_outside', 'assets/bg/bg_outside.png');
		this.game.load.image('ground', 'assets/sprites/ground.png');
		this.game.load.image('shroomPlatformRed', 'assets/sprites/platform_red.png');
		this.game.load.image('shroomPlatformTan', 'assets/sprites/platform_tan.png');
		this.game.load.image('shroomPlatformRedSmall', 'assets/sprites/platform_red_small.png');
		this.game.load.image('shroomPlatformTanSmall', 'assets/sprites/platform_tan_small.png');
		this.game.load.image('hitBox', 'assets/sprites/transTest.png');
		this.game.load.spritesheet('bed', 'assets/sprites/bed_spritesheet.png', 190, 130);
	},

	create: function() {
	
		this.game.world.setBounds(0, 0, 1024, 4096);
	
		this.worldHeight = game.world.height;
		this.worldWidth = game.world.width;
	
		//  Background elements
		this.bg_dawn = this.game.add.sprite(0, 0, 'bg_dawn');
		this.bg_dawn.width = game.camera.width;
		this.bg_dawn.height = game.camera.height;
		this.bg_dawn.fixedToCamera = true;
		
		this.bg = this.game.add.sprite(0, 0, 'bg_night');
		this.bg.width = game.camera.width;
		this.bg.height = game.camera.height;
		this.bg.fixedToCamera = true;
		
		this.bg_outside = game.add.tileSprite(0, 0, this.worldWidth, this.worldHeight, 'bg_outside');
		this.bg_outside.alpha = 0.5;
		this.bg_inside = game.add.tileSprite(0, 0, this.worldWidth, this.worldHeight, 'bg_inside');

		//  Groups for platforms
		this.platforms = this.game.add.group();
		this.boundary = this.game.add.group();
		
		this.entityCollector = this.game.add.sprite(0, 700, 'hitBox');
		this.entityCollector.scale.setTo(this.worldWidth/20, 1);
		this.entityCollector.fixedToCamera = true;
	 
		// Here we create the ground.
		var ground = this.boundary.create(0, this.worldHeight - 35, 'ground');
		ground.scale.setTo(15, 1);
		ground.body.immovable = true;

		var bossPlatform = this.platforms.create(0, 640, 'ground');
		bossPlatform.scale.setTo(15, 1);
		bossPlatform.body.immovable = true;
		
		this.generateLedges(this.worldWidth/12*1.5, this.worldHeight - 200);
		this.generateLedges(this.worldWidth/12*6.5, this.worldHeight - 300);

		this.bed = this.game.add.sprite(this.worldWidth/2, this.worldHeight-165, 'bed');
		this.bed.animations.add('sleep', [0, 1, 2, 3, 4], 4, true);
		this.bed.animations.play('sleep');


	},
	
	generateLedges : function(startX, startY) {

		var previousY = startY;
		
		while (previousY > 700) {
			//previous.x = Math.random()*(this.worldWidth/12*4)+startX;
			this.makeLedge(Math.random()*(this.worldWidth/12*4)+startX, previousY);
			previousY -= 200;
		}
		
	},
	
	makeLedge : function(x, y) {

		var random = Math.random();
		var ledge = null;

		if (random <= 0.25) {
			ledge = this.platforms.create(x, y, 'shroomPlatformRed');
		} else if (random > 0.25 && random <= 0.5) {
			ledge = this.platforms.create(x, y, 'shroomPlatformTan');
		} else if (random > 0.5 && random <= 0.75) {
			ledge = this.platforms.create(x, y, 'shroomPlatformTanSmall');
		} else {
			ledge = this.platforms.create(x, y, 'shroomPlatformRedSmall');
		}

		ledge.body.immovable = true;
		ledge.anchor.setTo(0.5,0.5);
		ledge.body.checkCollision.left = false;
		ledge.body.checkCollision.right = false;
		ledge.body.checkCollision.bottom = false;
		ledge.body.moves = false;
	},

	update: function() {
		this.bg.alpha = (game.camera.y/this.worldHeight)+0.1;
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
	
	
}

