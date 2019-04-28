function Button(pos, imageNameA, imageNameB, imageNameC){
	this.spriteInactive = new DrawableObject(imageNameA, pos);
	this.spriteActive = new DrawableObject(imageNameB, pos);
	this.spriteNotEnabled = new DrawableObject(imageNameC, pos);
	this.active = false;
	this.enabled = true;
}

Button.prototype.draw = function(){
	if(!this.enabled){
		this.spriteNotEnabled.draw();
		return;
	}
	if(this.active)
		this.spriteActive.draw();
	else
		this.spriteInactive.draw();
}