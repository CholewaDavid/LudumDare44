function Boss(){
	this.pos = [1100, 0];
	this.active = false;
	this.intro = false;
	this.destroyed = false;
	this.intro_time = 0;
	this.intro_time_max = 300;
	this.max_top_pos = -200;
	this.max_bot_pos = 200;
	this.vertical_mov_speed = 2;
	
	this.background = new DrawableObject("images/boss_background.svg", this.pos);
	this.top_cannon = new BossCannon([this.pos[0] - 20, this.pos[1] + 200]);
	this.bottom_cannon = new BossCannon([this.pos[0] - 20, this.pos[1] + 600]);
	this.giant_laser = new BossGiantLaser([this.pos[0] - 10, this.pos[1] + 400]);
	this.meteor_storm_spawner = new BossMeteorSpawner([this.pos[0] - 40, this.pos[1] + 100]);
	this.ship_spawner = new BossShipSpawner([this.pos[0] - 40, this.pos[1] + 700]);
}

Boss.prototype.update = function(){
	if(!this.active){
		if(this.intro){
			if(this.intro_time < this.intro_time_max)
				this.intro_time++;
			else{
				this.active = true;
				this.intro = false;
			}
		}
	}
	else{
		if(this.top_cannon == null && this.bottom_cannon == null && this.giant_laser == null && this.meteor_storm_spawner == null && this.ship_spawner == null){
			this.destroyed = true;
			return;
		}
		if(this.top_cannon != null)
			this.top_cannon.update();
		if(this.bottom_cannon != null)
			this.bottom_cannon.update();
		if(this.giant_laser != null)
			this.giant_laser.update();
		if(this.meteor_storm_spawner != null)
			this.meteor_storm_spawner.update();
		if(this.ship_spawner != null)
			this.ship_spawner.update();
	}
}

Boss.prototype.draw = function(){
	this.background.draw();
	if(this.top_cannon != null)
		this.top_cannon.drawWithWeapons();
	if(this.bottom_cannon != null)
		this.bottom_cannon.drawWithWeapons();
	if(this.giant_laser != null)
		this.giant_laser.drawWithWeapons();
	if(this.meteor_storm_spawner != null)
		this.meteor_storm_spawner.drawWithWeapons();
	if(this.ship_spawner != null)
		this.ship_spawner.drawWithWeapons();
}

Boss.prototype.moveLeft = function(amount){
	this.pos[0] -= amount;
	this.background.moveLeft(amount);
	this.top_cannon.moveLeftWithWeapons(amount);
	this.bottom_cannon.moveLeftWithWeapons(amount);
	this.giant_laser.moveLeftWithWeapons(amount);
	this.meteor_storm_spawner.moveLeftWithWeapons(amount);
	this.ship_spawner.moveLeftWithWeapons(amount);
}

Boss.prototype.moveUp = function(){
	if(this.pos[1] < this.max_top_pos)
		return;
	
	this.pos[1] -= this.vertical_mov_speed;
	
	this.background.moveUp(amount);
	if(this.top_cannon != null)
		this.top_cannon.moveUpWithWeapons(this.vertical_mov_speed);
	if(this.bottom_cannon != null)
		this.bottom_cannon.moveUpWithWeapons(this.vertical_mov_speed);
	if(this.giant_laser != null)
		this.giant_laser.moveUpWithWeapons(this.vertical_mov_speed);
	if(this.meteor_storm_spawner != null)
		this.meteor_storm_spawner.moveUpWithWeapons(this.vertical_mov_speed);
	if(this.ship_spawner != null)
		this.ship_spawner.moveUpWithWeapons(this.vertical_mov_speed);
}

Boss.prototype.moveDown = function(){
	if(this.pos[1] > this.max_bot_pos)
		return;
	
	this.pos[1] += this.vertical_mov_speed;
	
	this.background.moveDown(amount);
	if(this.top_cannon != null)
		this.top_cannon.moveDownWithWeapons(this.vertical_mov_speed);
	if(this.bottom_cannon != null)
		this.bottom_cannon.moveDownWithWeapons(this.vertical_mov_speed);
	if(this.giant_laser != null)
		this.giant_laser.moveDownWithWeapons(this.vertical_mov_speed);
	if(this.meteor_storm_spawner != null)
		this.meteor_storm_spawner.moveDownWithWeapons(this.vertical_mov_speed);
	if(this.ship_spawner != null)
		this.ship_spawner.moveDownWithWeapons(this.vertical_mov_speed);
}

Boss.prototype.doIntro = function(){
	this.intro = true;
}

Boss.prototype.isGiantLaserActive = function(){
	return this.giant_laser != null && this.giant_laser.weapons[0].laser_active;
}

Boss.prototype.colission = function(solid_object){
	if(!this.active)
		return null;
	if(this.top_cannon != null && this.top_cannon.colission(solid_object))
		return this.top_cannon;
	if(this.bottom_cannon != null && this.bottom_cannon.colission(solid_object))
		return this.bottom_cannon;
	if(this.giant_laser != null && this.giant_laser.colission(solid_object))
		return this.giant_laser;
	if(this.meteor_storm_spawner != null && this.meteor_storm_spawner.colission(solid_object))
		return this.meteor_storm_spawner;
	if(this.ship_spawner != null && this.ship_spawner.colission(solid_object))
		return this.ship_spawner;
}

Boss.prototype.checkDestroyed = function(){
	if(this.top_cannon != null && this.top_cannon.health <= 0)
		this.top_cannon = null;
	if(this.bottom_cannon != null && this.bottom_cannon.health <= 0)
		this.bottom_cannon = null;
	if(this.giant_laser != null && this.giant_laser.health <= 0)
		this.giant_laser = null;
	if(this.meteor_storm_spawner != null && this.meteor_storm_spawner.health <= 0)
		this.meteor_storm_spawner = null;
	if(this.ship_spawner != null && this.ship_spawner.health <= 0)
		this.ship_spawner = null;
}