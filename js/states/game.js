var StateGame = function(game) { };
StateGame.prototype = {
	preload: function() {
	},
	
	create: function() {
		level.create();
		player.create();
		entities.create();
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
		
		game.physics.collide(level.platforms, player.gibs);
		game.physics.collide(level.boundary, player.gibs);
	
		player.update();
		entities.update();
		level.update();
	
		//document.getElementById("score").innerHTML=score;
	 	//document.getElementById("health").innerHTML=health;
	 	document.getElementById("health-bar").style.width= player.heart + "%";		
	},
	
	render : function() {
		game.debug.renderText("FPS: " + game.time.fps, 940, 30);

		if (debug == true){

			// Sprite debug info
			entities.bombs.forEachAlive(renderPhysics, this)
			entities.shrooms.forEachAlive(renderPhysics, this)
			level.platforms.forEachAlive(renderPhysics, this)
			entities.explosions.forEachAlive(renderPhysics, this)
	
			game.debug.renderSpriteCorners(player.sprite, false, false);
			game.debug.renderBodyInfo(player.sprite, 32, 32);
		}		
	}
}