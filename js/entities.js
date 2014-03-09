Entities = function(game) {
	this.game = game;
	this.sprite = null;
	this.bombs = null;
	this.shrooms = null;
	this.explosions = null;
	this.shroomLord = null;
	this.runBombs = false;
}

Entities.prototype = {
	
	preload: function() {
		this.game.load.image('shroom1', 'assets/sprites/entity_shroom_red.png');
		this.game.load.image('shroom2', 'assets/sprites/entity_shroom_tan.png');
	   	this.game.load.spritesheet('bomb', 'assets/sprites/entity_bomb_spritesheet.png', 60, 60);
	   	this.game.load.spritesheet('explosion', 'assets/sprites/explosion.png', 200, 200);
	   	this.game.load.image('star', 'assets/sprites/star.png');
	   	this.game.load.spritesheet('shroomLord', 'assets/sprites/shroomLord_spritesheet.png', 360, 320);
	},

	create : function() {
	
		this.shrooms = game.add.group();
		this.bombs = game.add.group();
		this.explosions = game.add.group();
		
		this.shroomLord = this.game.add.sprite(400, 320, 'shroomLord');
		this.shroomLord.animations.add('walk', [2, 3, 4, 5, 6], 8, true);
		this.shroomLord.animations.play('walk');


				for (var i = 0; i < 10; i++)
				{
					//this.spawnBomb(false);
				}

	},
	
	update : function() {
		game.physics.overlap(player.sprite, this.explosions, this.explosionDamage, null, this);
		this.bombs.forEachAlive(this.updateBomb, this);


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
		bomb.timer -= 1;
		if ([224,168,126,94,70,52,38,30,22,16,12,9,6].indexOf(bomb.timer) > -1){
			bomb.frame = 1;
		} else {
			bomb.frame = 0;
		}
	},
	
	createEntity : function() {
		if (Math.random() <= difficulty) {
			this.spawnShroom();
		} else {
			this.spawnBomb();
		} 
	},

	spawnShroom : function() {
		if (this.shrooms.countDead() > 0){
			var shroom = this.shrooms.getFirstDead();
			shroom.x = Math.random()*924+100;
			shroom.y = player.sprite.y-640;
			shroom.revive();
		} else {
			if (Math.random() <= 0.5) {
				var shroom = this.shrooms.create(Math.random()*924+100, player.sprite.y-512, 'shroom1');
			} else {
				var shroom = this.shrooms.create(Math.random()*924+100, player.sprite.y-512, 'shroom2');
			}
			shroom.body.gravity.y = 600;
			shroom.body.bounce.y = (Math.random()/2);
			shroom.body.bounce.x = -0.7;
			shroom.body.linearDamping = 5;
			shroom.body.collideWorldBounds = true;
		}
		shroom.body.velocity.x = (Math.random()*500)-250;
	},

	spawnBomb :function(timer) {
		console.log(timer);
		timer = typeof timer !== 'undefined' ? timer : true;
		if (this.bombs.countDead() > 0){
			var bomb = this.bombs.getFirstDead();
			bomb.x = Math.random()*924+100;
			bomb.y = player.sprite.y-640;
			bomb.revive();
		} else { 
			var bomb = this.bombs.create(Math.random()*924+100, player.sprite.y-512, 'bomb');
			bomb.body.setCircle(28,28,30);
			bomb.anchor.setTo(0.5,0.5);
			bomb.body.gravity.y = 600;
			bomb.body.bounce.x = 0.7 + Math.random() * 0.2;
			bomb.body.bounce.y = 0.2 + Math.random() * 0.2;
			bomb.body.linearDamping = -10;
			bomb.body.collideWorldBounds = true;
		}
		bomb.timer = 200;
		bomb.body.velocity.x = (Math.random()*500)-250;
		
		if (timer == true) {
			this.game.time.events.add(Phaser.Timer.SECOND * 2, this.bombBlast, bomb);
		}
		
	},
		
	spawnExplosion :function(x, y) {
		if (this.explosions.countDead() > 0){
			var exp = this.explosions.getFirstDead();
			exp.x = x;
			exp.y = y;
			exp.revive();
		} else { 
			var exp = this.explosions.create(x, y, 'explosion');
			exp.animations.add('boom', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
			exp.body.setCircle(80, 100, 100);
			exp.anchor.setTo(0.5,0.5);
		}
		exp.animations.play('boom', 24, false, true);
	},

	bombBlast :function() {
		entities.spawnExplosion(this.x,this.y);
		entities.createEntity();
		this.kill();
	},
		
	collectShroom :function (player, shroom) {
		shroom.kill();
		entities.createEntity();
		score += 10;
	},
	
	recycleEntity: function (collector, entity) {
		entity.x = Math.random()*924+100;
		entity.y = player.sprite.y-640;
		entity.body.velocity.y = 0;
		entity.body.velocity.x = (Math.random()*500)-250;
	},
	
	explosionDamage : function(player, exp) {
		player.animations.play('hurt');
		player.heart--;
	},

}