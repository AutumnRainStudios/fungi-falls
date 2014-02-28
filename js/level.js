Level  = function(game) {
	this.game = game;
	this.boundary = null;
	this.platforms = null;
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
	
		var worldHeight = game.world.height;
	
		//  Background elements
	    this.bg = this.game.add.sprite(0, 0, 'bg');
	    this.game.add.sprite(500, worldHeight - 175, 'shroomStemShort');
	    this.game.add.sprite(840, worldHeight - 225, 'shroomStemMed');
	    this.game.add.sprite(200, worldHeight - 315, 'shroomStemLong');
	    
	    this.bg.fixedToCamera = true;
	 
	    //  Groups for platforms
	    this.platforms = game.add.group();
	    this.boundary = game.add.group();
	 
	    // Here we create the ground.
	    var ground = this.boundary.create(0, worldHeight - 35, 'ground');
	    ground.scale.setTo(15, 1);
	    ground.body.immovable = true;
	 
	    //  Now let's create three ledges
	    var ledge = this.platforms.create(350, worldHeight - 215, 'shroomPlatformRed');
	    ledge.body.immovable = true;
	    ledge.body.setRectangle(350, 1, 0, 0);
	    ledge.body.checkCollision.right = false;

	    ledge = this.platforms.create(105, worldHeight - 315, 'shroomPlatformTan');
	    ledge.body.immovable = true;
	    ledge.body.setRectangle(280, 1, 0, 0);
	 
	    ledge = this.platforms.create(700, worldHeight - 260, 'shroomPlatformRed');
	    ledge.body.immovable = true;
	    ledge.body.setRectangle(350, 1, 0, 0);
	    ledge.body.checkCollision.left = false;
	    ledge.body.moves = false;


	},

	update: function() {


	}
}

