function MovingEnemy(pos){
	Ship.call(this, "images/moving_enemy.svg", pos, [70, 40], false, 15);
	
	this.speed = 1;
	this.speed_vertical = 3;
	this.points = 10;
	this.moving_up = Math.floor(Math.random() * 2) == 0;
}

MovingEnemy.prototype = Object.create(Ship.prototype);

MovingEnemy.prototype.update = function(){
	if(this.moving_up && this.pos[1] - this.speed_vertical <= 0)
		this.moving_up = false;
	else if(!this.moving_up && this.pos[1] + this.size[1] + this.speed_vertical >= canvas.height)
		this.moving_up = true;
	
	this.moveLeftWithWeapons(this.speed);
	if(this.moving_up)
		this.moveUpWithWeapons(this.speed_vertical);
	else
		this.moveDownWithWeapons(this.speed_vertical);
	this.shootAll();
	if(this.pos[0] < -100)
		this.outside = true;
}

MovingEnemy.prototype.createWeapons = function(){
	this.weapons.push(new AimedEnemyWeapon(this.pos));
}