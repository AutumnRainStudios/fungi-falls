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
		this.game.load.image('bg', 'assets/bg_shroom.png');
		this.game.load.image('ground', 'assets/shroomBrownAltMid.png');
		this.game.load.image('shroomPlatformRed', 'assets/shroomPlatformRed.png');
		this.game.load.image('shroomPlatformTan', 'assets/shroomPlatformTan.png');
		this.game.load.image('shroomStemShort', 'assets/stemShort.png');
		this.game.load.image('shroomStemMed', 'assets/stemMed.png');
		this.game.load.image('shroomStemLong', 'assets/stemLong.png');
		this.game.load.image('hitBox', 'assets/transTest.png');
	},

	create: function() {
	
		this.game.world.setBounds(0, 0, 1024, 4096);
	
		this.worldHeight = game.world.height;
		this.worldWidth = game.world.width;
	
		//  Background elements
		this.bg = this.game.add.sprite(0, 0, 'bg');
		this.bg.width = game.camera.width;
		this.bg.height = game.camera.height;
		
		
		this.game.add.sprite(500, this.worldHeight - 175, 'shroomStemShort');
		this.game.add.sprite(840, this.worldHeight - 225, 'shroomStemMed');
		this.game.add.sprite(200, this.worldHeight - 315, 'shroomStemLong');
		
		this.bg.fixedToCamera = true;
	 
		//  Groups for platforms
		this.platforms.above = game.add.group();
		this.platforms.below = game.add.group();
		this.boundary = game.add.group();
		
		this.entityCollector = this.game.add.sprite(0, 700, 'hitBox');
		this.entityCollector.scale.setTo(this.worldWidth/20, 1);
		this.entityCollector.fixedToCamera = true;
	 
		// Here we create the ground.
		var ground = this.boundary.create(0, this.worldHeight - 35, 'ground');
		ground.scale.setTo(15, 1);
		ground.body.immovable = true;
		
		this.generateLedges(Math.random() * this.worldWidth/4, this.worldHeight - 150);
// 		this.generateLedges(Math.random() * this.worldWidth/4+this.worldWidth/2, this.worldHeight - 150);
	},
	
	generateLedges : function(startX, startY) {
		var previous = {
			x: startX,
			y: startY
		}
		
		for (i=0; i < 10; i++) {
			this.makeLedge(previous.x, previous.y);
			previous.x += (Math.random() * 400) - 200;
			previous.y -= Math.random() * 40 + 100;
		}
	},
	
	makeLedge : function(x, y) {
		ledge = this.platforms.above.create(x, y, 'shroomPlatformRed');
		ledge.body.immovable = true;
		ledge.body.setRectangle(350, 1, 0, 0);
		ledge.body.checkCollision.left = false;
		ledge.body.checkCollision.right = false;
		ledge.body.checkCollision.bottom = false;
		ledge.body.moves = false;
	},

	update: function() {
	
		//level.platforms.above.forEachAlive(this.sortAbovePlatforms, this, this.platforms.above);
		
		for (i=0; i < level.platforms.above.countLiving(); i++){
			this.sortAbovePlatforms(level.platforms.above.getAt(i), 'hello');
		}
		
		for (i=0; i < level.platforms.below.countLiving(); i++){
			this.sortBelowPlatforms(level.platforms.below.getAt(i), 'hello');
		}
		
		//level.platforms.below.forEach(this.sortBelowPlatforms, this, this.platforms.below);
	},
	
	sortAbovePlatforms: function(platform, group) {

		if(platform.y > player.sprite.y+100) {
			this.platforms.above.remove(platform); // generates error
			this.platforms.below.add(platform);
	    }
		
	},
	
	sortBelowPlatforms: function(platform, group) {
		if(platform.y < player.sprite.y+50) {
			this.platforms.below.remove(platform); // generates error
			this.platforms.above.add(platform);
	    }
	
	},
	
	dropPlatform2: function(platform) {
		console.log(this);
		console.log(platform);
		//platform.kill();
	},
	
	dropPlatform: function(player, platform){
		console.log(platform);
		//this.game.time.events.add(Phaser.Timer.SECOND * 4, this.dropPlatform2, this, platform);
		
		//this.dropPlatform2(platform);
		
	},
	
	
}

