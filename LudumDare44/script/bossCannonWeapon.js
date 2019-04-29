function BossCannonWeapon(pos){
	Weapon.call(this, "images/nothing.svg", pos, [30, 15], 15, 5, null, false, false);
	
	this.angle = 110;
	this.angle_step = 10;
	this.shot_count = 0;
	this.shot_count_max = 13;
}

BossCannonWeapon.prototype = Object.create(Weapon.prototype);

BossCannonWeapon.prototype.shoot = function(){
	if(!this.canShoot())
		return;
	
	if(this.shot_count >= this.shot_count_max)
		this.shot_count = 0;
	
	
	game.shots.push(new Bullet("images/enemy_bullet.svg", this.getShotPosition(), [5,5], false, 10, game.degreeToRadian(this.angle + this.angle_step * this.shot_count), this.getDamage()));
	this.shot();
	
	this.shot_count++;
}