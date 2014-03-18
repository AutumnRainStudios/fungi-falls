var StateGame = function(game) {
	this.cameraPosition = null;
};
StateGame.prototype = {
	preload: function() {
		

		this.background = new Background(game);
		this.player = new Player(game);
		this.platforms = new Platforms(game);
		this.bombs = new Bombs(game);
		this.controls = new Controls(game);

		//level = new Level(game);

		//entities = new Entities(game);

		//enemies = new Enemies(game);
	

	},
	
	create: function() {

		this.game.world.setBounds(0, 0, 1024, 4096);

		this.background.create();


		this.bed = this.game.add.sprite(game.world.width/2, game.world.height-165, 'bed');
		this.bed.animations.add('sleep', [0, 1, 2, 3, 4], 4, true);
		this.bed.animations.add('empty', [6], 1, true);
		this.bed.animations.play('sleep');


		this.player.create();
		this.platforms.create();
		this.bombs.create();
		//enemies.create();

		/*
		this.bombTimer = new Phaser.Timer(this.game, false);
		this.bombTimer.loop(Phaser.Timer.SECOND * 2, this.bombs.spawn, this.bombs, 200, game.world.height-600);
		this.bombTimer.start();
		*/
		

		console.log(this.bombTimer);

		var output = function(object) {
			console.log(object);
		}




		this.bombTimer = this.game.time.create(false);

		this.bombTimer.start();

		this.bombTimer.repeat(Phaser.Timer.SECOND * 1, 10, this.bombs.spawn, this.bombs, 200, game.world.height-600);
		
		
		
		var stuff = this.game.time.create(false);
		stuff.start()
		stuff.loop(Phaser.Timer.SECOND * 5, output, this, this.bombTimer);



		//console.log(this.bombTimer);

		//this.timer = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.bombs.spawn, this.bombs, 200,game.world.height-600);



		// Camera Setup
		this.game.camera.follow(this.player.sprite);
		this.game.camera.deadzone = new Phaser.Rectangle(50,(this.game.camera.height/8)*4,this.game.camera.width-100,this.game.camera.height/8*2);



		//this.cursors = this.game.input.keyboard.createCursorKeys();

		this.controls.create();





	},

	spawn: function() {
		this.bombs.spawn(200,game.world.height-600);
	},
	
	update: function() {

		this.background.update();

		this.bombs.update();



		this.controls.update();

		// Player Controls
		if (this.controls.input.a) {
			this.player.jump();
		} 

		if (this.controls.input.left) {
			this.player.move('left');
			this.bombTimer.pause();
		} else if (this.controls.input.right) {
			this.player.move('right');
			
			this.bombTimer.start();
			//this.bombTimer.loop(Phaser.Timer.SECOND * 1, this.bombs.spawn, this.bombs, 200, game.world.height-600);
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

		/*
		if (this.game.camera.y <= 120){
			if (!this.cameraToggle) {
				this.game.camera.follow(null);
				game.add.tween(this.game.camera).to({ y: 0 }, 500, Phaser.Easing.Linear.None).start();
				this.cameraToggle = true;
			}
		}
		*/
		game.physics.arcade.overlap(this.player.sprite, this.platforms.group, this.player.fallDamage, null, this.player);
		game.physics.arcade.collide(this.player.sprite, this.platforms.group, null, this.player.platformCollision, this.player);


		game.physics.arcade.collide(this.platforms.group, this.bombs.group);

		/*
		game.physics.overlap(player.sprite, entities.shrooms, entities.collectShroom, null, this);
	
	 	game.physics.overlap(level.entityCollector, level.platforms, level.dropPlatform, null, this);
	 	game.physics.overlap(level.entityCollector, entities.shrooms, entities.recycleEntity, null, this);
	 	game.physics.overlap(level.entityCollector, entities.bombs, entities.recycleEntity, null, this);
		

		
		
		
	 	game.physics.collide(level.platforms, entities.shrooms);
		

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
		if (debug == true){

			this.player.render();

			Phaser.Time.advancedTiming = true;
			game.debug.text("FPS: " + game.time.fps, 850, 30);

			//game.debug.renderText("Diff: " + difficulty, 850, 50);
			//game.debug.renderText("CPos: " + this.player.cameraPosition, 850, 70);
			//game.debug.renderText("State: " + gameState, 850, 90)

			// Sprite debug info
			//entities.bombs.forEachAlive(this.renderPhysics, this);
			//entities.shrooms.forEachAlive(this.renderPhysics, this);
			this.platforms.group.forEachAlive(this.renderPhysics, this);
			this.bombs.group.forEachAlive(this.renderPhysics, this);
			//entities.explosions.forEachAlive(this.renderPhysics, this);
	
			//game.debug.renderPhysicsBody(enemies.shroomLord.body);
			game.debug.body(this.player.sprite);
			

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
		game.debug.body(entity);
	}
}