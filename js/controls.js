Controls = function(game) {
	this.game = game;
	this.buttons = {
		a : null,
		left: null,
		right: null
	};
}

Controls.prototype = {
	
	create: function() {

		if (Modernizr.touch) {
			this.buttons.a = this.game.add.button(924, 520, 'button_a', this.buttonPressA, this, 0, 0, 1);;
			this.buttons.a.anchor.setTo(0.5, 0.5);
			this.buttons.a.fixedToCamera = true;
			
			this.buttons.a.events.onInputDown.add(function(){game.input.button_a = true});
			this.buttons.a.events.onInputUp.add(function(){game.input.button_a = false});
			
			this.buttons.left = this.game.add.button(100, 520, 'button_left', this.buttonPressA, this, 0, 0, 1);;
			this.buttons.left.anchor.setTo(0.5, 0.5);
			this.buttons.left.fixedToCamera = true;
			
			this.buttons.left.events.onInputDown.add(function(){game.input.dpad_l = true});
			this.buttons.left.events.onInputUp.add(function(){game.input.dpad_l = false});
			
			this.buttons.right = this.game.add.button(200, 520, 'button_right', this.buttonPressA, this, 0, 0, 1);;
			this.buttons.right.anchor.setTo(0.5, 0.5);
			this.buttons.right.fixedToCamera = true;
			
			this.buttons.right.events.onInputDown.add(function(){game.input.dpad_r = true});
			this.buttons.right.events.onInputUp.add(function(){game.input.dpad_r = false});
		}
	},

	buttonPressA : function(button) {
		//console.log(button);
	}
}