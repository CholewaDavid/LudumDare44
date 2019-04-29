function Scrap(pos){
	DrawableObject.call(this, "images/scrap.svg", pos);
	
	this.angle = Math.random() * 360;
	this.speed = Math.random() * 1;
	this.mov_vector = [Math.cos(this.angle) * this.speed, Math.sin(this.angle) * this.speed];
	this.time_alive = 0;
	this.time_alive_max = Math.random() * 600 + 300;
}

Scrap.prototype = Object.create(DrawableObject.prototype);

Scrap.prototype.update = function(){
	this.moveRight(this.mov_vector[0]);
	this.moveDown(this.mov_vector[1]);
	this.time_alive++;
}