Bombs = function(game) {
	this.game = game;
	this.group = null;
}

Bombs.prototype = {

	create : function() {
		this.group = game.add.group();


	},

	spawn :function(x,y) {

		if (this.group.countDead() > 0){
			this.entity = this.group.getFirstDead();
			this.entity.x = x;
			this.entity.y = y;
			this.entity.revive();
		} else { 
			this.entity = this.group.create(x, y, 'bomb');
			this.entity.anchor.setTo(0.5,0.5);
			game.physics.enable(this.entity, Phaser.Physics.ARCADE);
			this.entity.body.gravity.y = 600;
			this.entity.body.bounce.x = 0.7 + Math.random() * 0.2;
			this.entity.body.bounce.y = 0.2 + Math.random() * 0.2;
			this.entity.body.collideWorldBounds = true;
		}
		var countdown = this.entity.animations.add('countdown', [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1], 10, false);
		this.entity.animations.play('countdown');

		this.entity.body.velocity.x = (Math.random()*500)-250;
		
		//this.game.time.events.add(Phaser.Timer.SECOND * 2, this.explode);
		
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

	explode :function() {
		console.log('wat');
		//this.spawnExplosion(this.x,this.y);
		//this.kill();
		//entities.createEntity();
	},

	update : function() {
		this.group.forEachAlive(this.updateBomb, this);
	},

	updateBomb : function(entity) {
		entity.angle = entity.body.x;
		entity.body.velocity.x = entity.body.velocity.x/1.002;
	},







}