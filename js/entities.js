

Entities = function(game) {
	this.game = game;
	this.sprite = null;
	this.bombs = null;
	this.shrooms = null;
	
}

Entities.prototype = {
	
	preload: function() {
		this.game.load.image('shroom1', 'assets/tallShroom_red.png');
		this.game.load.image('shroom2', 'assets/tallShroom_brown.png');
	   	this.game.load.image('bomb', 'assets/bomb.png');
	   	this.game.load.image('star', 'assets/star.png');
	},

	create : function() {
	
		this.shrooms = game.add.group();
		this.bombs = game.add.group();
		
	   	//  Make it rain
		for (var i = 0; i < 20; i++)
		{
			this.createEntity();
		}
		
		 // Add some funky stuff
		emitterBomb = game.add.emitter(0, 0, 200);
		emitterBomb.makeParticles('star');
		emitterBomb.gravity = 200;
	},
	
	update : function() {
		game.physics.overlap(player.sprite, this.bombs, this.collectBomb, null, this);
		this.bombs.forEachAlive(this.updateBombRotation, this)
	},
	
	updateBombRotation : function(bomb) {
		bomb.angle = bomb.body.x;
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
			shroom.body.linearDamping = 5;
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
			bomb.body.setCircle(30,30,30);
			bomb.anchor.setTo(0.5,0.5);
			bomb.body.gravity.y = 600;
			bomb.body.bounce.x = 0.7 + Math.random() * 0.2;
			bomb.body.bounce.y = 0.7 + Math.random() * 0.2;
			bomb.body.linearDamping = 5;
			bomb.body.collideWorldBounds = true;
		}

		bomb.body.velocity.x = (Math.random()*500)-250;
		
	},
	
	bombBlast :function(bomb) {
		emitterBomb.x = bomb.x;
		emitterBomb.y = bomb.y;
		emitterBomb.start(true, 2000, null, 20);
	},
		
	collectShroom :function (player, shroom) {
		shroom.kill();
		entities.createEntity();
		score += 10;
	},
	
	collectBomb : function(player, bomb) {
		bomb.kill();
		this.bombBlast(bomb);
		entities.createEntity();
		player.frame = 1;
		health = health - 10;
	},

}