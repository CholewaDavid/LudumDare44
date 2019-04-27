function Bullet(sprite_filename, pos, size, friendly, speed, angle, damage){
	Shot.call(this, sprite_filename, pos, size, friendly, damage);
	
	this.mov_vector = [Math.cos(angle) * speed, Math.sin(angle) * speed];
}

Bullet.prototype = Object.create(Shot.prototype);

Bullet.prototype.update = function(){
	this.moveRight(this.mov_vector[0]);
	this.moveDown(this.mov_vector[1]);
}