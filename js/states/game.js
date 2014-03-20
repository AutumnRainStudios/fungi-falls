var StateGame = function(game) {
	this.difficulty = 0;
	this.progress = "intro";
	this.spawnTimer = null;
	this.sections = {
		intro : new Section(true),
		start : new Section(),
		mid : new Section(),
		boss : new Section(),
	},
	this.gui = {};
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


		this.platforms.create();
		this.bombs.create();
		this.shrooms.create();
		this.controls.create();

		this.spawnTimer = new Timer(this.game, 500, this.spawnEntity, this);

		this.gui.shroom = game.add.sprite(20, 25, 'shroom1');
		this.gui.shroom.fixedToCamera = true;
		this.gui.score = game.add.text(70, 30, "x0", {
	        font: "40px Arial",
	        fill: "#ff0044",
	        align: "left"
	    });
		this.gui.score.fixedToCamera = true;

		this.introInit();
	},
	
	update: function() {

		this.background.update();

		this.bombs.update();
		this.shrooms.update();

		
		this.collisionChecks();

		this.progressManager();
		
		if (this.sections.intro.isRunning() == false) {
			if (this.sections.start.isRunning()){
				this.controlsUpdate();
			}
			if (this.sections.mid.isRunning()) {
				this.controlsUpdate();
			}
			if (this.sections.boss.isRunning()) {
				this.controlsUpdate();
			}
		}
	
		//document.getElementById("score").innerHTML=score;
	 	//document.getElementById("health").innerHTML=health;
	 	//document.getElementById("health-bar").style.width= player.heart + "%";	

		this.gui.score.text = 'x' + score;


	},

	introInit: function() {

		for (i=0; i<6; i++){
			this.bombs.spawn(Math.random()*game.world.width,game.world.height-600)
		}

		this.introTimer = this.game.time.create(false);
		this.introTimer.start();
		this.introTimer.add(Phaser.Timer.SECOND * 3, this.startInit, this);

		var wakeUp = function(){
			this.bed.animations.play('awake');
		}

		this.wakeTimer = this.game.time.create(false);
		this.wakeTimer.start();
		this.wakeTimer.add(Phaser.Timer.SECOND * 2, wakeUp, this);

		this.game.camera.y = game.world.height;
	},
	
	startInit: function() {
		this.sections.intro.reset();

		this.player.create();
		this.bed.animations.play('empty');

		// Camera Setup
		this.game.camera.follow(this.player.sprite);
		this.game.camera.deadzone = new Phaser.Rectangle(50,(this.game.camera.height/8)*4,this.game.camera.width-100,this.game.camera.height/8*2);
		
		this.controls.enable();
		
		this.sections.start.start();
	},

	midInit: function() {
		this.spawnTimer.start();
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
		if (!this.sections.intro.isRunning()) {
			if (this.game.camera.y <= 640) {
				this.sections.boss.start();
				this.sections.mid.reset();
			} else if (this.game.camera.y > 640 && this.game.camera.y < this.game.world.height - 800) {
				this.sections.mid.start();
				this.sections.start.reset();
			} else {
				this.sections.start.start();
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

		game.physics.arcade.collide(this.shrooms.group, this.bombs.group);

		game.physics.arcade.collide(this.bombs.group, this.bombs.group);
		game.physics.arcade.collide(this.shrooms.group, this.shrooms.group);

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

			game.debug.text("Diff: " + this.difficulty, 850, 50);
			game.debug.text("spawnTimer: " + this.spawnTimer.paused, 850, 70);
			game.debug.text("Prgrs: " + this.progress, 850, 90);
			game.debug.text("MidGame?: " + this.sections.mid.isRunning(), 850, 110);

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
		console.log('Reseting game state');
		this.spawnTimer.stop();
		this.difficulty = 0;
		this.progress = "intro";
		this.spawnTimer = null;
	},

	renderPhysics: function(entity) {
		game.debug.body(entity);
	}
}