var loadAssets = function() {
	// GUI
	game.load.image('logo', 'assets/gui/logo.png');

	// Controls
	game.load.spritesheet('button_a', 'assets/controls/button_a.png', 150, 150);
	game.load.spritesheet('button_left', 'assets/controls/button_left.png', 150, 150);
	game.load.spritesheet('button_right', 'assets/controls/button_right.png', 150, 150);
	game.load.spritesheet('startOptions', 'assets/gui/startOptions_spritesheet.png', 500, 80);

	// Enemies
	game.load.spritesheet('shroomLord', 'assets/sprites/shroomLord_spritesheet.png', 360, 320);

	// Entities
	game.load.image('shroom1', 'assets/sprites/entity_shroom_red.png');
	game.load.image('shroom2', 'assets/sprites/entity_shroom_tan.png');
   	game.load.spritesheet('bomb', 'assets/sprites/entity_bomb_spritesheet.png', 60, 60);
   	game.load.spritesheet('explosion', 'assets/sprites/explosion_spritesheet.png', 200, 200);

   	// Level
   	game.load.image('bg_dawn', 'assets/bg/bg_dawn.png');
	game.load.image('bg_night', 'assets/bg/bg_night.png');
	game.load.image('bg_inside', 'assets/bg/bg_inside.png');
	game.load.image('bg_outside', 'assets/bg/bg_outside.png');
	game.load.image('ground', 'assets/sprites/ground.png');
	game.load.image('shroomPlatformRed', 'assets/sprites/platform_red.png');
	game.load.image('shroomPlatformTan', 'assets/sprites/platform_tan.png');
	game.load.image('shroomPlatformRedSmall', 'assets/sprites/platform_red_small.png');
	game.load.image('shroomPlatformTanSmall', 'assets/sprites/platform_tan_small.png');
	game.load.image('hitBox', 'assets/sprites/transTest.png');
	game.load.image('win', 'assets/gui/won.png');
	game.load.image('lose', 'assets/gui/died.png');
	game.load.spritesheet('bed', 'assets/sprites/bed_spritesheet.png', 190, 130);

	// Player
	game.load.spritesheet('player', 'assets/sprites/player_spritesheet.png', 70, 100);
	game.load.image('gib_head', 'assets/sprites/player_gibs/player_gib_head.png');
	game.load.image('gib_body', 'assets/sprites/player_gibs/player_gib_body.png');
	game.load.image('gib_hat', 'assets/sprites/player_gibs/player_gib_hat.png');
	game.load.image('gib_limb', 'assets/sprites/player_gibs/player_gib_limb.png');
}