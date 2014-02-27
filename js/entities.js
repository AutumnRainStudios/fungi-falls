

Entities = function(game) {
	this.game = game;
	this.sprite = null;
	this.bombs = null;
	this.shrooms = null;
	
}

Entities.prototype = {
	
	preload: function() {
	    this.game.load.image('shroom1', 'assets/tallShroom_red.png');
	    this.game.load.image('shroom2', 'assets/tallShroom_brown.png');
	   	this.game.load.image('bomb', 'assets/bomb.png');
	   	this.game.load.image('star', 'assets/star.png');
	},

	create : function() {
	
		this.shrooms = game.add.group();
	    this.bombs = game.add.group();
	    
	   	//  Make it rain
	    for (var i = 0; i < 20; i++)
	    {
	        this.createEntity();
	    }
	    
	     // Add some funky stuff
    	emitterBomb = game.add.emitter(0, 0, 200);
    	emitterBomb.makeParticles('star');
    	emitterBomb.gravity = 200;
	},
	
	update : function() {
		game.physics.overlap(player.sprite, this.bombs, this.collectBomb, null, this);
		
		//this.bombs.iterate('angle', value, returnType, callback, callbackContext)
		
		this.bombs.forEachAlive(this.updateBombRotation, this)
		
		/*
		for (i=0; i<this.bombs.total; i++) {
			var bomb = this.bombs.cursor;
			bomb.angle = bomb.body.x;
			this.bombs.next()
		}
		*/
			
	},
	
	updateBombRotation : function(bomb) {
		bomb.angle = bomb.body.x;
	},
	
	createEntity : function() {
    	var random = Math.random();
    
    	if (random <= 0.8) {
    		this.spawnShroom();
    	} else {
    		this.spawnBomb();
    	} 
    },

	spawnShroom : function() {

    	if (Math.random() <= 0.5) {
    		var shroom = this.shrooms.create(Math.random()*924+100, player.sprite.y-512, 'shroom1');
    	} else {
    		var shroom = this.shrooms.create(Math.random()*924+100, player.sprite.y-512, 'shroom2');
    	}
    
        //  Let gravity do its thing
        shroom.body.gravity.y = 400;
        shroom.body.velocity.x = (Math.random()*500)-250;
        shroom.body.bounce.y = 0.7 + Math.random() * 0.2;
        shroom.body.bounce.x = -0.7 - (Math.random() * 0.2);
        shroom.body.linearDamping = 2;
        shroom.body.collideWorldBounds = true;
    },

	spawnBomb :function() {

    	var bomb = this.bombs.create(Math.random()*924+100, player.sprite.y-512, 'bomb');
    
    	//var angle = Math.random() * 360;
    
        //bomb.body.allowRotation = true;
        //bomb.body.rotation = angle;
        
        bomb.body.setCircle(30,30,30);
        
        bomb.anchor.setTo(0.5,0.5);
        
        //bomb.body.shape = 'circle';
        bomb.body.gravity.y = 600;
        bomb.body.velocity.x = (Math.random()*500)-250;

        bomb.body.velocity.x = (Math.random()*500)-250;

        bomb.body.bounce.x = 0.7 + Math.random() * 0.2;
        bomb.body.bounce.y = 0.7 + Math.random() * 0.2;
        
        
        
        bomb.body.collideWorldBounds = true;

    },
    
	bombBlast :function(bomb) {
    	emitterBomb.x = bomb.x;
    	emitterBomb.y = bomb.y;
    	emitterBomb.start(true, 2000, null, 20);
	},
		
	collectShroom :function (player, shroom) {
	    shroom.kill();
	    entities.createEntity();
	    score += 10;
	},
	
	collectBomb : function(player, bomb) {
		bomb.kill();
	    this.bombBlast(bomb);
	    entities.createEntity();
	    player.frame = 1;
	    player.body.velocity.x = (Math.random()*340)-170;
	    health = health - 10;
	},

}