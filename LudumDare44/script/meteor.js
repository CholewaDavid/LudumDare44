function Meteor(pos){
	EnemySolid.call(this, "images/meteor.svg", pos, [100, 100], 5, Math.random() * 5 + 2, true, 2, 5);
}

Meteor.prototype = Object.create(EnemySolid.prototype);

Meteor.prototype.update = function(){
	this.moveLeft(this.speed);
	this.moveDown(this.speed);
	this.checkOutside();
}

Meteor.prototype.checkOutside = function(){
	if(this.pos[0] < -200 || this.pos[1] > canvas.height + 200)
		this.outside = true;
}