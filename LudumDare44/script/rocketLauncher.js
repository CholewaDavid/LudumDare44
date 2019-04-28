function RocketLauncher(pos){
	Weapon.call(this, "images/rocket_launcher.svg", pos, [30, 15], 20, 10, null, true, true);
}

RocketLauncher.prototype = Object.create(Weapon.prototype);

RocketLauncher.prototype.shoot = function(){
	if(!this.canShoot())
		return;
	
	game.shots.push(new Rocket("images/player_rocket.svg", this.getShotPosition(), [3,3], true, game.degreeToRadian(0), this.getDamage()));
	this.shot();
}