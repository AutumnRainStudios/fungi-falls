Player = function(game) {
		this.game = game;
		this.sprite = null;
		this.cursors = null;
}

Player.prototype = {
	
	preload: function() {
		this.game.load.spritesheet('player', 'assets/p1_spritesheet.png', 72, 100);
		this.game.load.image('laser', 'assets/laserPurpleDot.png');
	},

	create : function() {

		this.game.input.dpad = null;
		// The player and its settings
    	this.sprite = game.add.sprite(70, game.world.height - 250, 'player');
    	 
    	//  Player physics properties. Give the little guy a slight bounce.
	    this.sprite.body.gravity.y = 900;
	    this.sprite.body.bounce.y = 0.01;
	    //player.body.mass = 1000;
	    this.sprite.body.checkCollision.up = false;
	    //this.sprite.body.linearDamping = 2;
	    this.sprite.body.collideWorldBounds = true;
	 
	    //  Our two animations, walking left and right.
	    this.sprite.animations.add('left', [6, 7, 8, 9, 10, 11], 16, true);
	    this.sprite.animations.add('right', [12, 13, 14, 15, 16, 17, 18], 16, true);

	    // Enable cursors
    	this.cursors = this.game.input.keyboard.createCursorKeys();
    	
    	//this.game.camera.follow(player);
    	game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_PLATFORMER);
    	
	    emitterJump = game.add.emitter(0, 0, 200);
		emitterJump.makeParticles('laser');
		emitterJump.gravity = 200;
	},

	update : function() {

		//  Reset the players velocity (movement)
	    this.sprite.body.velocity.x = 0;
	 
	 	// Player Controls
	 	// Allow player to fall through platforms if holding down
	    if (this.cursors.down.isDown || game.input.dpad_d == true){
	    	level.platforms.setAll('body.checkCollision.up', false);
	    } else {
	    	level.platforms.setAll('body.checkCollision.up', true);
	    }

	    //  Allow the player to jump if they are touching the ground.
	    if ((this.cursors.up.isDown || game.input.button_a == true) && this.sprite.body.touching.down)
	    {
	        this.sprite.body.velocity.y = -700;
	        this.jumpBurst(this.sprite);
	    }
	    
	    // Left & Right Movement
	    if (this.cursors.left.isDown || game.input.dpad_l == true)
	    {
	        //  Move to the left
	        this.sprite.body.velocity.x = -350;
	 		if (this.sprite.body.touching.down) {
	 			this.sprite.animations.play('left');
	 		} else {
	 			this.sprite.frame = 2;
	 		}
	    }
	    else if (this.cursors.right.isDown || game.input.dpad_r == true)
	    {
	        //  Move to the right
	        this.sprite.body.velocity.x = 350;
	        if (this.sprite.body.touching.down) {
	 			this.sprite.animations.play('right');
	 		} else {
	 			this.sprite.frame = 3;
	 		}
	    } else {
	        //  Stand still
	        this.sprite.animations.stop();
	        this.sprite.frame = 0;
	    }
	},
	
	jumpBurst : function (player) {
    	emitterJump.x = player.x;
		emitterJump.y = player.y + 90;
		emitterJump.start(true, 1000, null, 10);
	}
}