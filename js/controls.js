Controls = function(game) {
	this.game = game;
}

Controls.prototype = {
	
	create: function() {
		if (Modernizr.touch && debugMobile == true) {
			
			
			
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
			});
		}
	},
	
	update : function() {
		
		
		//game.input.dpad_l = true;
	},
	
	doSomething : function(pointer) {
		if (pointer.x > 0 && pointer.x < 150) {
			game.input.dpad_l = true;
		} else {
			game.input.dpad_l = false;
		}
		
		if (pointer.x > 150 && pointer.x < 300) {
			game.input.dpad_r = true;
		} else {
			game.input.dpad_r = false;
		}
		
		if (pointer.x > 874 && pointer.x < 1024) {
			game.input.button_a = true;
		} else {
			game.input.button_a = false;
		}
		
	}
	
	
}