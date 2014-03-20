Shrooms = function(game) {
	this.game = game;
	this.group = null;
}

Shrooms.prototype = {

	create : function() {
		this.group = game.add.group();
	},

	spawn :function(x,y) {

		if (this.group.countDead() > 0){
			this.entity = this.group.getFirstDead();
			this.entity.reset(x, y, 1);
		} else { 
			if (Math.random() <= 0.5) {
				//this.entity = this.shrooms.create(Math.random()*924+100, player.sprite.y-512, 'shroom1');
				this.entity = this.group.create(x, y, 'shroom1');
			} else {
				this.entity = this.group.create(x, y, 'shroom2');
			}
			this.entity.anchor.setTo(0.5,0.5);
			game.physics.enable(this.entity, Phaser.Physics.ARCADE);
			this.entity.body.gravity.y = 600;
			this.entity.body.bounce.x = 0.7;
			this.entity.body.bounce.y = 0.6;
			this.entity.body.collideWorldBounds = true;
		}
		this.entity.body.velocity.x = (Math.random()*500)-250;
	},
	
	update : function() {
		this.group.forEachAlive(this.updateShroom, this);
	},

	updateShroom : function(entity) {
		if (entity.body.wasTouching.down){
			entity.body.velocity.x = entity.body.velocity.x/1.1;
		}
	},

	collect: function(player, shroom) {
		shroom.kill();
		score++;
	}

}