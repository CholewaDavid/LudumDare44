//The most basic object in the game

function DrawableObject(sprite_filename, pos){
	this.sprite = new Image();
	this.sprite.src = sprite_filename;
	this.pos = pos.slice();
}

DrawableObject.prototype.draw = function(){
	canvas_context.drawImage(this.sprite, this.pos[0], this.pos[1]);
}

DrawableObject.prototype.moveUp = function(amount){
	this.pos[1] -= amount;
}

DrawableObject.prototype.moveDown = function(amount){
	this.pos[1] += amount;
}

DrawableObject.prototype.moveLeft = function(amount){
	this.pos[0] -= amount;
}

DrawableObject.prototype.moveRight = function(amount){
	this.pos[0] += amount;
}