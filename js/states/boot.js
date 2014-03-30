// Performs pre-load actions
var StateBoot = function(game){};
StateBoot.prototype = {
	preload: function() {
		game.load.image('loadbar1', 'assets/gui/loadbar_1.png');
		game.load.image('loadbar2', 'assets/gui/loadbar_2.png');
		game.load.image('bg', 'assets/gui/bg.png');
	},

	create: function() {
	
	
		this.stage.disableVisibilityChange = true;

		if (this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 416;
            this.scale.minHeight = 260;
            this.scale.maxWidth = 1024;
            this.scale.maxHeight = 640;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize(true);
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            
            //this.scale.minWidth = 416;
            //this.scale.minHeight = 260;
            //this.scale.maxWidth = 1024;
            //this.scale.maxHeight = 640;
            //this.scale.pageAlignHorizontally = true;
            //this.scale.pageAlignVertically = true;
            //this.scale.forceOrientation(true, false);
            //this.scale.hasResized.add(this.gameResized, this);
            //this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            //this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
            this.scale.startFullScreen(true);
       }
	
		game.state.start('loading');
	},
	
	gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device.

    },

    enterIncorrectOrientation: function () {

        BasicGame.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        BasicGame.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }
}