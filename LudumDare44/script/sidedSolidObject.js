//Solid object that is either friendly or hostile

function SidedSolidObject(sprite_filename, pos, size, friendly){
	SolidObject.call(this, sprite_filename, pos, size);
	
	this.friendly = friendly;
}

SidedSolidObject.prototype = Object.create(SolidObject.prototype);