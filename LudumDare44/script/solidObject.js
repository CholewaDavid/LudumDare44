//Drawable object with hitbox calculations

function SolidObject(sprite_filename, pos, size){
	DrawableObject.call(this, sprite_filename, pos);
	
	this.size = size.slice();
}

SolidObject.prototype = Object.create(DrawableObject.prototype);

SolidObject.prototype.colission = function(anotherSolidObject){
	return !((this.pos[0] > (anotherSolidObject.pos[0] + anotherSolidObject.size[0])
		|| (this.pos[0] + this.size[0]) < anotherSolidObject.pos[0])
		|| (this.pos[1] > (anotherSolidObject.pos[1] + anotherSolidObject.size[1])
		|| (this.pos[1] + this.size[1]) < anotherSolidObject.pos[1]));
}