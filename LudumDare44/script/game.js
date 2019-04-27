function Game(){
	this.background = new Background();
	this.player = new Player();
	
	this.BoundriesEnum = Object.freeze({"left": 1, "up": 2, "right": 3, "down": 4, "none": 5});
	
	this.runGame = false;
	this.points = 0;
	this.shots = [];
	this.enemyShips = [];
}

Game.prototype.draw = function(){
	this.background.draw();
	for(var i = 0; i < this.enemyShips.length; i++)
		this.enemyShips[i].drawWithWeapons();
	this.player.drawWithWeapons();
	for(var i = 0; i < this.shots.length; i++)
		this.shots[i].draw();
}

Game.prototype.update = function(){
	this.background.update();
	this.player.updateWithWeapons();
	for(var i = 0; i < this.enemyShips.length; i++)
		this.enemyShips[i].updateWithWeapons();
	for(var i = 0; i < this.shots.length; i++)
		this.shots[i].update();
	
	this.checkShotColissions();
	this.checkDestroyedShips();
	
	this.handleEnemySpawning();
}

Game.prototype.gameLoop = function(){
	if(this.runGame){
		this.update();
	}
	else{
		
	}
	this.draw();
}

Game.prototype.startGame = function(){
	this.runGame = true;
	this.audioLoop = new Audio("Sounds/music.wav");
	this.audioLoop.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
	}, false);
	this.audioLoop.play();
}

Game.prototype.checkColissions = function(solid_object, sided, friendly){
	for(var i = 0; i < this.enemyShips.length; i++){
		if(!sided || (sided && this.enemyShips[i].friendly != friendly)){
			if(this.enemyShips[i].colission(solid_object))
				return this.enemyShips[i];
		}
		if(!sided || (sided && !friendly)){
			if(this.player.colission(solid_object))
				return this.player;
		}
	}
}

Game.prototype.isObjectOutside = function(solid_object, fully_outside){
	if(fully_outside){
		if((solid_object.pos[0] + solid_object.size[0]) < 0)
			return this.BoundriesEnum.left;
		if(solid_object.pos[0] > canvas.width)
			return this.BoundriesEnum.right;
		if((solid_object.pos[1] + solid_object.size[1]) < 0)
			return this.BoundriesEnum.up;
		if(solid_object.pos[1] > canvas.height)
			return this.BoundriesEnum.down;
	}
	else{
		if(solid_object.pos[0] < 0)
			return this.BoundriesEnum.left;
		if((solid_object.pos[0] + solid_object.size[0]) > canvas.width)
			return this.BoundriesEnum.right;
		if(solid_object.pos[1] < 0)
			return this.BoundriesEnum.up;
		if((solid_object.pos[1] + solid_object.size[1]) > canvas.height)
			return this.BoundriesEnum.down;
	}
	return this.BoundriesEnum.none;
}

Game.prototype.degreeToRadian = function(degree){
	return degree * Math.PI / 180;
}

Game.prototype.checkShotColissions = function(){	
	for(var i = 0; i < this.shots.length; i++){
		if(this.isObjectOutside(this.shots[i], true) != this.BoundriesEnum.none){
			this.shots.splice(i, 1);
			continue;
		}
		
		var colided_objects = this.checkColissions(this.shots[i], true, this.shots[i].friendly);
		if(colided_objects != null){
			if(colided_objects instanceof Ship)
				colided_objects.damage(this.shots[i].damage);
			
			this.shots.splice(i--, 1);
			continue;
		}
	}
}

Game.prototype.checkDestroyedShips = function(){
	for(var i = 0; i < this.enemyShips.length; i++){
		if(this.enemyShips[i].outside)
			this.enemyShips.splice(i--, 1);
		else if(this.enemyShips[i].health < 0){
			this.points += this.enemyShips[i].points;
			this.enemyShips.splice(i--, 1);
		}
	}
}

Game.prototype.handleEnemySpawning = function(){
	if(Math.floor(Math.random() * 100) < 1)
		this.enemyShips.push(new BasicEnemyShip([canvas.width + 100, Math.floor(Math.random() * (canvas.height - 100))]));
}