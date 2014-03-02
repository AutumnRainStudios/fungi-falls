Controls = function(game) {
	this.game = game;
}

Controls.prototype = {
	
	create: function() {



		//game.input.onDown.add(this.doSomething, this);
		
		


		if (Modernizr.touch && debugMobile == true) {

			GameController.init({
				touchRadius: false,
				forcePerformanceFriendly : true,
				left: {
					type: 'dpad',
					dpad: {
						//up : false,
						left : {
							opacity: 1,
							touchStart: function() {
								game.input.dpad_l = true;
							},
							touchEnd: function() {
								game.input.dpad_l = false;
							}
						},
						down : {
							opacity: 1,
							touchStart: function() {
								game.input.dpad_d = true;
							},
							touchEnd: function() {
								game.input.dpad_d = false;
							}
						},
						right : {
							opacity: 1,
							touchStart: function() {
								game.input.dpad_r = true;
							},
							touchEnd: function() {
								game.input.dpad_r = false;
							}
						}
					}
				},
				//right: false
				right: {
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