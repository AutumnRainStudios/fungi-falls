var loadAssets = function() {
	// GUI
	this.game.load.spritesheet('button_a', 'assets/controls/button_a.png', 150, 150);
	this.game.load.spritesheet('button_left', 'assets/controls/button_left.png', 150, 150);
	this.game.load.spritesheet('button_right', 'assets/controls/button_right.png', 150, 150);
	this.game.load.spritesheet('startOptions', 'assets/gui/startOptions_spritesheet.png', 500, 80);

	// Enemies
	this.game.load.spritesheet('shroomLord', 'assets/sprites/shroomLord_spritesheet.png', 360, 320);

	// Entities
	this.game.load.image('shroom1', 'assets/sprites/entity_shroom_red.png');
	this.game.load.image('shroom2', 'assets/sprites/entity_shroom_tan.png');
   	this.game.load.spritesheet('bomb', 'assets/sprites/entity_bomb_spritesheet.png', 60, 60);
   	this.game.load.spritesheet('explosion', 'assets/sprites/explosion_spritesheet.png', 200, 200);

   	// Level
   	this.game.load.image('bg_dawn', 'assets/bg/bg_dawn.png');
	this.game.load.image('bg_night', 'assets/bg/bg_night.png');
	this.game.load.image('bg_inside', 'assets/bg/bg_inside.png');
	this.game.load.image('bg_outside', 'assets/bg/bg_outside.png');
	this.game.load.image('ground', 'assets/sprites/ground.png');
	this.game.load.image('shroomPlatformRed', 'assets/sprites/platform_red.png');
	this.game.load.image('shroomPlatformTan', 'assets/sprites/platform_tan.png');
	this.game.load.image('shroomPlatformRedSmall', 'assets/sprites/platform_red_small.png');
	this.game.load.image('shroomPlatformTanSmall', 'assets/sprites/platform_tan_small.png');
	this.game.load.image('hitBox', 'assets/sprites/transTest.png');
	this.game.load.image('win', 'assets/gui/won.png');
	this.game.load.image('lose', 'assets/gui/died.png');
	this.game.load.spritesheet('bed', 'assets/sprites/bed_spritesheet.png', 190, 130);

	// Player
	this.game.load.spritesheet('player', 'assets/sprites/player_spritesheet.png', 70, 100);
	this.game.load.image('gib_head', 'assets/sprites/player_gibs/player_gib_head.png');
	this.game.load.image('gib_body', 'assets/sprites/player_gibs/player_gib_body.png');
	this.game.load.image('gib_hat', 'assets/sprites/player_gibs/player_gib_hat.png');
	this.game.load.image('gib_limb', 'assets/sprites/player_gibs/player_gib_limb.png');
}