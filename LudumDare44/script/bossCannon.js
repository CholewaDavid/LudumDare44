function BossCannon(pos){
	Ship.call(this, "images/boss_cannon.svg", pos, [70, 100], false, 50);
	
	this.shooting = false;
	this.cooldown = 0;
	this.setCooldown();
}

BossCannon.prototype = Object.create(Ship.prototype);

BossCannon.prototype.update = function(){
	this.weapons[0].update();
	this.cooldown--;
	if(this.cooldown <= 0)
		this.shooting = true;
	
	if(this.shooting){
		this.weapons[0].shoot();
		if(this.weapons[0].shot_count >= this.weapons[0].shot_count_max){
			this.shooting = false;
			this.setCooldown();
		}
	}
}

BossCannon.prototype.createWeapons = function(){
	this.weapons.push(new BossCannonWeapon(this.pos));
}

BossCannon.prototype.setCooldown = function(){
	this.cooldown = Math.floor(Math.random() * 450 + 300);
}
