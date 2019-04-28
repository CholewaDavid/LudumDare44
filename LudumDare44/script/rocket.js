function Rocket(sprite_filename, pos, size, friendly, angle, damage){
	Shot.call(this, sprite_filename, pos, size, friendly, damage);
	
	this.speed = 0.1;
	this.max_speed = 20;
	this.angle = angle;
	this.mov_vector = [0, 0];
}

Rocket.prototype = Object.create(Shot.prototype);

Rocket.prototype.update = function(){
	this.mov_vector = [Math.cos(this.angle) * this.speed, Math.sin(this.angle) * this.speed];
	this.speed *= 1.05;
	if(this.speed > this.max_speed)
		this.speed = this.max_speed;
	this.moveRight(this.mov_vector[0]);
	this.moveDown(this.mov_vector[1]);
}