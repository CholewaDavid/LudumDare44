function DefaultWeapon(pos){
	Weapon.call(this, "images/default_weapon.svg", pos, [30, 15], 6, 5, null, true, true);
}

DefaultWeapon.prototype = Object.create(Weapon.prototype);

DefaultWeapon.prototype.shoot = function(){
	if(!this.canShoot())
		return;
	
	game.shots.push(new Bullet("images/player_bullet.svg", this.getShotPosition(), [3,3], true, 20, game.degreeToRadian(0), this.getDamage()));
	this.shot();
}