Entities = function(game) {
	this.game = game;
	this.sprite = null;
	this.bombs = null;
	this.shrooms = null;
	this.explosions = null;
	this.shroomLord = null;
	this.started = false;
	this.entity = null;
	this.explosion = null;
	this.startBombs = null;
}

Entities.prototype = {
	
	create : function() {
		this.shrooms = game.add.group();
		this.bombs = game.add.group();
		this.explosions = game.add.group();
		this.startBombs = game.add.group();
		//console.log(game.state.getCurrentState());
		if (gameState == 'start') {
			for (var i = 0; i < 10; i++) {
				this.spawnStartBomb();
			}
		}
	},
	
	update : function() {
		if (enemies.heart > 0){
			game.physics.overlap(player.sprite, this.explosions, player.playerDeath, null, this);
		}
		this.bombs.forEachAlive(this.updateBomb, this);
		difficulty = (this.game.camera.y/this.game.world.height)+0.1;
		this.progressCheck();
	},
	
	updateBomb : function(bomb) {
		bomb.angle = bomb.body.x;
	},
	
	progressCheck: function() {
		if (this.started == false && player.sprite.y < game.world.height-640) {
			this.started = true;
			for (var i = 0; i < 20; i++) {
				this.game.time.events.add(Phaser.Timer.SECOND * (i/2), this.createEntity, this);
			}
		}
	},
	
	createEntity : function() {
		if (enemies.heart>0 && player.cameraPosition != 'midTop'){
			if (Math.random() < difficulty) {
				this.spawnShroom();
			} else {
				this.spawnBomb();
			}
		}
	},

	spawnShroom : function() {
		if (this.shrooms.countDead() > 0){
			this.entity = this.shrooms.getFirstDead();
			this.entity.x = Math.random()*924+100;
			this.entity.y = player.sprite.y-640;
			this.entity.revive();
		} else {
			if (Math.random() <= 0.5) {
				this.entity = this.shrooms.create(Math.random()*924+100, player.sprite.y-512, 'shroom1');
			} else {
				this.entity = this.shrooms.create(Math.random()*924+100, player.sprite.y-512, 'shroom2');
			}
			this.entity.body.gravity.y = 600;
			this.entity.body.bounce.y = (Math.random()/2);
			this.entity.body.bounce.x = -0.7;
			this.entity.body.linearDamping = 5;
			this.entity.body.collideWorldBounds = true;
		}
		this.entity.body.velocity.x = (Math.random()*500)-250;
	},

	spawnStartBomb :function() { 
		this.entity = this.startBombs.create(Math.random()*924+100, game.world.height-700, 'bomb');
		this.entity.body.setCircle(20,20,30);
		this.entity.anchor.setTo(0.5,0.5);
		this.entity.body.gravity.y = 600;
		this.entity.body.bounce.x = 0.7 + Math.random() * 0.2;
		this.entity.body.bounce.y = 0.2 + Math.random() * 0.2;
		this.entity.body.linearDamping = -10;
		this.entity.body.collideWorldBounds = true;
		this.entity.body.velocity.x = (Math.random()*500)-250;
		//this.game.time.events.add(Phaser.Timer.SECOND * 2, this.bombBlast, this.entity);
	},

	spawnBomb :function() {

		if (this.bombs.countDead() > 0){
			this.entity = this.bombs.getFirstDead();
			
			if (player.cameraPosition == 'top') {
				this.entity.x = enemies.shroomLord.x;
				this.entity.y = enemies.shroomLord.y;
			} else {
				this.entity.x = Math.random()*924+100;
				this.entity.y = player.sprite.y-640;
			}
			this.entity.revive();
		} else { 
			this.entity = this.bombs.create(Math.random()*924+100, player.sprite.y-512, 'bomb');
			this.entity.body.setCircle(28,28,30);
			this.entity.anchor.setTo(0.5,0.5);
			this.entity.body.gravity.y = 600;
			this.entity.body.bounce.x = 0.7 + Math.random() * 0.2;
			this.entity.body.bounce.y = 0.2 + Math.random() * 0.2;
			this.entity.body.linearDamping = -10;
			this.entity.body.collideWorldBounds = true;
		}
		this.entity.animations.add('countdown', [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,0,1], 15, false);
		this.entity.animations.play('countdown');
		this.entity.body.velocity.x = (Math.random()*500)-250;
		
		this.game.time.events.add(Phaser.Timer.SECOND * 2, this.bombBlast, this.entity);
		
	},
		
	spawnExplosion :function(x, y) {
		if (this.explosions.countDead() > 0){
			this.explosion = this.explosions.getFirstDead();
			this.explosion.x = x;
			this.explosion.y = y;
			this.explosion.revive();
		} else { 
			this.explosion = this.explosions.create(x, y, 'explosion');
			this.explosion.animations.add('boom', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
			this.explosion.body.setCircle(80, 100, 100);
			this.explosion.anchor.setTo(0.5,0.5);
		}
		this.explosion.animations.play('boom', 24, false, true);
	},

	bombBlast :function() {
		entities.spawnExplosion(this.x,this.y);
		this.kill();
		entities.createEntity();
	},
		
	collectShroom :function (player, shroom) {
		shroom.kill();
		entities.createEntity();
		score += 1;
	},
	
	recycleEntity: function (collector, entity) {
		entity.x = Math.random()*924+100;
		entity.y = player.sprite.y-640;
		entity.body.velocity.y = 0;
		entity.body.velocity.x = (Math.random()*500)-250;
	},
	
	explosionDamage : function(player, exp) {
		if (enemies.heart > 0){
			player.playerDeath();
		}
	},

}