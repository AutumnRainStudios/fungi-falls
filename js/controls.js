Controls = function(game) {
	this.game = game;
}

Controls.prototype = {
	
	create: function() {


		if (Modernizr.touch) {

	    GameController.init({
	        left: {
	            type: 'dpad',
	            dpad: {
	                left : {
	                	touchStart: function() {
							game.input.dpad_l = true;
						},
						touchEnd: function() {
							game.input.dpad_l = false;
						}
	                },
	                down : {
	                	touchStart: function() {
							game.input.dpad_d = true;
						},
						touchEnd: function() {
							game.input.dpad_d = false;
						}
	                },
	                right : {
	                	touchStart: function() {
							game.input.dpad_r = true;
						},
						touchEnd: function() {
							game.input.dpad_r = false;
						}
	                }
	            }
	        },
	        right: {
	            // We're not using anything on the right for this demo, but you can add buttons, etc.
	            // See https://github.com/austinhallock/html5-virtual-game-controller/ for examples.
	            type: 'buttons',
	            buttons: [
	            false,
	            false,
	            {
	            		label : 'A',
	            		touchStart: function() {
	            			game.input.button_a = true;
	            		},
	            		touchEnd: function() {
	            			game.input.button_a = false;
	            		}
            	},
            	false
            	]
	            
	        }
	    });

		}

	}
}