function Mine(pos){
	EnemySolid.call(this, "images/mine.svg", pos, [30, 30], 20, 1, true, 5, 50);
}

Mine.prototype = Object.create(EnemySolid.prototype);

Mine.prototype.update = function(){
	this.moveLeft(this.speed);
	this.checkOutside();
}

Mine.prototype.checkOutside = function(){
	if(this.pos[0] < -20)
		this.outside = true;
}