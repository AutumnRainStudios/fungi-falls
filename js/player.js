Player = function(game) {
	this.game = game;
	this.sprite = null;
	this.cursors = null;
	this.gibs = null;
	this.movement = {
		targetSpeed : 300,
		direction : 0,
		acceleration : 0
	}
}

Player.prototype = {
	
	preload: function() {
		this.game.load.spritesheet('player', 'assets/sprites/player_spritesheet.png', 70, 100);
		this.game.load.image('gib_head', 'assets/sprites/player_gibs/player_gib_head.png');
		this.game.load.image('gib_body', 'assets/sprites/player_gibs/player_gib_body.png');
		this.game.load.image('gib_hat', 'assets/sprites/player_gibs/player_gib_hat.png');
		this.game.load.image('gib_limb', 'assets/sprites/player_gibs/player_gib_limb.png');
	},

	create : function() {

		this.sprite = game.add.sprite(70, game.world.height - 100, 'player');
		 
		this.sprite.body.gravity.y = 900;
		this.sprite.body.bounce.y = 0.001;
		this.sprite.body.linearDamping = -10;
		this.sprite.body.checkCollision.up = false;
		this.sprite.body.collideWorldBounds = true;
		this.sprite.anchor.setTo(0.5,0.5);
	 
		this.sprite.animations.add('walk', [5, 6, 7, 8, 9, 10], 16, true);
		this.sprite.animations.add('jump', [1, 2], 8, true);
		this.sprite.animations.add('hurt', [3, 4], 1, true);

		this.gibs = game.add.group();

		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.game.camera.follow(this.sprite);
		var deadzone = new Phaser.Rectangle(50,(this.game.camera.height/8)*5,this.game.camera.width-100,this.game.camera.height/8);
		this.game.camera.deadzone = deadzone;
		
		this.onPlatform = 0;
	},

	update : function() {

		if (health <= 90) {
			this.playerDeath(this.sprite, this);
			health = 100;
			this.sprite.kill();
			//document.getElementById("game-over").style.display='block';
			//document.getElementById("score-final").innerHTML=score;
		}

		/*
		vector2f curSpeed = a * targetSpeed + (1-a) * curSpeed;
		if (fabs(curSpeed.x) < threshold) curSpeed.x = 0;
		if (fabs(curSpeed.y) < threshold) curSpeed.y = 0;
		*/

		// Set a different acceleration weighting if mid jump
		if (this.sprite.body.touching.down) {
			this.onPlatform + 0.1;
			this.movement.acceleration = 0.3;
		} else {
			this.onPlatform = 0;
			this.movement.acceleration = 0.1;
		}
		
		//  Allow the player to jump if they are touching the ground.
		if ((this.cursors.up.isDown || game.input.button_a == true) && this.sprite.body.touching.down)
		{
			this.sprite.body.velocity.y = -620;
		}

		// Left & Right Movement
		if (this.cursors.right.isDown || game.input.dpad_r == true)
		{
			//  Move to the right
			if (this.sprite.body.velocity.x < 0) {
				this.sprite.body.velocity.x = ((this.movement.acceleration * 0) + (1-this.movement.acceleration) * this.sprite.body.velocity.x);
			}
			this.sprite.body.velocity.x += ((this.movement.acceleration * this.movement.targetSpeed) + (1-this.movement.acceleration) * Math.abs(this.sprite.body.velocity.x))-Math.abs(this.sprite.body.velocity.x);
		} else if (this.cursors.left.isDown || game.input.dpad_l == true) {
			//  Move to the left
			if (this.sprite.body.velocity.x > 0) {
				this.sprite.body.velocity.x = ((this.movement.acceleration * 0) + (1-this.movement.acceleration) * this.sprite.body.velocity.x);
			}
			this.sprite.body.velocity.x -= ((this.movement.acceleration * this.movement.targetSpeed) + (1-this.movement.acceleration) * Math.abs(this.sprite.body.velocity.x))-Math.abs(this.sprite.body.velocity.x);
		} else {
			//  Bring to a halt
			this.sprite.body.velocity.x = ((this.movement.acceleration * 0) + (1-this.movement.acceleration) * this.sprite.body.velocity.x);
		}
		

		if (this.sprite.body.velocity.x > 5) {
		
			this.sprite.width = 70;
		
			if (this.sprite.body.touching.down) {
	 			this.sprite.animations.play('walk');
	 			
	 		} else {
	 			this.sprite.animations.play('jump');
	 		}
	 	} else if (this.sprite.body.velocity.x < -5){
	 	
	 		this.sprite.width = -70;
	 	
	 		if (this.sprite.body.touching.down) {
				this.sprite.animations.play('walk');
			} else {
				this.sprite.animations.play('jump');
			}
	 	} else {
		 	this.sprite.animations.stop();
			this.sprite.frame = 0;
	 	}

	},
	
	platformStand : function(player, platform) {
		player.body.velocity.y = 0;
	},
	
	fallDamage : function(player, ground) {
		//console.log(player)
		if (player.body.velocity.y > 800){
			health = 0;
			console.log(player.body.velocity.y);
		}
	},

	playerDeath : function (player, scope) {
		var createGib = function(i) {
			var gib = null;
			switch (i)
			{
				case 0:
			   		gib = scope.gibs.create(player.x, player.y, 'gib_head');
			   		break;
				case 1:
					gib = scope.gibs.create(player.x, player.y, 'gib_body');
					break;
				case 2: 
			    	gib = scope.gibs.create(player.x, player.y, 'gib_hat');
			    	break;
				default: 
					gib = scope.gibs.create(player.x, player.y, 'gib_limb');
					break;
			}

			gib.body.gravity.y = 600;
			gib.body.velocity.setTo(Math.random()*1000-500, Math.random()*1000-500);
			//gib.body.velocity.x = Math.random()*1000-500;
			//gib.body.velocity.y = Math.random()*1000-500;
			gib.anchor.setTo(0.5, 0.5);
			gib.body.rotation = Math.random()*360;

			gib.body.bounce.y = (Math.random()/2);
			gib.body.bounce.x = -0.7;
			gib.body.linearDamping = 5;
			gib.body.collideWorldBounds = true;

			
		}

		for (i=0; i<7; i++) {
			createGib(i);
		}
			
	}
}