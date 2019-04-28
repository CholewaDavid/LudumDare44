function Star(pos){
	DrawableObject.call(this, "images/star.svg", pos);
}

Star.prototype = Object.create(DrawableObject.prototype);

Star.prototype.isOutside = function(){
	return this.pos[0] < -20;
}