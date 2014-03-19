Player = function(game) {
	this.game = game;
	this.sprite = null;
	this.gibs = null;

	this.movement = {
		targetSpeed : 300,
		acceleration : 0
	}
}

Player.prototype = {
	
	create : function() {

		this.sprite = game.add.sprite(600, game.world.height - 150, 'player');
		//this.sprite = game.add.sprite(620, 100, 'player');
		this.sprite.heart = 10;

		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.gravity.y = 900;
		//this.sprite.body.bounce.y = 0.001;
		this.sprite.body.linearDamping = -10;
		this.sprite.body.setSize(40, 100, -15, 0);
		//this.sprite.body.checkCollision.down = true;
		this.sprite.body.collideWorldBounds = true;

	 	this.sprite.animations.add('walkRight', [5, 6, 7, 8, 9, 10], 16, true);
		this.sprite.animations.add('walkLeft', [11, 12, 13, 14, 15, 16], 16, true);
		this.sprite.animations.add('jumpRight', [1, 2], 8, true);
		this.sprite.animations.add('jumpLeft', [3, 4], 8, true);
		this.sprite.animations.add('hurt', [3, 4], 1, true);

		this.gibs = game.add.group();
	},

	jump: function() {
		//  Allow the player to jump if they are touching the ground.
		if (this.sprite.body.wasTouching.down) {
			this.sprite.body.velocity.y = -700;
		}
	},

	move: function(direction) {

		if (this.sprite.body.wasTouching.down) {
			this.movement.acceleration = 0.3;
		} else {
			this.movement.acceleration = 0.1;
		}

		/*
		vector2f curSpeed = a * targetSpeed + (1-a) * curSpeed;
		if (fabs(curSpeed.x) < threshold) curSpeed.x = 0;
		if (fabs(curSpeed.y) < threshold) curSpeed.y = 0;
		*/

		if (direction == 'right')
		{
			if (this.sprite.body.wasTouching.down) {
				this.sprite.animations.play('walkRight');
			} else {
				this.sprite.animations.play('jumpRight');
			}

			if (this.sprite.body.velocity.x < 0) {
				this.sprite.body.velocity.x = ((this.movement.acceleration * 0) + (1-this.movement.acceleration) * this.sprite.body.velocity.x);
			}
			this.sprite.body.velocity.x += ((this.movement.acceleration * this.movement.targetSpeed) + (1-this.movement.acceleration) * Math.abs(this.sprite.body.velocity.x))-Math.abs(this.sprite.body.velocity.x);
		} else if (direction == 'left') {

			if (this.sprite.body.wasTouching.down) {
				this.sprite.animations.play('walkLeft');
			} else {
				this.sprite.animations.play('jumpLeft');
			}

			//  Move to the left
			if (this.sprite.body.velocity.x > 0) {
				this.sprite.body.velocity.x = ((this.movement.acceleration * 0) + (1-this.movement.acceleration) * this.sprite.body.velocity.x);
			}
			this.sprite.body.velocity.x -= ((this.movement.acceleration * this.movement.targetSpeed) + (1-this.movement.acceleration) * Math.abs(this.sprite.body.velocity.x))-Math.abs(this.sprite.body.velocity.x);
		}
	},

	halt: function() {
		this.sprite.animations.stop();
		this.sprite.frame = 0;
		this.sprite.body.velocity.x = ((this.movement.acceleration * 0) + (1-this.movement.acceleration) * this.sprite.body.velocity.x);
	},

	fallDamage : function() {
		if (this.sprite.body.velocity.y > 800){
			console.log('kill');
			this.death();
		}
	},

	platformCollision: function(){
		if (this.sprite.body.velocity.y < 0){ 
			return false;
		}else{
			return true;
		}
	},

	death : function () {
		this.sprite.kill();
		for (i=0; i<7; i++) {
			this.gib = null;
			switch (i)
			{
				case 0:
			   		this.gib = this.gibs.create(this.sprite.x, this.sprite.y, 'gib_head');
			   		break;
				case 1:
					this.gib = this.gibs.create(this.sprite.x, this.sprite.y, 'gib_body');
					break;
				case 2: 
			    	this.gib = this.gibs.create(this.sprite.x, this.sprite.y, 'gib_hat');
			    	break;
				default: 
					this.gib = this.gibs.create(this.sprite.x, this.sprite.y, 'gib_limb');
					break;
			}

			this.gib.anchor.setTo(0.5, 0.5);
			game.physics.enable(this.gib, Phaser.Physics.ARCADE);
			this.gib.body.gravity.y = 600;
			this.gib.body.velocity.setTo(Math.random()*200-100, Math.random()* -1000);
			this.gib.body.rotation = Math.random()*360;
			this.gib.body.bounce.y = 0.5;
			this.gib.body.bounce.x = 0.5;
			this.gib.body.linearDamping = 50;
			this.gib.body.collideWorldBounds = true;
		}
	},

	render : function(){
		game.debug.bodyInfo(this.sprite, 32, 32);

	}


}