Level  = function(game) {
	this.game = game;
	this.boundary = null;
	this.platforms = null;
	this.worldHeight = 0;
	this.worldWidth = 0;
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
		this.platforms = game.add.group();
		this.boundary = game.add.group();
	 
		// Here we create the ground.
		var ground = this.boundary.create(0, this.worldHeight - 35, 'ground');
		ground.scale.setTo(15, 1);
		ground.body.immovable = true;
		
		this.generateLedges();
	},
	
	generateLedges : function() {
		var previous = {
			x: this.worldWidth/2,
			y: Math.random() * this.worldHeight - 130
		}
		
		console.log(previous.x);
		console.log(previous.y);
		
		for (i=0; i < 20; i++) {
			this.makeLedge(previous.x, previous.y);
			previous.x += (Math.random() * 400) - 200;
			previous.y += Math.random() * 100 + 130;
			
		}
	},
	
	makeLedge : function(x, y) {
		ledge = this.platforms.create(x, y, 'shroomPlatformRed');
		ledge.body.immovable = true;
		ledge.body.setRectangle(350, 1, 0, 0);
		//ledge.body.checkCollision.left = false;
		ledge.body.moves = false;
	},

	update: function() {


	}
}

