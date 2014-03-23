Platforms  = function(game) {
	this.game = game;
	this.group = null;
}

Platforms.prototype = {

	create : function(){
		this.group = this.game.add.group();

		this.generateLedges(0, game.world.height - 200);
		this.generateLedges(game.world.width/12*5, game.world.height - 300);

		this.ground = this.group.create(0, game.world.height - 35, 'ground');
		this.ground.scale.setTo(15, 1);
		game.physics.enable(this.ground, Phaser.Physics.ARCADE);
		this.ground.body.immovable = true;

		this.bossPlatform = this.group.create(0, 600, 'ground');
		this.bossPlatform.scale.setTo(15, 1);
		game.physics.enable(this.bossPlatform, Phaser.Physics.ARCADE);
		this.bossPlatform.body.immovable = true;

	},

	generateLedges : function(startX, startY) {

		this.previousY = startY;
		
		while (this.previousY > 700) {
			//previous.x = Math.random()*(this.worldWidth/12*4)+startX;
			this.makeLedge(Math.random()*(game.world.width/12*4)+startX, this.previousY, 'random', true);
			this.previousY -= 180;
		}
		
	},


	generateBossArena : function() {
		this.makeLedge(0, 400, 'shroomPlatformTanSmall');
		//this.makeLedge(0, 500, 'shroomPlatformRed');
		this.makeLedge(game.world.width-150, 400, 'shroomPlatformRedSmall');
		//this.makeLedge(game.world.width-200, 500, 'shroomPlatformTan');
	},

	makeLedge : function(x, y, type, fragile) {
		type = typeof type !=='undefined' ? type: 'random';
		fragile = typeof fragile !=='undefined' ? fragile: false;

		this.random = Math.random();
		this.ledge = null;

		if (type == 'random') {
			if (this.random <= 0.25) {
				this.ledge = this.group.create(x, y, 'shroomPlatformRed');
			} else if (this.random > 0.25 && this.random <= 0.5) {
				this.ledge = this.group.create(x, y, 'shroomPlatformTan');
			} else if (this.random > 0.5 && this.random <= 0.75) {
				this.ledge = this.group.create(x, y, 'shroomPlatformTanSmall');
			} else {
				this.ledge = this.group.create(x, y, 'shroomPlatformRedSmall');
			}
		} else {
			this.ledge = this.group.create(x, y, type);
		}

		game.physics.enable(this.ledge, Phaser.Physics.ARCADE);

		this.ledge.body.immovable = true;
		//this.ledge.anchor.setTo(0.5,0.5);
		this.ledge.body.checkCollision.left = false;
		this.ledge.body.checkCollision.right = false;
		this.ledge.body.checkCollision.bottom = false;
		this.ledge.body.moves = false;

		if (fragile) {
			this.ledge.fragile = true;
		} else {
			this.ledge.fragile = false;
		}

	},

	removalCheck :function() {
		var check = function(entity){
			if (entity.y > this.game.camera.y+this.game.camera.height+100 && entity.fragile){
				entity.kill();
			}
		}
		this.group.forEachAlive(check, this);
	},



}