Boss = function(game) {
	this.game = game;
	this.sprite = null;
	this.speed = 3000;
	this.alive = true;
}

Boss.prototype = {
	
	create : function() {
		this.sprite = this.game.add.sprite(100, 440, 'shroomLord');
		this.sprite.anchor.setTo(0.5, 0.5);
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.setSize(300, 10, 0, -90);
		this.sprite.body.immovable = true;
		this.sprite.body.moves = false;
		this.sprite.animations.add('walk', [2, 3, 4, 5, 6], 8, true);
		this.sprite.animations.add('hurt', [1], 10, false);

		this.sprite.heart = 10;
		//var anim = this.shroomLord.add.animation('hurt', [1, 1, 1], 10, false);


		//this.shroomLord.animations.onComplete(this.resetAnimation);

		this.sprite.animations.play('walk');

		//this.sprite.body.setPolygon(177.18,0, 84.67,12.34, 31.64,34.83, 0,70.2, 0,100, 354.42,100, 354.42,70.2, 322.78,34.83, 269.75,12.34);
		//this.sprite.body.offset.setTo(0,5);
		//this.shroomLord.body.checkCollision.bottom = false;
		this.sprite.body.immovable = true;

		this.sprite.moveTween = game.add.tween(this.sprite)
			.to({ x: 704 }, 1500, Phaser.Easing.Quadratic.In)
			.to(null, 250, Phaser.Easing.Linear.None)
			.to({ x: 280 }, 1500, Phaser.Easing.Quadratic.In)
			.to(null, 250, Phaser.Easing.Linear.None)
			.loop()
			.start();

		this.sprite.directionTween = game.add.tween(this.sprite)
			.to(null, 1500, Phaser.Easing.Linear.None)
			.to({ width: -360 }, 250, Phaser.Easing.Linear.None)
			.to(null, 1500, Phaser.Easing.Linear.None)
			.to({ width: 360 }, 250, Phaser.Easing.Linear.None)
			.loop()
			.start();


		this.sprite.killTween = game.add.tween(this.sprite)
			.to({ y: this.sprite.y-100 }, 800, Phaser.Easing.Quadratic.Out)
			.to({ y: 1200 }, 1200, Phaser.Easing.Quadratic.In)

		this.sprite.hurtTween = game.add.tween(this.sprite)
			.to({ y: this.sprite.y-10 }, 100, Phaser.Easing.Quadratic.Out)
			.to({ y: this.sprite.y }, 100, Phaser.Easing.Quadratic.Out)


	},
	
	update : function() {

	},

	playerBounce: function(player, boss) {
		if (player.body.velocity.y < 1){ 
			console.log('bounce');
			player.body.velocity.y = -500;
			boss.animations.play('hurt', 1, false);
			boss.hurtTween.start();
			boss.heart--;

			var resetAnim = function() {
				boss.animations.play('walk');
			}
			if (boss.heart > 0){
				game.time.events.add(Phaser.Timer.SECOND * 0.3, resetAnim);
			}

		}
	},

	deathOutro: function() {
		if (this.alive == true) {
			this.sprite.killTween.start();
			this.sprite.directionTween.stop();
			this.alive = false;
		}
	},

	collisionCheck: function(player, boss) {	
		if (player.body.velocity.y < 10 || boss.heart <= 0){ 
			return false;
		} else {
			return true;
		}
	},

	render :function() {
		game.debug.text("Boss: " + this.sprite.heart, 850, 150);
	}
}