function Shotgun(pos){
	Weapon.call(this, "images/shotgun.svg", pos, [30, 15], 30, 2, null, true, true);
	
	this.shots = 10;
}

Shotgun.prototype = Object.create(Weapon.prototype);

Shotgun.prototype.shoot = function(){
	if(!this.canShoot())
		return;
	
	for(var i = 0; i < this.shots; i++){
		game.shots.push(new Bullet("images/player_bullet.svg", this.getShotPosition(), [3,3], true, 20, game.degreeToRadian(Math.random() * 140 - 70), this.getDamage()));
	}
	this.shot();
}