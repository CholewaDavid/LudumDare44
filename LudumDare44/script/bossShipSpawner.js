function BossShipSpawner(pos){
	Ship.call(this, "images/boss_ship_spawner.svg", pos, [70, 100], false, 50);
	
	this.inactive_spawner_sprite = "images/boss_ship_spawner.svg";
	this.active_spawner_sprite = "images/boss_ship_spawner_active.svg";
	
	this.shooting = false;
	this.cooldown = 0;
	this.setCooldown();
}

BossShipSpawner.prototype = Object.create(Ship.prototype);

BossShipSpawner.prototype.update = function(){
	this.weapons[0].update();
	this.cooldown--;
	if(this.cooldown == 0)
		this.shooting = true;
	
	if(this.shooting){
		if(this.weapons[0].stage % 2 == 0)
			this.sprite.src = this.inactive_spawner_sprite;
		else
			this.sprite.src = this.active_spawner_sprite;
		this.weapons[0].shoot();
		if(this.weapons[0].finished_shooting){
			this.shooting = false;
			this.setCooldown();
			this.weapons[0].finished_shooting = false;
		}
	}
}

BossShipSpawner.prototype.createWeapons = function(){
	this.weapons.push(new BossShipSpawnerWeapon(this.pos));
}

BossShipSpawner.prototype.setCooldown = function(){
	this.cooldown = Math.floor(Math.random() * 600 + 900);
}
