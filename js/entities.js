Entities = function(game) {
	this.game = game;
	this.sprite = null;
	this.bombs = null;
	this.shrooms = null;
	this.explosions = null;
}

Entities.prototype = {
	
	preload: function() {
		this.game.load.image('shroom1', 'assets/tallShroom_red.png');
		this.game.load.image('shroom2', 'assets/tallShroom_brown.png');
	   	this.game.load.spritesheet('bomb', 'assets/bomb_spritesheet.png', 70, 70);
	   	this.game.load.spritesheet('explosion', 'assets/explosion.png', 200, 200);
	   	this.game.load.image('star', 'assets/star.png');
	},

	create : function() {
	
		this.shrooms = game.add.group();
		this.bombs = game.add.group();
		this.explosions = game.add.group();
		
	   	//  Make it rain
		for (var i = 0; i < 20; i++)
		{
			this.createEntity();
		}
		
		 // Add some funky stuff
		emitterBomb = game.add.emitter(0, 0, 200);
		emitterBomb.makeParticles('star');
		emitterBomb.gravity = 10;
		//emitterBomb.minParticleSpeed = 1000;
	},
	
	update : function() {
		game.physics.overlap(player.sprite, this.explosions, this.explosionDamage, null, this);
		this.bombs.forEachAlive(this.updateBomb, this);
	},
	
	updateBomb : function(bomb) {
		bomb.angle = bomb.body.x;
		bomb.timer -= 1;
		if ([225,168,126,94,70,52,39,30,22,16,12,9,6].indexOf(bomb.timer) > -1){
			bomb.frame = 1;
		} else {
			bomb.frame = 0;
		}
	},
	
	createEntity : function() {
		if (Math.random() <= 0.8) {
			this.spawnShroom();
		} else {
			this.spawnBomb();
		} 
	},

	spawnShroom : function() {

		if (this.shrooms.countDead() > 0){
			var shroom = this.shrooms.getFirstDead();
			shroom.x = Math.random()*924+100;
			shroom.y = player.sprite.y-512;
			shroom.revive();
		} else {
			if (Math.random() <= 0.5) {
				var shroom = this.shrooms.create(Math.random()*924+100, player.sprite.y-512, 'shroom1');
			} else {
				var shroom = this.shrooms.create(Math.random()*924+100, player.sprite.y-512, 'shroom2');
			}
			shroom.body.gravity.y = 600;
			shroom.body.bounce.y = 0.7 + (Math.random() * 0.2);
			shroom.body.bounce.x = -0.7 - (Math.random() * 0.2);
			shroom.body.linearDamping = -10;
			shroom.body.collideWorldBounds = true;
		}
		shroom.body.velocity.x = (Math.random()*500)-250;
	},

	spawnBomb :function() {
	
		if (this.bombs.countDead() > 0){
			var bomb = this.bombs.getFirstDead();
			bomb.x = Math.random()*924+100;
			bomb.y = player.sprite.y-512;
			bomb.revive();
		} else { 
			var bomb = this.bombs.create(Math.random()*924+100, player.sprite.y-512, 'bomb');
			bomb.body.setCircle(35,35,35);
			bomb.anchor.setTo(0.5,0.5);
			bomb.body.gravity.y = 600;
			bomb.body.bounce.x = 0.7 + Math.random() * 0.2;
			bomb.body.bounce.y = 0.7 + Math.random() * 0.2;
			bomb.body.linearDamping = -10;
			bomb.body.collideWorldBounds = true;
			bomb.bombFrames = this.bombFrames;
		}
		bomb.timer = 400;
		bomb.body.velocity.x = (Math.random()*500)-250;
				
		this.game.time.events.add(Phaser.Timer.SECOND * 6, this.bombBlast, bomb);
		
	},
	
	bombBlast :function() {
		console.log('Timer: ' + this.timer);
		//this.timer -= 1;
		this.kill();
		entities.createEntity();
		entities.spawnExplosion(this.x,this.y)
			

 		emitterBomb.x = this.x;
 		emitterBomb.y = this.y;
 		emitterBomb.start(true, 1000, null, 10);
	},
		
		
	spawnExplosion :function(x, y) {
		var exp = this.explosions.create(x, y, 'explosion');
		exp.animations.add('boom', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 16, true);
		exp.body.setCircle(100, 100, 100);
		exp.anchor.setTo(0.5,0.5);
		exp.animations.play('boom', 16, false, true);
	},
		
	collectShroom :function (player, shroom) {
		shroom.kill();
		entities.createEntity();
		score += 10;
	},
	
	explosionDamage : function(player, exp) {
		//bomb.kill();
		//this.bombBlast(bomb);
		//entities.createEntity();
		player.frame = 1;
		health = health - 0.25;
	},

}