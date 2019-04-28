function DefaultEnemyWeapon(pos){
	Weapon.call(this, "images/default_weapon.svg", pos, [30, 15], 120, 3, null, false, true);
}

DefaultEnemyWeapon.prototype = Object.create(Weapon.prototype);

DefaultEnemyWeapon.prototype.shoot = function(){
	if(!this.canShoot())
		return;
	
	game.shots.push(new Bullet("images/enemy_bullet.svg", this.getShotPosition(), [5,5], false, 10, game.degreeToRadian(180), this.getDamage()));
	this.shot();
}