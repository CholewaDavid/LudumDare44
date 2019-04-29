function BossGiantLaser(pos){
	Ship.call(this, "images/boss_giant_laser.svg", pos, [70, 100], false, 50);
	
	this.shooting = false;
	this.cooldown = 0;
	this.setCooldown();
}

BossGiantLaser.prototype = Object.create(Ship.prototype);

BossGiantLaser.prototype.update = function(){
	this.weapons[0].update();
	this.cooldown--;
	if(this.cooldown == 0)
		this.shooting = true;
	
	if(this.shooting){
		this.weapons[0].shoot();
		if(this.weapons[0].finished_shooting){
			this.shooting = false;
			this.setCooldown();
			this.weapons[0].finished_shooting = false;
		}
	}
}

BossGiantLaser.prototype.createWeapons = function(){
	this.weapons.push(new BossGiantLaserWeapon(this.pos));
}

BossGiantLaser.prototype.setCooldown = function(){
	this.cooldown = Math.floor(Math.random() * 450 + 600);
}
