Controls = function(game) {
	this.game = game;

	this.keyboard = {
		z : null,
		enter : null,
		space: null,
		cursors: null
	};

	this.touch = {
		a : null,
		left: null,
		right: null
	};

	this.input = {
		a : false,
		left: false,
		right: false
	};

	this.enabled = false;
}

Controls.prototype = {
	
	create: function() {

		if (!this.game.device.desktop) {
			
			this.touch.a = this.game.add.sprite(924, 520, 'button_a');
			this.touch.a.anchor.setTo(0.5, 0.5);
			this.touch.a.alpha = 0.3;
			this.touch.a.fixedToCamera = true;
			
			//button.events.onInputDown.add(function(){this.controls.input.a = true});
			//button.events.onInputUp.add(function(){this.controls.input.a = false});
			
			this.touch.left = this.game.add.button(100, 520, 'button_left');
			this.touch.left.anchor.setTo(0.5, 0.5);
			this.touch.left.alpha = 0.3;
			this.touch.left.fixedToCamera = true;
			
			//button.events.onInputDown.add(function(){this.controls.input.left = true});
			//button.events.onInputUp.add(function(){this.controls.input.left = false});
			
			this.touch.right = this.game.add.button(255, 520, 'button_right', null, this, 0, 0, 1);;
			this.touch.right.anchor.setTo(0.5, 0.5);
			this.touch.right.alpha = 0.3;
			this.touch.right.fixedToCamera = true;
			
			//button.events.onInputDown.add(function(){this.controls.input.right = true});
			//button.events.onInputUp.add(function(){this.controls.input.right = false});
		
		} else {
			console.log('keyboard');
			this.keyboard.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
			this.keyboard.z = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
			this.keyboard.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			this.keyboard.cursors = this.game.input.keyboard.createCursorKeys();
			//this.keyboard.left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
			//this.keyboard.right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
		}
	},

	update: function() {
		if (this.enabled){
			if (!this.game.device.desktop) {
				
				if ((this.game.input.pointer1.isDown && this.game.input.pointer1.position.x > 874) || (this.game.input.pointer2.isDown && this.game.input.pointer2.position.x > 874)){
					this.touch.a.frame = 1;
					this.input.a = true;
				} else {
					this.touch.a.frame = 0;
					this.input.a = false;
				}
				
				if ((this.game.input.pointer1.isDown && this.game.input.pointer1.position.x > 150 && this.game.input.pointer1.position.x < 300) || (this.game.input.pointer2.isDown && this.game.input.pointer2.position.x > 150 && this.game.input.pointer2.position.x < 300)){
					this.input.right = true;
					this.touch.right.frame = 1;
				} else {
					this.input.right = false;
					this.touch.right.frame = 0;
				}

				if ((this.game.input.pointer1.isDown && this.game.input.pointer1.position.x > 0 && this.game.input.pointer1.position.x < 150) || (this.game.input.pointer2.isDown && this.game.input.pointer2.position.x > 0 && this.game.input.pointer2.position.x < 150)){
					this.input.left = true;
					this.touch.left.frame = 1;
				} else {
					this.input.left = false;
					this.touch.left.frame = 0;
				}
			
			} else {
				if (this.keyboard.cursors.left.isDown) {
					this.input.left = true;
				} else {
					this.input.left = false;
				}
				
				if (this.keyboard.cursors.right.isDown) {
					this.input.right = true;
				} else {
					this.input.right = false;
				}

				if (this.keyboard.enter.isDown || this.keyboard.z.isDown || this.keyboard.space.isDown || this.keyboard.cursors.up.isDown ) {
					this.input.a = true;
				} else {
					this.input.a = false;
				}
			}
		}
	},

	disable: function() {
		this.enabled = false;
	},

	enable: function() {
		this.enabled = true;
	},

	render: function() {
		if (debug == true){
			game.debug.text("pointer1: " + this.game.input.pointer1.position.x, 850, 90);
			game.debug.text("A: " + this.input.a, 850, 30);
			game.debug.text("Left: " + this.input.left, 850, 50);
			game.debug.text("Right: " + this.input.right, 850, 70);
		}		
	},
}