function Game(){
	this.background = new Background();
	this.player = new Player();
	
	this.runGame = false;
}

Game.prototype.draw = function(){
	this.background.draw();
	this.player.draw();
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

Game.prototype.update = function(){
	this.background.update();
	this.player.update();
}

Game.prototype.checkColissions = function(solid_object, sided, friendly){
	return null;
}