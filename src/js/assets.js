var loadAssets = function() {

	game.load.image('hitBox', 'assets/sprites/transTest.png');

	// GUI
	game.load.image('logo', 'assets/gui/logo.png');
	game.load.image('won', 'assets/gui/won.png');
	game.load.image('died', 'assets/gui/died.png');
	game.load.spritesheet('startOptions', 'assets/gui/startOptions_spritesheet.png', 500, 80);
	game.load.spritesheet('retryOptions', 'assets/gui/retryOptions_spritesheet.png', 780, 80);
	game.load.spritesheet('return', 'assets/gui/return_spritesheet.png', 620, 80);
	game.load.spritesheet('heart', 'assets/gui/heart_spritesheet.png', 40, 40);

	// Controls
	game.load.spritesheet('button_a', 'assets/controls/button_a.png', 150, 150);
	game.load.spritesheet('button_left', 'assets/controls/button_left.png', 150, 150);
	game.load.spritesheet('button_right', 'assets/controls/button_right.png', 150, 150);

	// Enemies
	game.load.spritesheet('shroomLord', 'assets/sprites/shroomLord_spritesheet.png', 360, 320);

	// Entities
	game.load.image('shroom1', 'assets/sprites/entity_shroom_red.png');
	game.load.image('shroom2', 'assets/sprites/entity_shroom_tan.png');
   	game.load.spritesheet('bomb', 'assets/sprites/entity_bomb_spritesheet.png', 60, 60);
   	game.load.spritesheet('explosion', 'assets/sprites/explosion_spritesheet.png', 200, 200);

   	// Background
   	game.load.image('bg_dawn', 'assets/bg/bg_dawn.png');
	game.load.image('bg_night', 'assets/bg/bg_night.png');
	game.load.image('bg_inside', 'assets/bg/bg_inside.png');
	game.load.image('bg_outside', 'assets/bg/bg_outside.png');
	game.load.spritesheet('bed', 'assets/sprites/bed_spritesheet.png', 190, 130);
	game.load.spritesheet('sign', 'assets/sprites/sign.png', 150, 100);

	// Platforms
	game.load.image('ground', 'assets/sprites/ground.png');
	game.load.image('shroomPlatformRed', 'assets/sprites/platform_red.png');
	game.load.image('shroomPlatformTan', 'assets/sprites/platform_tan.png');
	game.load.image('shroomPlatformRedSmall', 'assets/sprites/platform_red_small.png');
	game.load.image('shroomPlatformTanSmall', 'assets/sprites/platform_tan_small.png');

	// Player
	game.load.spritesheet('player', 'assets/sprites/player_spritesheet.png', 70, 100);
	game.load.image('gib_head', 'assets/sprites/player_gibs/player_gib_head.png');
	game.load.image('gib_body', 'assets/sprites/player_gibs/player_gib_body.png');
	game.load.image('gib_hat', 'assets/sprites/player_gibs/player_gib_hat.png');
	game.load.image('gib_limb', 'assets/sprites/player_gibs/player_gib_limb.png');
	
	// Player
	game.load.audio('music', ['assets/audio/twilight_juggle.mp3', 'assets/audio/twilight_juggle.ogg']);
	game.load.audio('sfx_explosion', ['assets/audio/explosion.mp3', 'assets/audio/explosion.ogg']);
	game.load.audio('sfx_jump', ['assets/audio/jump.mp3', 'assets/audio/jump.ogg']);
}