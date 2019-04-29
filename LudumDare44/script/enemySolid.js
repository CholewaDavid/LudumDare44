function EnemySolid(sprite_filename, pos, size, damage, speed, destroyable, score, health){
	SidedSolidObject.call(this, sprite_filename, pos, size, false);
	
	this.speed = speed
	this.deal_damage = damage;
	this.destroyable = destroyable;
	this.points = score;
	this.health = health;
	this.outside = false;
}

EnemySolid.prototype = Object.create(SidedSolidObject.prototype);

EnemySolid.prototype.update = function(){
	
}

EnemySolid.prototype.damage = function(amount){
	this.health -= amount;
}

EnemySolid.prototype.checkOutside = function(){

}