// game.js
// Core game script

var game = new Phaser.Game(1024, 512, Phaser.AUTO, 'game_canvas', { preload: preload, create: create, update: update, render: render});

function preload() {

    game.load.image('star', 'assets/star.png');
    game.load.image('laser', 'assets/laserPurpleDot.png');
    
    player = new Player(game);
    player.preload();

    level = new Level(game);
    level.preload();

	entities = new Entities(game);
	entities.preload();
	
	debuginput = null;

}

var score = 0;
var health = 100;

function create() {

    level.create();
    player.create();
	entities.create();

    // Add some funky stuff
    emitterBomb = game.add.emitter(0, 0, 200);
    emitterBomb.makeParticles('star');
    emitterBomb.gravity = 200;

    emitterJump = game.add.emitter(0, 0, 200);
    emitterJump.makeParticles('laser');
    emitterJump.gravity = 200;
    
    debuginput = game.add.text(400, 30);
}

function update() {

	//  Collide the player and the stars with the platforms
    game.physics.collide(player.sprite, level.platforms);
    game.physics.collide(player.sprite, level.boundary);
    
 	game.physics.collide(entities.shrooms, level.platforms);
    game.physics.collide(entities.bombs, level.platforms);
 	game.physics.collide(entities.bombs, level.boundary);
 	game.physics.collide(entities.shrooms, level.boundary);
 	game.physics.overlap(player.sprite, entities.shrooms, collectShroom, null, this);
 	game.physics.overlap(player.sprite, entities.bombs, collectBomb, null, this);

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
	
	debuginput.setText("stuff");
}

function render() {
	game.debug.renderInputInfo(30,30);
}

function collectShroom (player, shroom) {
    shroom.kill();
    entities.createEntity();
    score += 10;
}

function collectBomb (player, bomb) {
    bomb.kill();
    bombBurst(bomb);
    entities.createEntity();
    player.frame = 1;
    player.body.velocity.x = (Math.random()*340)-170;
    health = health - 10;
}

function jumpBurst() {
    emitterJump.x = player.sprite.x;
    emitterJump.y = player.sprite.y + 90;
    emitterJump.start(true, 1000, null, 10);
}

function bombBurst(bomb) {
    emitterBomb.x = bomb.x;
    emitterBomb.y = bomb.y;
    emitterBomb.start(true, 2000, null, 20);
}