function Shot(sprite_filename, pos, size, friendly, damage){
	SidedSolidObject.call(this, sprite_filename, pos, size, friendly);
	
	this.damage = damage;
}

Shot.prototype = Object.create(SidedSolidObject.prototype);

Shot.prototype.update = function(){
	
}