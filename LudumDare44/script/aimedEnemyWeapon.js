function AimedEnemyWeapon(pos){
	Weapon.call(this, "images/aimed_weapon.svg", pos, [30, 15], 40, 5, null, false, true);
}

AimedEnemyWeapon.prototype = Object.create(Weapon.prototype);

AimedEnemyWeapon.prototype.shoot = function(){
	if(!this.canShoot())
		return;
	
	game.shots.push(new Bullet("images/enemy_bullet.svg", this.getShotPosition(), [5,5], false, 10, game.degreeToRadian(Math.random() * 90 + 135), this.getDamage()));
	this.shot();
}