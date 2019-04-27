function BasicEnemyShip(pos){
	Ship.call(this, "images/basic_enemy.svg", pos, [70, 40], false, 15);
	
	this.speed = 2;
	this.points = 10;
}

BasicEnemyShip.prototype = Object.create(Ship.prototype);

BasicEnemyShip.prototype.update = function(){
	this.moveLeftWithWeapons(this.speed);
	this.shootAll();
	if(this.pos[0] < -100)
		this.outside = true;
}

BasicEnemyShip.prototype.createWeapons = function(){
	this.weapons.push(new DefaultEnemyWeapon(this.pos));
}