Bombs = function(game) {
	this.game = game;
	this.group = null;
	this.explosions = null;
}

Bombs.prototype = {

	create : function() {
		this.group = game.add.group();
		this.explosions = game.add.group();
		
		this.sfx_explosion = this.game.add.audio('sfx_explosion', 0.2, false);

	},

	spawn :function(x,y,velY_Offset) {
		velY_Offset = typeof velY_Offset !=='undefined' ? velY_Offset : 0;

		if (this.group.countDead() > 0){
			this.entity = this.group.getFirstDead();
			this.entity.reset(x, y, 1);
		} else { 
			this.entity = this.group.create(x, y, 'bomb');
			this.entity.anchor.setTo(0.5,0.5);
			game.physics.enable(this.entity, Phaser.Physics.ARCADE);
			this.entity.body.gravity.y = 600;
			this.entity.body.bounce.x = 0.7 + Math.random() * 0.2;
			this.entity.body.bounce.y = 0.2 + Math.random() * 0.2;
			this.entity.body.collideWorldBounds = true;
		}
		var countdown = this.entity.animations.add('countdown', [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1], 20, false);
		this.entity.animations.play('countdown');

		this.entity.body.velocity.x = (Math.random()*500)-250;
		this.entity.body.velocity.y = ((Math.random()*800)-400)+velY_Offset;
		
		this.game.time.events.add(Phaser.Timer.SECOND * 1.5, this.explode, this, this.entity);
		
	},
		
	spawnExplosion :function(x, y) {
		if (this.explosions.countDead() > 0){
			this.entity = this.explosions.getFirstDead();
			this.entity.reset(x, y, 1);
		} else { 
			this.entity = this.explosions.create(x, y, 'explosion');
			
			this.entity.anchor.setTo(0.5, 0.5);
			game.physics.enable(this.entity, Phaser.Physics.ARCADE);
			this.entity.body.setSize(160, 160, 0, 0);
			this.entity.body.moves = false;
			this.entity.animations.add('boom', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
		}
		this.entity.animations.play('boom', 24, false, true);
		
		this.sfx_explosion.play();
	},

	explode :function(entity) {
		//console.log(entity);
		this.spawnExplosion(entity.x,entity.y);
		entity.kill();
		//entities.createEntity();
	},

	

	update : function() {
		this.group.forEachAlive(this.updateBomb, this);
	},

	updateBomb : function(entity) {
		entity.angle = entity.body.x;
		entity.body.velocity.x = entity.body.velocity.x/1.002;
	},

	removalCheck :function() {
		var check = function(entity){
			if (entity.y > this.game.camera.y+this.game.camera.height+100){
				entity.kill();
			}
		}
		this.group.forEachAlive(check, this);
	},





}