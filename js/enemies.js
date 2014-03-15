Enemies = function(game) {
	this.game = game;
	this.shroomLord = null;
	this.speed = 3000;
	this.heart = 10;
}

Enemies.prototype = {
	
	preload: function() {
	   	this.game.load.spritesheet('shroomLord', 'assets/sprites/shroomLord_spritesheet.png', 360, 320);
	},

	create : function() {
		this.shroomLord = this.game.add.sprite(300, 280, 'shroomLord');
		this.shroomLord.anchor.setTo(0.5, 0);
		this.shroomLord.animations.add('walk', [2, 3, 4, 5, 6], 8, true);
		this.shroomLord.animations.add('hurt', [1, 1, 1], 10, false);

		//var anim = this.shroomLord.add.animation('hurt', [1, 1, 1], 10, false);


		//this.shroomLord.animations.onComplete(this.resetAnimation);

		this.shroomLord.animations.play('walk');
		this.shroomLord.body.setPolygon(177.18,0, 84.67,12.34, 31.64,34.83, 0,70.2, 0,100, 354.42,100, 354.42,70.2, 322.78,34.83, 269.75,12.34);
		this.shroomLord.body.offset.setTo(0,5);
		//this.shroomLord.body.checkCollision.bottom = false;
		this.shroomLord.body.moves = false;

		this.bossMove = game.add.tween(this.shroomLord)
			.to({ x: 724 }, 1500, Phaser.Easing.Linear.None)
			.to({ width: -360 }, 250, Phaser.Easing.Linear.None)
			.to({ x: 300 }, 1500, Phaser.Easing.Linear.None)
			.to({ width: 360 }, 250, Phaser.Easing.Linear.None)
			.loop()
			.start();


		this.bossKillAnim = game.add.tween(this.shroomLord)
			.to({ y: this.shroomLord.y-100 }, 800, Phaser.Easing.Quadratic.Out)
			.to({ y: 1200 }, 1200, Phaser.Easing.Quadratic.In)
	},
	
	update : function() {

	},

	playerBounce: function() {
		if (player.sprite.body.velocity.y < 0){ 
			player.sprite.body.velocity.y = -700;
			enemies.shroomLord.animations.play('hurt', 1, false);
			enemies.bossMove.pause();
			enemies.heart--;

			var resetAnim = function() {
				enemies.shroomLord.animations.play('walk');
				enemies.bossMove.resume();
			}

			if (enemies.heart <= 0){
				enemies.shroomLordDeath();
			} else {
				//resetAnim();
				game.time.events.add(Phaser.Timer.SECOND * 0.2, resetAnim);
			}
		}
		
	},

	shroomLordDeath: function() {

		enemies.bossMove.stop();
		enemies.bossKillAnim.start();

		//entities.bombs.forEachAlive(this.renderPhysics, this);
		//enemies.shroomLord.kill();
		game.time.events.add(Phaser.Timer.SECOND * 2, level.goalComplete);

		console.log(game.state.getCurrentState());

	},

	collisionCheck: function() {
		
		if (player.sprite.body.velocity.y < 400 || enemies.heart <= 0){ 
			return false;
		}else{
			return true;
		}
			
		/*
		if (enemies.shroomLord.body.touching.left || enemies.shroomLord.body.touching.right) {
			return false;
		} else {
			return true;
		}
		*/
	}
}