var StateGame = function(game) {
	this.cameraPosition = null;
};
StateGame.prototype = {
	preload: function() {
		this.controls = new Controls(game);

		this.player = new Player(game);

		//level = new Level(game);

		//entities = new Entities(game);

		//enemies = new Enemies(game);
	

	},
	
	create: function() {

		//this.createControls();








		//level.create();
		this.player.create();
		//entities.create();
		//enemies.create();



		// Camera Setup
		this.game.camera.follow(this.player.sprite);
		this.game.camera.deadzone = new Phaser.Rectangle(50,(this.game.camera.height/8)*4,this.game.camera.width-100,this.game.camera.height/8*2);



		//this.cursors = this.game.input.keyboard.createCursorKeys();

		this.controls.create();


	},
	
	update: function() {

		this.controls.update();

		// Player Controls
		if (this.controls.input.a) {
			this.player.jump();
		}

		if (this.controls.input.left) {
			this.player.move('left');
		} else if (this.controls.input.right) {
			this.player.move('right');
		} else {
			this.player.halt();
		}


		// Camera Controls
		if (this.game.camera.y >= this.game.world.height - 640) {
			this.cameraPosition = 'bottom';
		} else if (this.game.camera.y < this.game.world.height - 640 && this.cameraPosition != 'middle' && this.cameraPosition != 'top') {
			this.cameraPosition = 'middle';
		//} else if (this.game.camera.y < 840 && this.cameraPosition != 'midTop' && this.cameraPosition != 'top') {
			//this.cameraPosition = 'midTop';
		} else if (this.game.camera.y < 640 && this.cameraPosition != 'top') {
			this.cameraPosition = 'top';
		} 


		if (this.game.camera.y <= 120){
			if (!this.cameraToggle) {
				this.game.camera.follow(null);
				game.add.tween(this.game.camera).to({ y: 0 }, 500, Phaser.Easing.Linear.None).start();
				this.cameraToggle = true;
			}
		}

		/*
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
		*/
		//player.update();
		//entities.update();
		//enemies.update();
		//level.update();
	
		//document.getElementById("score").innerHTML=score;
	 	//document.getElementById("health").innerHTML=health;
	 	//document.getElementById("health-bar").style.width= player.heart + "%";		
	},





	
	render: function() {
		game.debug.renderText("FPS: " + game.time.fps, 850, 30);
		//game.debug.renderText("Diff: " + difficulty, 850, 50);
		//game.debug.renderText("CPos: " + this.player.cameraPosition, 850, 70);
		//game.debug.renderText("State: " + gameState, 850, 90)
		
		if (debug == true){
			// Sprite debug info
			//entities.bombs.forEachAlive(this.renderPhysics, this);
			//entities.shrooms.forEachAlive(this.renderPhysics, this);
			//level.platforms.forEachAlive(this.renderPhysics, this);
			//entities.explosions.forEachAlive(this.renderPhysics, this);
	
			//game.debug.renderPhysicsBody(enemies.shroomLord.body);
			//game.debug.renderPhysicsBody(player.sprite.body);
			//game.debug.renderBodyInfo(player.sprite, 32, 32);

			//this.controls.render();	
		}	


	},

	destroy: function(){
		delete enemies;
		delete entities;
		delete player;
		delete level;
	},

	renderPhysics: function(entity) {
		game.debug.renderPhysicsBody(entity.body);
	}
}