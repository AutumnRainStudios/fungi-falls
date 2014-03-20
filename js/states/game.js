var StateGame = function(game) {
	this.cameraPosition = null;
	this.difficulty = 0;
	this.progress = "intro";
};
StateGame.prototype = {
	preload: function() {
		this.background = new Background(game);
		this.player = new Player(game);
		this.platforms = new Platforms(game);
		this.bombs = new Bombs(game);
		this.shrooms = new Shrooms(game);
		this.controls = new Controls(game);
	},
	
	create: function() {
		this.game.world.setBounds(0, 0, 1024, 4096);

		this.background.create();

		this.bed = this.game.add.sprite(game.world.width/2, game.world.height-165, 'bed');
		this.bed.animations.add('sleep', [0, 1, 2, 3, 4], 4, true);
		this.bed.animations.add('awake', [5], 1, true);
		this.bed.animations.add('empty', [6], 1, true);
		this.bed.animations.play('sleep');


		this.score = game.add.text(game.camera.width-40, 20, "0", {
	        font: "10px Arial",
	        fill: "#ff0044",
	        align: "center"
	    });




		this.platforms.create();
		this.bombs.create();
		this.shrooms.create();
		this.controls.create();

		this.spawnTimer = new Timer(this.game, 500, this.spawnEntity, this);

		this.introInit();
	},
	
	update: function() {

		this.background.update();

		this.bombs.update();

		
		this.collisionChecks();

		this.progressManager();
		
		if (this.progress != 'intro') {
			if (this.progress == 'start'){
				this.controlsUpdate();

			}
			if (this.progress == 'mid') {
				this.controlsUpdate();
			}
			if (this.progress == 'boss') {
				this.controlsUpdate();
			}
		}
	
		//document.getElementById("score").innerHTML=score;
	 	//document.getElementById("health").innerHTML=health;
	 	//document.getElementById("health-bar").style.width= player.heart + "%";	

		this.score.setText(score);


	},

	introInit: function() {

		for (i=0; i<10; i++){
			this.bombs.spawn(Math.random()*game.world.width,game.world.height-600)
		}

		this.introTimer = this.game.time.create(false);
		this.introTimer.start();
		this.introTimer.add(Phaser.Timer.SECOND * 4, this.startInit, this);

		var wakeUp = function(){
			this.bed.animations.play('awake');
		}

		this.wakeTimer = this.game.time.create(false);
		this.wakeTimer.start();
		this.wakeTimer.add(Phaser.Timer.SECOND * 3, wakeUp, this);

		this.game.camera.y = game.world.height;
	},
	
	startInit: function() {

		this.player.create();
		this.bed.animations.play('empty');

		// Camera Setup
		this.game.camera.follow(this.player.sprite);
		this.game.camera.deadzone = new Phaser.Rectangle(50,(this.game.camera.height/8)*4,this.game.camera.width-100,this.game.camera.height/8*2);
		
		this.controls.enable();
		this.spawnTimer.start();
		
		this.progress = 'start';
		
	},
	
	bossInit: function() {
		if (this.game.camera.y <= 120){
			if (!this.cameraToggle) {
				this.game.camera.follow(null);
				game.add.tween(this.game.camera).to({ y: 0 }, 500, Phaser.Easing.Linear.None).start();
				this.cameraToggle = true;
			}
		}
	},

	controlsUpdate : function() {

		this.controls.update();

		// Jump
		if (this.controls.input.a) {
			this.player.jump();
		} 
		// Left & Right
		if (this.controls.input.left) {
			this.player.move('left');
		} else if (this.controls.input.right) {
			this.player.move('right');
		} else {
			this.player.halt();
		}
	},


	spawnEntity: function() {
		if (Math.random() < 0.5) {
			this.shrooms.spawn(Math.random()*game.world.width,this.player.sprite.y-600);
		} else {
			this.bombs.spawn(Math.random()*game.world.width,this.player.sprite.y-600);
		}
		
	},

	progressManager : function() {
		// Camera Controls
		if (this.progress != 'intro') {
			if (this.game.camera.y <= 640) {
				this.progress = 'boss';
			} else if (this.game.camera.y > 640 && this.game.camera.y < this.game.world.height - 700) {
				this.progress = 'mid';
			} else {
				this.progress = 'start';
			}
		}
	},


	collisionChecks : function() {

		// Player interactions with platforms
		game.physics.arcade.overlap(this.player.sprite, this.platforms.group, this.player.fallDamage, null, this.player);
		game.physics.arcade.collide(this.player.sprite, this.platforms.group, null, this.player.platformCollision, this.player);

		// Kill player on contact with explosion
		game.physics.arcade.collide(this.player.sprite, this.bombs.explosions, null, this.player.death, this.player);

		// Collect shrooms
		game.physics.arcade.overlap(this.player.sprite, this.shrooms.group, null, this.shrooms.collect, this.shrooms);

		// Collide entities against platforms
		game.physics.arcade.collide(this.platforms.group, this.bombs.group);
		game.physics.arcade.collide(this.platforms.group, this.shrooms.group);
		game.physics.arcade.collide(this.platforms.group, this.player.gibs);




		/*
		
	
	 	game.physics.overlap(level.entityCollector, level.platforms, level.dropPlatform, null, this);
	 	game.physics.overlap(level.entityCollector, entities.shrooms, entities.recycleEntity, null, this);
	 	game.physics.overlap(level.entityCollector, entities.bombs, entities.recycleEntity, null, this);
		

		
		
		
	 	game.physics.collide(level.platforms, entities.shrooms);
		

		game.physics.collide(player.sprite, enemies.shroomLord, enemies.playerBounce, enemies.collisionCheck);
		
		game.physics.collide(level.platforms, player.gibs);
		game.physics.collide(level.boundary, player.gibs);
		*/


	},
	
	render: function() {





		if (debug == true){

			//this.player.render();

			Phaser.Time.advancedTiming = true;
			game.debug.text("FPS: " + game.time.fps, 850, 30);

			//game.debug.renderText("Diff: " + difficulty, 850, 50);
			//game.debug.renderText("CPos: " + this.player.cameraPosition, 850, 70);
			game.debug.text("Prgrs: " + this.progress, 850, 90);

			// Sprite debug info
			//entities.bombs.forEachAlive(this.renderPhysics, this);
			//entities.shrooms.forEachAlive(this.renderPhysics, this);
			this.platforms.group.forEachAlive(this.renderPhysics, this);
			this.bombs.group.forEachAlive(this.renderPhysics, this);
			this.bombs.explosions.forEachAlive(this.renderPhysics, this);
			//entities.explosions.forEachAlive(this.renderPhysics, this);
	
			//game.debug.renderPhysicsBody(enemies.shroomLord.body);
			//game.debug.body(this.player.sprite);
			

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