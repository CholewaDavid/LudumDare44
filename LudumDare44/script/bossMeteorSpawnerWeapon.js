function BossMeteorSpawnerWeapon(pos){
	Weapon.call(this, "images/nothing.svg", pos, [30, 15], 60, 30, null, false, false);

	this.finished_shooting = false;
	this.stage = 0;
	this.stage_timer = 0;
	this.stage_timer_max = 60;
}

BossMeteorSpawnerWeapon.prototype = Object.create(Weapon.prototype);

BossMeteorSpawnerWeapon.prototype.shoot = function(){
	if(!this.canShoot())
		return;
	
	if(this.stage == 6 && this.stage_timer >= this.stage_timer_max * 3){
		this.laser_active = false;
		this.finished_shooting = true;
		this.stage = 0;
		this.stage_timer = 0;
	}
	else if(this.stage_timer >= this.stage_timer_max && this.stage != 6){
		this.stage++;
		this.stage_timer = 0;
		if(this.stage == 6)
			this.shot();
	}
	else if(this.stage == 6){
		if((Math.random() * 60) < 1)
				game.enemy_solids.push(new Meteor([Math.floor(Math.random() * (canvas.width + 300) + 200), -200]));
	}
	else
		this.stage_timer++;
}