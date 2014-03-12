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

		this.createBackground();
	
		this.worldHeight = game.world.height;
		this.worldWidth = game.world.width;
		this.bed.animations.play('empty');


		//  Groups for platforms
		this.platforms = this.game.add.group();
		this.boundary = this.game.add.group();
		
		this.entityCollector = this.game.add.sprite(0, 700, 'hitBox');
		this.entityCollector.scale.setTo(this.worldWidth/20, 1);
		this.entityCollector.fixedToCamera = true;
	 
		// Here we create the ground.
		this.ground = this.boundary.create(0, this.worldHeight - 35, 'ground');
		this.ground.scale.setTo(15, 1);
		this.ground.body.immovable = true;

		this.bossPlatform = this.platforms.create(0, 640, 'ground');
		this.bossPlatform.scale.setTo(15, 1);
		this.bossPlatform.body.immovable = true;
		
		this.generateLedges(this.worldWidth/12*1.5, this.worldHeight - 200);
		this.generateLedges(this.worldWidth/12*6.5, this.worldHeight - 300);

		
	},


	createBackground : function() {

		this.game.world.setBounds(0, 0, 1024, 4096);

		this.bg_dawn = this.game.add.sprite(0, 0, 'bg_dawn');
		this.bg_dawn.width = game.camera.width;
		this.bg_dawn.height = game.camera.height;
		this.bg_dawn.fixedToCamera = true;

		this.bg_night = this.game.add.sprite(0, 0, 'bg_night');
		this.bg_night.width = game.camera.width;
		this.bg_night.height = game.camera.height;
		this.bg_night.fixedToCamera = true;

		this.bg_outside = this.game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_outside');
		this.bg_outside.alpha = 0.5;
		this.bg_outside.tilePosition.y = game.camera.y*0.2;
		this.bg_inside = this.game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_inside');

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
			this.previousY -= 200;
		}
		
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

	update: function() {
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
	
	
}

