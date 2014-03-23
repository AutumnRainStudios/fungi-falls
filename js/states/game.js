var StateGame = function(game) {
	this.game = game;
	this.difficulty = 0;
	this.hardMode = false;
	this.spawnTimer = null;
	this.sectionManager = new SectionManager(['intro','start','mid','top','boss','outro']);
	this.gui = {};
};
StateGame.prototype = {
	preload: function() {
		this.background = new Background(game);
		if (hardMode){
			this.player = new Player(game, 1);
		} else {
			this.player = new Player(game, 16);
		}
		this.platforms = new Platforms(game);
		this.bombs = new Bombs(game);
		this.shrooms = new Shrooms(game);
		this.controls = new Controls(game);
		this.boss = new Boss(game);
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
		this.platforms.generateBossArena();
		this.bombs.create();
		this.shrooms.create();
		this.controls.create();

		this.spawnTimer = new Timer(this.game, 500, this.spawnEntity, this);

		this.gui.shroom = game.add.sprite(20, 25, 'shroom1');
		this.gui.shroom.fixedToCamera = true;
		this.gui.score = game.add.text(70, 30, "x0", {
	        font: "40px Arial",
	        fill: "#ffffff",
	        align: "left"
	    });
	    this.gui.score.fixedToCamera = true;

		this.gui.heart = game.add.sprite(160, 30, 'heart');
		this.gui.heart.animations.add('beat', [0, 1, 2, 3], 10, true);
		this.gui.heart.animations.play('beat');
		this.gui.heart.fixedToCamera = true;
		this.gui.health = game.add.text(200, 30, "0", {
	        font: "40px Arial",
	        fill: "#ffffff",
	        align: "left"
	    });
		this.gui.health.fixedToCamera = true;
		
		this.introInit();
	},
	
	update: function() {

		this.background.update();

		this.bombs.update();
		this.shrooms.update();

		this.collisionChecks();
		this.progressManager();
		
		if (this.sectionManager.isRunning('start')){
			this.controlsUpdate();
			this.platforms.removalCheck();
			this.bombs.removalCheck();
			this.shrooms.removalCheck();
		}
		if (this.sectionManager.isRunning('mid')) {
			this.controlsUpdate();
			this.platforms.removalCheck();
			this.bombs.removalCheck();
			this.shrooms.removalCheck();
		}
		if (this.sectionManager.isRunning('top')) {
			this.controlsUpdate();
			this.platforms.removalCheck();
			this.bombs.removalCheck();
			this.shrooms.removalCheck();
		}
		if (this.sectionManager.isRunning('boss')) {
			this.boss.update();
			this.controlsUpdate();

			if (this.boss.sprite.heart <= 0){
				if (!this.sectionManager.isInitialised('outro')){
					this.spawnTimer.stop();
					this.sectionManager.init('outro');
					console.log('running outro');
					this.boss.deathOutro();

					this.bombs.group.forEachAlive(this.bombs.explode, this.bombs);
					//enemies.shroomLord.kill();
					game.time.events.add(Phaser.Timer.SECOND * 2, this.playerWin);

					//console.log(game.state.getCurrentState());
					
				}
			}

		}

		if (!this.sectionManager.isRunning('intro')){
			if (this.player.sprite.heart <= 0){
				if (!this.sectionManager.isInitialised('outro')) {
					this.sectionManager.init('outro');

					this.player.death();

					this.timer = this.game.time.create(false);
					this.timer.start();
					this.timer.add(Phaser.Timer.SECOND * 4, this.playerLose);
				}
			}
		}

		this.difficulty = (this.game.camera.y/this.game.world.height)+0.1;
		this.gui.score.text = 'x' + score;
		this.gui.health.text = this.player.sprite.heart;

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
		this.sectionManager.init('intro');
	},
	
	startInit: function() {
		this.boss.create();
		this.player.create();
		this.bed.animations.play('empty');

		// Camera Setup
		this.game.camera.follow(this.player.sprite);
		this.game.camera.deadzone = new Phaser.Rectangle(50,(this.game.camera.height/8)*4,this.game.camera.width-100,this.game.camera.height/8*2);
		
		this.controls.enable();
		this.sectionManager.start('start');
	},

	midInit: function() {
		this.spawnTimer.start();
	},

	topInit: function() {
		this.spawnTimer.stop();
	},
	
	bossInit: function() {
		this.spawnTimer.start();
		this.game.camera.follow(null);
		game.add.tween(this.game.camera).to({ y: 0 }, 500, Phaser.Easing.Linear.None).start();
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
		var x = 0;
		var y = 0;
		var velY = 0;
		if (this.sectionManager.isRunning('boss')){
			x = this.boss.sprite.x;
			y = this.boss.sprite.y;
			velY = -1000;
		} else {
			x = Math.random()*game.world.width;
			y = this.player.sprite.y-600;
		}

		if (Math.random() < this.difficulty) {
			this.shrooms.spawn(x,y,velY);
		} else {
			this.bombs.spawn(x,y,velY);
		}
	},

	progressManager : function() {
		if (this.sectionManager.isRunning('start') && this.game.camera.y < this.game.world.height-640) {
			this.sectionManager.start('mid');
			if (!this.sectionManager.isInitialised('mid')) {
				this.sectionManager.init('mid');
				this.midInit();
			}
		}

		if (this.sectionManager.isRunning('mid') && this.game.camera.y < 640) {
			this.sectionManager.start('top');
			if (!this.sectionManager.isInitialised('top')) {
				this.sectionManager.init('top');
				this.topInit();
			}

		}

		if (this.sectionManager.isRunning('top') && this.game.camera.y < 100) {
			this.sectionManager.start('boss');
			if (!this.sectionManager.isInitialised('boss')) {
				this.sectionManager.init('boss');
				this.bossInit();
			}
		}
	},

	collisionChecks : function() {

		// Player interactions with platforms
		game.physics.arcade.overlap(this.player.sprite, this.platforms.group, this.player.fallDamage, null, this.player);
		game.physics.arcade.collide(this.player.sprite, this.platforms.group, null, this.player.platformCollision, this.player);

		// Kill player on contact with explosion
		game.physics.arcade.collide(this.player.sprite, this.bombs.explosions, null, this.player.hurt, this.player);

		// Collect shrooms
		game.physics.arcade.overlap(this.player.sprite, this.shrooms.group, null, this.shrooms.collect, this.shrooms);

		// Collide entities against platforms
		game.physics.arcade.collide(this.platforms.group, this.bombs.group);
		game.physics.arcade.collide(this.platforms.group, this.shrooms.group);
		game.physics.arcade.collide(this.platforms.group, this.player.gibs);

		game.physics.arcade.collide(this.shrooms.group, this.bombs.group);
		game.physics.arcade.collide(this.bombs.group, this.bombs.group);
		game.physics.arcade.collide(this.shrooms.group, this.shrooms.group);

		// Player & Boss
		game.physics.arcade.collide(this.player.sprite, this.boss.sprite, this.boss.playerBounce, this.boss.collisionCheck);

	},

	playerWin : function() {
		game.state.getCurrentState().destroy();
		game.state.start('won');
	},

	playerLose : function() {
		game.state.getCurrentState().destroy();
		game.state.start('lost');
	},
	
	render: function() {

		if (debug == true){

			//this.player.render();

			Phaser.Time.advancedTiming = true;
			game.debug.text("FPS: " + game.time.fps, 850, 30);

			game.debug.text("Diff: " + this.difficulty, 850, 50);
			game.debug.text("spawnTimer: " + this.spawnTimer.paused, 850, 70);
			game.debug.text("Section: " + this.sectionManager.currentSection(), 850, 90);
			game.debug.text("B: " + this.bombs.group.countLiving() + " | S: " + this.shrooms.group.countLiving(), 850, 120);
			
			// Sprite debug info			
			//entities.bombs.forEachAlive(this.renderPhysics, this);
			//entities.shrooms.forEachAlive(this.renderPhysics, this);
			this.platforms.group.forEachAlive(this.renderPhysics, this);
			this.bombs.group.forEachAlive(this.renderPhysics, this);
			this.bombs.explosions.forEachAlive(this.renderPhysics, this);
			//entities.explosions.forEachAlive(this.renderPhysics, this);
	
			//game.debug.renderPhysicsBody(enemies.shroomLord.body);
			if (this.sectionManager.isRunning('boss')) {
				game.debug.body(this.boss.sprite);
				this.boss.render();
				this.player.render();
			}

			if (this.sectionManager.isRunning('mid')) {
				this.player.render();
				game.debug.text("Health: " + this.player.sprite.heart, 850, 150);
			}
			//this.controls.render();
		}

		
	},

	destroy: function(){
		this.sectionManager.resetAll();
		this.spawnTimer.stop();
		this.difficulty = 0;
	},

	renderPhysics: function(entity) {
		game.debug.body(entity);
	}
}