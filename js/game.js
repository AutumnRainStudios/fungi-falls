// game.js
// Core game script

var game = new Phaser.Game(1024, 512, Phaser.AUTO, 'game_canvas', { preload: preload, create: create, update: update });

 
function preload() {

    game.load.image('bg', 'assets/bg_shroom.png');
    game.load.image('platform1', 'assets/shroomBrownAltMid.png');
    game.load.image('fungi1', 'assets/tallShroom_red.png');
    game.load.spritesheet('player', 'assets/p1_spritesheet.png', 72, 100);

}

var platforms;
function create() {

	//  A simple background for our game
    game.add.sprite(0, 0, 'bg');
 
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();
 
    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 35, 'platform1');
    ground.scale.setTo(15, 1);
    ground.body.immovable = true;
 
    //  Now let's create two ledges
    var ledge = platforms.create(0, 300, 'platform1');
    ledge.scale.setTo(4, 1);
    ledge.body.immovable = true;
 
    ledge = platforms.create(744, 300, 'platform1');
    ledge.scale.setTo(4, 1);
    ledge.body.immovable = true;


    // The player and its settings
    player = game.add.sprite(70, game.world.height - 150, 'player');
 
    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true;
 
    //  Our two animations, walking left and right.
    player.animations.add('left', [6, 7, 8, 9, 10, 11], 16, true);
    player.animations.add('right', [12, 13, 14, 15, 16, 17, 18], 16, true);

    cursors = game.input.keyboard.createCursorKeys();

}
 
function update() {

	//  Collide the player and the stars with the platforms
    game.physics.collide(player, platforms);

 	//  Reset the players velocity (movement)
    player.body.velocity.x = 0;
 
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
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

	    }
	    else
	    {
	        //  Stand still
	        player.animations.stop();
	        player.frame = 0;
	    }
 
 	}


}