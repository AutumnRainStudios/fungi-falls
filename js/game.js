// game.js
// Core game script

var game = new Phaser.Game(1024, 512, Phaser.CANVAS, 'game_canvas', { preload: preload, create: create, update: update, render: render});

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
		player.sprite.kill();

		document.getElementById("game-over").style.display='block';
		document.getElementById("score-final").innerHTML=score;
	}

	document.getElementById("score").innerHTML=score;
	document.getElementById("health").innerHTML=health;
	document.getElementById("health-bar").style.width= health + "%";
}


function render() {

    // Sprite debug info
	for (i=0; i<entities.shrooms.total; i++) {
		game.debug.renderSpriteCorners(entities.shrooms.getAt(i));
	}
	/*
	for (i=0; i<entities.bombs.total; i++) {
		game.debug.renderSpriteCorners(entities.bombs.getAt(i));
	}
	*/

	entities.bombs.forEachAlive(renderBombCorners, this)


    game.debug.renderSpriteCorners(player.sprite, false, false);
    game.debug.renderSpriteInfo(player.sprite, 32, 32);
    //game.debug.renderLocalTransformInfo(player, 32, 160);
    //game.debug.renderWorldTransformInfo(player, 32, 290);

}

function renderBombCorners(bomb) {
	game.debug.renderPhysicsBody(bomb.body);
}
