Level  = function(game) {
	
	this.game = game;

	this.boundary = null;
	this.platforms = null;
	this.bombs = null;
	this.shrooms = null;
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
	    this.game.load.image('shroom1', 'assets/tallShroom_red.png');
	    this.game.load.image('shroom2', 'assets/tallShroom_brown.png');
	   	this.game.load.image('bomb', 'assets/bomb.png');
	},

	create: function() {
		//  Background elements
	    this.game.add.sprite(0, 0, 'bg');
	    this.game.add.sprite(120, 340, 'shroomStemShort');
	    this.game.add.sprite(840, 290, 'shroomStemMed');
	    this.game.add.sprite(500, 200, 'shroomStemLong');
	 
	    //  Groups for platforms
	    this.platforms = game.add.group();
	    this.boundary = game.add.group();
	 
	    // Here we create the ground.
	    var ground = this.boundary.create(0, game.world.height - 35, 'ground');
	    ground.scale.setTo(15, 1);
	    ground.body.immovable = true;
	 
	    // Create horizontal boundaries
		var horizontalBoundary = this.boundary.create(-10, -512, 'hitBox');
		horizontalBoundary.scale.setTo(1, 51);
		horizontalBoundary.body.immovable = true;

		horizontalBoundary = this.boundary.create(1014, -512, 'hitBox');
		horizontalBoundary.scale.setTo(1, 51);
		horizontalBoundary.body.immovable = true;



	    //  Now let's create three ledges
	    var ledge = this.platforms.create(-20, 300, 'shroomPlatformRed');
	    ledge.body.immovable = true;
	    ledge.body.checkCollision.right = false;

	    ledge = this.platforms.create(400, 160, 'shroomPlatformTan');
	    ledge.body.immovable = true;
	    ledge.body.checkCollision.left = false;
	    ledge.body.checkCollision.right = false;
	 
	    ledge = this.platforms.create(700, 250, 'shroomPlatformRed');
	    ledge.body.immovable = true;
	    ledge.body.checkCollision.left = false;
	    ledge.body.moves = false;


	    this.shrooms = game.add.group();
	    this.bombs = game.add.group();


	        //  Make it rain
	    for (var i = 0; i < 20; i++)
	    {
	        createEntity();
	    }


	},

	update: function() {


	}


}

