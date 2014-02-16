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
    game.load.spritesheet('player', 'assets/p1_spritesheet.png', 72, 100);

}

var platforms;
var boundary;

function create() {

	//  A simple background for our game
    game.add.sprite(0, 0, 'bg');


    game.add.sprite(120, 340, 'shroomStemShort');
    game.add.sprite(840, 290, 'shroomStemMed');
    game.add.sprite(500, 200, 'shroomStemLong');
 
    //  The platforms group contains the ground and the 2 ledges we can jump on
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


    //  Now let's create two ledges
    var ledge = platforms.create(-20, 300, 'shroomPlatformRed');
    ledge.body.immovable = true;
    ledge.body.checkCollision.left = false;
    ledge.body.checkCollision.right = false;

    ledge = platforms.create(400, 160, 'shroomPlatformTan');
    ledge.body.immovable = true;
    ledge.body.checkCollision.left = false;
    ledge.body.checkCollision.right = false;
 
    ledge = platforms.create(700, 250, 'shroomPlatformRed');
    ledge.body.immovable = true;
    ledge.body.checkCollision.left = false;
    ledge.body.checkCollision.right = false;


    // The player and its settings
    player = game.add.sprite(70, game.world.height - 150, 'player');
 
    //  Player physics properties. Give the little guy a slight bounce.
    //player.body.bounce.y = 0.2;
    player.body.gravity.y = 500;
    player.body.drag = 0;
    player.body.checkCollision.up = false;
    //player.body.collideWorldBounds = true;
 
    //  Our two animations, walking left and right.
    player.animations.add('left', [6, 7, 8, 9, 10, 11], 16, true);
    player.animations.add('right', [12, 13, 14, 15, 16, 17, 18], 16, true);

    stars = game.add.group();

    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        createShroom();
    }

    cursors = game.input.keyboard.createCursorKeys();

}

function createShroom(pos) {

	var star = stars.create(Math.random()*1024, -70, 'shroom1');

    //  Let gravity do its thing
    star.body.gravity.y = 600;

    star.body.velocity.x = (Math.random()*500)-250;

    //  This just gives each star a slightly random bounce value
    star.body.bounce.y = 0.7 + Math.random() * 0.2;
}

 
function update() {

	//  Collide the player and the stars with the platforms
    game.physics.collide(player, platforms);
    game.physics.collide(player, boundary);

 	//  Reset the players velocity (movement)
    player.body.velocity.x = 0;
 
    if (cursors.down.isDown){
    	platforms.setAll('body.checkCollision.up', false);
    } else {
    	platforms.setAll('body.checkCollision.up', true);
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -550;

    } else {

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
 
 	}


 	game.physics.collide(stars, platforms);
 	game.physics.collide(stars, boundary);

 	game.physics.overlap(player, stars, collectStar, null, this);

 	function collectStar (player, star) {
 
	    // Removes the star from the screen
	    createShroom(Math.random()*1024);
	    star.kill();

	    
 
	}


}