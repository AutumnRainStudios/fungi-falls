Enemies = function(game) {
	this.game = game;
	this.shroomLord = null;
}

Enemies.prototype = {
	
	preload: function() {
	   	this.game.load.spritesheet('shroomLord', 'assets/sprites/shroomLord_spritesheet.png', 360, 320);
	},

	create : function() {
		this.shroomLord = this.game.add.sprite(100, 320, 'shroomLord');
		this.shroomLord.animations.add('walk', [2, 3, 4, 5, 6], 8, true);
		this.shroomLord.animations.play('walk');

		this.bossMove=this.game.add.tween(this.shroomLord);
		this.bossMove.to({x: 924}, 3000, Phaser.Easing.Quadratic.InOut, true, 0, true, true);
		this.bossMove.start();

	},
	
	update : function() {

	}
}