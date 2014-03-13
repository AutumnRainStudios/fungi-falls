Entities = function(game) {
	this.game = game;
	this.sprite = null;
	this.bombs = null;
	this.shrooms = null;
	this.explosions = null;
	this.shroomLord = null;
	this.runBombs = false;
	this.entity = null;
	this.explosion = null;
}

Entities.prototype = {
	
	preload: function() {
		this.game.load.image('shroom1', 'assets/sprites/entity_shroom_red.png');
		this.game.load.image('shroom2', 'assets/sprites/entity_shroom_tan.png');
	   	this.game.load.spritesheet('bomb', 'assets/sprites/entity_bomb_spritesheet.png', 60, 60);
	   	this.game.load.spritesheet('explosion', 'assets/sprites/explosion_spritesheet.png', 200, 200);
	},

	create : function() {
	
		this.shrooms = game.add.group();
		this.bombs = game.add.group();
		this.explosions = game.add.group();

		for (var i = 0; i < 10; i++)
		{
			//this.spawnBomb(false);
		}

	},
	
	update : function() {
		game.physics.overlap(player.sprite, this.explosions, player.playerDeath, null, this);
		this.bombs.forEachAlive(this.updateBomb, this);

		difficulty = (this.game.camera.y/this.game.world.height)+0.1;

		if (player.sprite.y < game.world.height-640 && this.runBombs == false) {
			this.runBombs = true;
				for (var i = 0; i < 20; i++)
				{
					this.createEntity();
				}
		}
	},
	
	updateBomb : function(bomb) {
		bomb.angle = bomb.body.x;
	},
	
	createEntity : function() {
		if (Math.random() < difficulty) {
			this.spawnShroom();
		} else {
			this.spawnBomb();
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

	spawnBomb :function() {

		if (this.bombs.countDead() > 0){
			this.entity = this.bombs.getFirstDead();
			this.entity.x = Math.random()*924+100;
			this.entity.y = player.sprite.y-640;
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
		//player.animations.play('hurt');
		player.playerDeath();
	},

}