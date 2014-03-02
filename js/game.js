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
	
	controls = new Controls(game);
}

var score = 0;
var health = 100;

function create() {
	level.create();
	player.create();
	entities.create();
	controls.create();
}

function update() {

	//  Collide the player and the stars with the platforms
	game.physics.collide(player.sprite, level.platforms);
	game.physics.collide(player.sprite, level.boundary);
	
 	game.physics.collide(entities.shrooms, level.platforms);
	game.physics.collide(entities.bombs, level.platforms);
 	game.physics.collide(entities.bombs, level.boundary);
 	game.physics.collide(entities.shrooms, level.boundary);
 	game.physics.overlap(player.sprite, entities.shrooms, entities.collectShroom, null, this);
 	
 	
	player.update();
	entities.update();

	if (health <= 0) {
		player.sprite.destroy();

		document.getElementById("game-over").style.display='block';
		document.getElementById("score-final").innerHTML=score;
	}

	document.getElementById("score").innerHTML=score;
 	document.getElementById("health").innerHTML=health;
 	document.getElementById("health-bar").style.width= health + "%";
}


function render() {

	
	game.debug.renderText("FPS: " + game.time.fps, 940, 30);

	if (debug == true){

		//game.debug.renderText(entities.shrooms.countLiving(), 900, 30);

	// Sprite debug info
	for (i=0; i<entities.shrooms.total; i++) {
		game.debug.renderSpriteCorners(entities.shrooms.getAt(i));
	}
	/*
	for (i=0; i<entities.bombs.total; i++) {
		game.debug.renderSpriteCorners(entities.bombs.getAt(i));
	}
	*/

	
	entities.bombs.forEachAlive(renderPhysics, this)
	entities.shrooms.forEachAlive(renderPhysics, this)
	
	level.platforms.forEachAlive(renderPhysics, this)

	game.debug.renderSpriteCorners(player.sprite, false, false);
	
	}
	
	//game.debug.renderSpriteCorners(player.buttons.a);
	
	//game.debug.renderLocalTransformInfo(player, 32, 160);
	//game.debug.renderWorldTransformInfo(player, 32, 290);

}

function renderPhysics(entity) {
	game.debug.renderPhysicsBody(entity.body);
}