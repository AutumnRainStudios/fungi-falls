Player = function(game) {
	this.game = game;
	this.sprite = null;
	this.cursors = null;
}

Player.prototype = {
	
	preload: function() {
		this.game.load.spritesheet('player', 'assets/p1_spritesheet.png', 72, 100);
		this.game.load.image('laser', 'assets/laserPurpleDot.png');
		this.game.load.spritesheet('button_a', 'assets/button_a.png', 100, 100);
		this.game.load.spritesheet('button_left', 'assets/button_left.png', 100, 100);
		this.game.load.spritesheet('button_right', 'assets/button_right.png', 100, 100);
	},

	create : function() {

		this.sprite = game.add.sprite(70, game.world.height - 100, 'player');
		 
		this.sprite.body.gravity.y = 800;
		//this.sprite.body.bounce.y = 0.001;
		this.sprite.body.linearDamping = -10;
		this.sprite.body.checkCollision.up = false;
		this.sprite.body.collideWorldBounds = true;
	 
		this.sprite.animations.add('left', [6, 7, 8, 9, 10, 11], 16, true);
		this.sprite.animations.add('right', [12, 13, 14, 15, 16, 17, 18], 16, true);

		this.cursors = this.game.input.keyboard.createCursorKeys();
		
		this.game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_PLATFORMER);
		
		this.onPlatform = 0;
		
		emitterJump = game.add.emitter(0, 0, 200);
		emitterJump.makeParticles('laser');
		emitterJump.gravity = 200;

	},

	update : function() {
	
		/*
		vector2f curSpeed = a * targetSpeed + (1-a) * curSpeed;
		if (fabs(curSpeed.x) < threshold) curSpeed.x = 0;
		if (fabs(curSpeed.y) < threshold) curSpeed.y = 0;
		*/

		var targetSpeed = 300;
		var threshold = 20;
		var direction = 0;
		
		// Set a different acceleration weighting if mid jump
		if (!this.sprite.body.touching.down) {
			var a = 0.1;
		} else {
			var a = 0.2;
		}
		
		if (this.sprite.body.touching.down) {
			this.onPlatform++;
		} else {
			this.onPlatform = 0;
		}
		
		//  Allow the player to jump if they are touching the ground.
		if ((this.cursors.up.isDown || game.input.button_a == true) && this.sprite.body.touching.down)
		{
			this.sprite.body.velocity.y = -801;
			//this.jumpBurst(this.sprite);
		}

		
		// Left & Right Movement
		if (this.cursors.right.isDown || game.input.dpad_r == true)
		{
			//  Move to the right
			if (this.sprite.body.velocity.x < 0) {
				this.sprite.body.velocity.x = ((a * 0) + (1-a) * this.sprite.body.velocity.x);
			}
			this.sprite.body.velocity.x += ((a * targetSpeed) + (1-a) * Math.abs(this.sprite.body.velocity.x))-Math.abs(this.sprite.body.velocity.x);
		} else if (this.cursors.left.isDown || game.input.dpad_l == true) {
			//  Move to the left
			if (this.sprite.body.velocity.x > 0) {
				this.sprite.body.velocity.x = ((a * 0) + (1-a) * this.sprite.body.velocity.x);
			}
			this.sprite.body.velocity.x -= ((a * targetSpeed) + (1-a) * Math.abs(this.sprite.body.velocity.x))-Math.abs(this.sprite.body.velocity.x);
		} else {
			//  Bring to a halt
			this.sprite.body.velocity.x = ((a * 0) + (1-a) * this.sprite.body.velocity.x);
		}
		
		

		if (this.sprite.body.velocity.x > 5) {
			if (this.sprite.body.touching.down) {
	 			this.sprite.animations.play('right');
	 		} else {
	 			this.sprite.frame = 3;
	 		}
	 	} else if (this.sprite.body.velocity.x < -5){
	 		if (this.sprite.body.touching.down) {
				this.sprite.animations.play('left');
			} else {
				this.sprite.frame = 2;
			}
	 	} else {
		 	this.sprite.animations.stop();
			this.sprite.frame = 0;
	 	}

	},
	
	platformStand : function(player, platform) {
		player.body.velocity.y = 0;
	},
	
	jumpBurst : function (player) {
		emitterJump.x = player.x;
		emitterJump.y = player.y + 90;
		emitterJump.start(true, 1000, null, 10);
	}
}