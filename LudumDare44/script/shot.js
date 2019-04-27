function Shot(sprite_filename, pos, size, friendly){
	SidedSolidObject.call(this, sprite_filename, pos, size, friendly);
}

Shot.prototype = Object.create(SidedSolidObject.prototype);