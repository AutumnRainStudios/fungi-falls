var StateGame = function(game) {
	this.gameState = '';
};
StateGame.prototype = {
	preload: function() {
	},
	
	create: function() {
		level.create();
		player.create();
		entities.create();
		enemies.create();
		controls.create();	
	},
	
	update: function() {
	
		game.physics.overlap(player.sprite, entities.shrooms, entities.collectShroom, null, this);
	
	 	game.physics.overlap(level.entityCollector, level.platforms, level.dropPlatform, null, this);
	 	game.physics.overlap(level.entityCollector, entities.shrooms, entities.recycleEntity, null, this);
	 	game.physics.overlap(level.entityCollector, entities.bombs, entities.recycleEntity, null, this);
		
		game.physics.overlap(player.sprite, level.boundary, player.fallDamage)
		game.physics.collide(player.sprite, level.platforms, null, level.platformCollision);
		
		game.physics.collide(level.boundary, player.sprite);
		game.physics.collide(level.boundary, entities.bombs);
	 	game.physics.collide(level.boundary, entities.shrooms);
		
	 	game.physics.collide(level.platforms, entities.shrooms);
		game.physics.collide(level.platforms, entities.bombs);

		game.physics.collide(player.sprite, enemies.shroomLord, enemies.playerBounce, enemies.collisionCheck);
		
		game.physics.collide(level.platforms, player.gibs);
		game.physics.collide(level.boundary, player.gibs);
	
		player.update();
		entities.update();
		enemies.update();
		level.update();
	
		//document.getElementById("score").innerHTML=score;
	 	//document.getElementById("health").innerHTML=health;
	 	//document.getElementById("health-bar").style.width= player.heart + "%";		
	},
	
	render: function() {
		game.debug.renderText("FPS: " + game.time.fps, 900, 30);
		game.debug.renderText("Diff: " + difficulty, 900, 50);
		game.debug.renderText("CPos: " + player.cameraPosition, 900, 70);
		this.gameState = game.state.getCurrentState();
		game.debug.renderText("State: " + this.gameState.key, 900, 90)
		
		if (debug == true){

			// Sprite debug info
			entities.bombs.forEachAlive(this.renderPhysics, this);
			entities.shrooms.forEachAlive(this.renderPhysics, this);
			level.platforms.forEachAlive(this.renderPhysics, this);
			entities.explosions.forEachAlive(this.renderPhysics, this);
			//enemies.explosions.forEachAlive(renderPhysics, this);
	
			game.debug.renderPhysicsBody(enemies.shroomLord.body);

			game.debug.renderPhysicsBody(player.sprite.body);

			game.debug.renderBodyInfo(player.sprite, 32, 32);
		}		
	},

	renderPhysics: function(entity) {
		game.debug.renderPhysicsBody(entity.body);
	}
}