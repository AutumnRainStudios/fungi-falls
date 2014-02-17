// game.js
// Core game script

var game = new Phaser.Game(1024, 512, Phaser.AUTO, 'game_canvas', { preload: preload, create: create, update: update });

 
function preload() {

    game.load.image('star', 'assets/star.png');
    game.load.image('laser', 'assets/laserPurpleDot.png');
    
    player = new Player(game);
    player.preload();

    level = new Level(game);
    level.preload();

}

var platforms;
var boundary;

var cursors;

var shrooms;
var bombs;

var score = 0;
var health = 100;

function create() {



   

    level.create();
    player.create();


    // Add some funky stuff

    emitterBomb = game.add.emitter(0, 0, 200);
    emitterBomb.makeParticles('star');
    emitterBomb.gravity = 200;

    emitterJump = game.add.emitter(0, 0, 200);
    emitterJump.makeParticles('laser');
    emitterJump.gravity = 200;

}

function createEntity() {

	var random = Math.random();

	if (random <= 0.8) {
		spawnShroom();
	} else if (random <= 0.9) {
		spawnBomb();
	} else {
		spawnShroom();
	}

}

function spawnShroom() {

	if (Math.random() <= 0.5) {
		var shroom = level.shrooms.create(Math.random()*924+100, -70, 'shroom1');
	} else {
		var shroom = level.shrooms.create(Math.random()*924+100, -70, 'shroom2');
	}

    //  Let gravity do its thing
    shroom.body.gravity.y = 600;
    shroom.body.velocity.x = (Math.random()*500)-250;
    shroom.body.bounce.y = 0.7 + Math.random() * 0.2;
    shroom.body.bounce.x = 0.7 + Math.random() * 0.2;
}

function spawnBomb() {

	var bomb = level.bombs.create(Math.random()*924+100, -70, 'bomb');

	//var angle = Math.random() * 360;

    //bomb.body.allowRotation = true;
    //bomb.body.rotation = angle;
	//bomb.body.angle = angle;
    //bomb.body.shape = 'circle';
    bomb.body.gravity.y = 600;
    bomb.body.velocity.x = (Math.random()*500)-250;

    bomb.body.velocity.x = (Math.random()*500)-250;

    bomb.body.bounce.x = 0.7 + Math.random() * 0.2;
    bomb.body.bounce.y = 0.7 + Math.random() * 0.2;



}

 
function update() {

    

	//  Collide the player and the stars with the platforms
    game.physics.collide(player.sprite, level.platforms);
    game.physics.collide(player.sprite, level.boundary);

    

 	//
 	game.physics.collide(level.shrooms, level.platforms);
    game.physics.collide(level.bombs, level.platforms);
 	game.physics.collide(level.bombs, level.boundary);
 	game.physics.collide(level.shrooms, level.boundary);
 	game.physics.overlap(player.sprite, level.shrooms, collectShroom, null, this);
 	game.physics.overlap(player.sprite, level.bombs, collectBomb, null, this);


    player.update();


 	function collectShroom (player, shroom) {
	    // Removes the star from the screen
	    shroom.kill();
	    createEntity();
	    score += 10;
	}

 	function collectBomb (player, bomb) {
	    // Removes the star from the screen
	    bomb.kill();
	    bombBurst(bomb);
	    createEntity();
	    player.frame = 1;
        player.body.velocity.x = (Math.random()*340)-170;
	    health = health - 10;
	}

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
    //  Position the emitter where the mouse/touch event was
    emitterJump.x = player.sprite.x;
    emitterJump.y = player.sprite.y + 90;

    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    emitterJump.start(true, 1000, null, 10);
}

function bombBurst(bomb) {
    emitterBomb.x = bomb.x;
    emitterBomb.y = bomb.y;
    emitterBomb.start(true, 2000, null, 20);
}