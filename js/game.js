// game.js
// Core game script

var game = new Phaser.Game(1024, 512, Phaser.AUTO, 'game_canvas', { preload: preload, create: create, update: update});

function preload() {

    
    game.load.image('laser', 'assets/laserPurpleDot.png');
    
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

    emitterJump = game.add.emitter(0, 0, 200);
    emitterJump.makeParticles('laser');
    emitterJump.gravity = 200;
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
 	game.physics.overlap(player.sprite, entities.bombs, entities.collectBomb, null, this);

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


function jumpBurst() {
    emitterJump.x = player.sprite.x;
    emitterJump.y = player.sprite.y + 90;
    emitterJump.start(true, 1000, null, 10);
}