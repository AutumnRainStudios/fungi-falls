Controls = function(game, type) {
	this.game = game;
	this.buttons = {
		a : null,
		left: null,
		right: null
	};
	this.type = type;
}

Controls.prototype = {


	preload: function() {
		this.game.load.spritesheet('button_a', 'assets/controls/button_a.png', 150, 150);
		this.game.load.spritesheet('button_left', 'assets/controls/button_left.png', 150, 150);
		this.game.load.spritesheet('button_right', 'assets/controls/button_right.png', 150, 150);
	},

	
	create: function() {

		if (Modernizr.touch && this.type =='buttons') {
			this.buttons.a = this.game.add.button(924, 520, 'button_a', this.buttonPressA, this, 0, 0, 1);
			//this.buttons.a.scale.setTo(2,2);
			this.buttons.a.anchor.setTo(0.5, 0.5);
			this.buttons.a.alpha = 0.3;
			this.buttons.a.fixedToCamera = true;
			
			this.buttons.a.events.onInputDown.add(function(){game.input.button_a = true});
			this.buttons.a.events.onInputUp.add(function(){game.input.button_a = false});
			
			this.buttons.left = this.game.add.button(100, 520, 'button_left', this.buttonPressA, this, 0, 0, 1);
			//this.buttons.left.scale.setTo(2,2);
			this.buttons.left.anchor.setTo(0.5, 0.5);
			this.buttons.left.alpha = 0.3;
			this.buttons.left.fixedToCamera = true;
			
			this.buttons.left.events.onInputDown.add(function(){game.input.dpad_l = true});
			this.buttons.left.events.onInputUp.add(function(){game.input.dpad_l = false});
			
			this.buttons.right = this.game.add.button(255, 520, 'button_right', this.buttonPressA, this, 0, 0, 1);;
			//this.buttons.right.scale.setTo(2,2);
			this.buttons.right.anchor.setTo(0.5, 0.5);
			this.buttons.right.alpha = 0.3;
			this.buttons.right.fixedToCamera = true;
			
			this.buttons.right.events.onInputDown.add(function(){game.input.dpad_r = true});
			this.buttons.right.events.onInputUp.add(function(){game.input.dpad_r = false});
		}
		
		if (Modernizr.touch && this.type =='touch') {
			
			
		}	
	},
	
	update : function() {
		
	},

	buttonPressA : function(button) {
		//console.log(button);
	}
}