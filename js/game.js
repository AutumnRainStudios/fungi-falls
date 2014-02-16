// game.js
// Core game script

var game = new Phaser.Game(1024, 512, Phaser.AUTO, 'game_canvas', { preload: preload, create: create, update: update });

 
function preload() {

    game.load.image('bg', 'assets/bg_shroom.png');
    game.load.image('ground', 'assets/shroomBrownAltMid.png');
    game.load.image('shroomPlatformRed', 'assets/shroomPlatformRed.png');
    game.load.image('shroomPlatformTan', 'assets/shroomPlatformTan.png');
    game.load.image('shroomStemShort', 'assets/stemShort.png');
    game.load.image('shroomStemMed', 'assets/stemMed.png');
    game.load.image('shroomStemLong', 'assets/stemLong.png');
    game.load.image('hitBox', 'assets/transTest.png');
    game.load.image('shroom1', 'assets/tallShroom_red.png');
    game.load.image('shroom2', 'assets/tallShroom_brown.png');
    game.load.image('bomb', 'assets/bomb.png');
    game.load.spritesheet('player', 'assets/p1_spritesheet.png', 72, 100);

}

var player;
var platforms;
var boundary;

var cursors;

var shrooms;
var bombs;
var score = 0;
var health = 100;

function create() {

	// Hide the game over box



	//  Background elements
    game.add.sprite(0, 0, 'bg');
    game.add.sprite(120, 340, 'shroomStemShort');
    game.add.sprite(840, 290, 'shroomStemMed');
    game.add.sprite(500, 200, 'shroomStemLong');
 
    //  Groups for platforms
    platforms = game.add.group();
    boundary = game.add.group();
 
    // Here we create the ground.
    var ground = boundary.create(0, game.world.height - 35, 'ground');
    ground.scale.setTo(15, 1);
    ground.body.immovable = true;
 
    // Create horizontal boundaries
	var horizontalBoundary = boundary.create(-10, -512, 'hitBox');
	horizontalBoundary.scale.setTo(1, 51);
	horizontalBoundary.body.immovable = true;

	horizontalBoundary = boundary.create(1014, -512, 'hitBox');
	horizontalBoundary.scale.setTo(1, 51);
	horizontalBoundary.body.immovable = true;


    //  Now let's create three ledges
    var ledge = platforms.create(-20, 300, 'shroomPlatformRed');
    ledge.body.immovable = true;
    ledge.body.checkCollision.right = false;

    ledge = platforms.create(400, 160, 'shroomPlatformTan');
    ledge.body.immovable = true;
    ledge.body.checkCollision.left = false;
    ledge.body.checkCollision.right = false;
 
    ledge = platforms.create(700, 250, 'shroomPlatformRed');
    ledge.body.immovable = true;
    ledge.body.checkCollision.left = false;



    // The player and its settings
    player = game.add.sprite(70, game.world.height - 150, 'player');
 
    //  Player physics properties. Give the little guy a slight bounce.
    player.body.gravity.y = 500;
    player.body.drag = 0;
    player.body.checkCollision.up = false;
    //player.body.linearDamping = 500;
    //player.body.collideWorldBounds = true;
 
    //  Our two animations, walking left and right.
    player.animations.add('left', [6, 7, 8, 9, 10, 11], 16, true);
    player.animations.add('right', [12, 13, 14, 15, 16, 17, 18], 16, true);

    shrooms = game.add.group();
    bombs = game.add.group();

    //  Make it rain
    for (var i = 0; i < 20; i++)
    {
        createEntity();
    }

    // Enable cursors
    cursors = game.input.keyboard.createCursorKeys();

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
		var shroom = shrooms.create(Math.random()*1024, -70, 'shroom1');
	} else {
		var shroom = shrooms.create(Math.random()*1024, -70, 'shroom2');
	}

    //  Let gravity do its thing
    shroom.body.gravity.y = 600;
    shroom.body.velocity.x = (Math.random()*500)-250;
    shroom.body.bounce.y = 0.7 + Math.random() * 0.2;
}

function spawnBomb() {

	var bomb = bombs.create(Math.random()*1024, -70, 'bomb');

	//var angle = Math.random() * 360;

    //bomb.body.allowRotation = true;
    //bomb.body.rotation = angle;
	//bomb.body.angle = angle;
    //bomb.body.shape = 'circle';
    bomb.body.gravity.y = 600;
    bomb.body.velocity.x = (Math.random()*500)-250;
    bomb.body.bounce.y = 0.7 + Math.random() * 0.2;
}

 
function update() {

	//  Collide the player and the stars with the platforms
    game.physics.collide(player, platforms);
    game.physics.collide(player, boundary);

 	//  Reset the players velocity (movement)
    player.body.velocity.x = 0;
 

 	// Player Controls

 	// Allow player to fall through platforms if holding down
    if (cursors.down.isDown){
    	platforms.setAll('body.checkCollision.up', false);
    } else {
    	platforms.setAll('body.checkCollision.up', true);
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -550;
    }

    // Left & Right Movement
    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -350;
 
 		if (player.body.touching.down) {
 			player.animations.play('left');
 		} else {
 			player.frame = 2;
 		}

    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 350;

        if (player.body.touching.down) {
 			player.animations.play('right');
 		} else {
 			player.frame = 3;
 		}

    } else {
        //  Stand still
        player.animations.stop();
        player.frame = 0;
    }

 	//
 	game.physics.collide(shrooms, platforms);
 	game.physics.collide(bombs, boundary);
 	game.physics.collide(shrooms, boundary);
 	game.physics.overlap(player, shrooms, collectShroom, null, this);
 	game.physics.overlap(player, bombs, collectBomb, null, this);

 	function collectShroom (player, shroom) {
	    // Removes the star from the screen
	    shroom.kill();
	    createEntity();
	    score += 10;
	}

 	function collectBomb (player, bomb) {
	    // Removes the star from the screen
	    bomb.kill();
	    createEntity();
	    player.frame = 1;
	    health = health - 10;
	}

	if (health <= 0) {
		player.kill();

		document.getElementById("game-over").style.display='block';
		document.getElementById("score-final").innerHTML=score;
		
	}

	document.getElementById("score").innerHTML=score;
	document.getElementById("health").innerHTML=health;
	document.getElementById("health-bar").style.width= health + "%";

}