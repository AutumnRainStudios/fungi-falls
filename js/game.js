// game.js
// Core game script

var game = new Phaser.Game(1024, 640, Phaser.CANVAS, 'game_canvas', { preload: preload, create: create, update: update, render: render});

function preload() {

	player = new Player(game);
	player.preload();

	level = new Level(game);
	level.preload();

	entities = new Entities(game);
	entities.preload();
	
	controls = new Controls(game, 'buttons');
	controls.preload();
}

var score = 0;
var health = 100;
var temp = 0;

function create() {
	level.create();
	player.create();
	entities.create();
	controls.create();
}

function update() {

	controls.update();

	//  Collide the player and the stars with the platforms
	//game.physics.overlap(player.sprite, level.platforms, player.platformStand, null, this);
	
	game.physics.overlap(player.sprite, level.boundary, player.fallDamage)
	
	game.physics.collide(player.sprite, level.platforms, null, level.platformCollision);

	
	game.physics.collide(player.sprite, level.boundary);
	
 	//game.physics.collide(entities.shrooms, level.platforms.above);
 	game.physics.collide(entities.shrooms, level.platforms);
 	
	game.physics.collide(entities.bombs, level.platforms);
	//game.physics.collide(entities.bombs, level.platforms.below);
	
 	game.physics.collide(entities.bombs, level.boundary);
 	game.physics.collide(entities.shrooms, level.boundary);
 	
 	//game.physics.collide(entities.bombs, entities.shrooms);


	game.physics.collide(player.gibs, level.platforms);

 	
 	game.physics.overlap(player.sprite, entities.shrooms, entities.collectShroom, null, this);
 	
 	game.physics.overlap(level.entityCollector, level.platforms, level.dropPlatform, null, this);
 	
 	game.physics.overlap(level.entityCollector, entities.shrooms, entities.recycleEntity, null, this);
 	game.physics.overlap(level.entityCollector, entities.bombs, entities.recycleEntity, null, this);
 	
 	
	player.update();
	entities.update();
	
	level.update();

	//document.getElementById("score").innerHTML=score;
 	//document.getElementById("health").innerHTML=health;
 	//document.getElementById("health-bar").style.width= health + "%";
}


function render() {

	
	game.debug.renderText("FPS: " + game.time.fps, 940, 30);

	if (debug == true){

		//game.debug.renderText(entities.shrooms.countLiving(), 900, 30);

		// Sprite debug info
		entities.bombs.forEachAlive(renderPhysics, this)
		entities.shrooms.forEachAlive(renderPhysics, this)
		level.platforms.forEachAlive(renderPhysics, this)

		game.debug.renderSpriteCorners(player.sprite, false, false);
		game.debug.renderBodyInfo(player.sprite, 32, 32);
	
	}
	
	//game.debug.renderSpriteCorners(player.buttons.a);
}

function renderPhysics(entity) {
	game.debug.renderPhysicsBody(entity.body);
}