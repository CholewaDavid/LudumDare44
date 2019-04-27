function Ship(sprite_filename, pos, size, friendly, health){
	SidedSolidObject.call(this, sprite_filename, pos, size, friendly);

	this.weapons = [];
	this.createWeapons();
	
	this.health = health;
	this.outside = false;
}

Ship.prototype = Object.create(SidedSolidObject.prototype);

Ship.prototype.createWeapons = function(){
	
}

Ship.prototype.updateWithWeapons = function(){
	this.update();
	for(var i = 0; i < this.weapons.length; i++)
		this.weapons[i].update();
}

Ship.prototype.drawWithWeapons = function(){
	this.draw();
	for(var i = 0; i < this.weapons.length; i++){
		this.weapons[i].draw();
	}
}

Ship.prototype.moveUpWithWeapons = function(amount){
	this.moveUp(amount);
	for(var i = 0; i < this.weapons.length; i++)
		this.weapons[i].moveUp(amount);
}

Ship.prototype.moveDownWithWeapons = function(amount){
	this.moveDown(amount);
	for(var i = 0; i < this.weapons.length; i++)
		this.weapons[i].moveDown(amount);
}

Ship.prototype.moveLeftWithWeapons = function(amount){
	this.moveLeft(amount);
	for(var i = 0; i < this.weapons.length; i++)
		this.weapons[i].moveLeft(amount);
}

Ship.prototype.moveRightWithWeapons = function(amount){
	this.moveRight(amount);
	for(var i = 0; i < this.weapons.length; i++)
		this.weapons[i].moveRight(amount);
}

Ship.prototype.damage = function(amount){
	this.health -= amount;
}

Ship.prototype.shootAll = function(){
	for(var i = 0; i < this.weapons.length; i++){
		this.weapons[i].shoot();
	}
}