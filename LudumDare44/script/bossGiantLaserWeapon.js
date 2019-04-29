function BossGiantLaserWeapon(pos){
	Weapon.call(this, "images/nothing.svg", pos, [30, 15], 60, 30, null, false, false);
	
	this.laser = new SidedSolidObject("images/nothing.svg", [-400, this.pos[1]], [1400, 100]);
	this.finished_shooting = false;
	this.player_hit = false;
	this.laser_active = false;
	this.stage = 0;
	this.stage_timer = 0;
	this.stage_timer_max = 45;
}

BossGiantLaserWeapon.prototype = Object.create(Weapon.prototype);

BossGiantLaserWeapon.prototype.shoot = function(){
	if(!this.canShoot())
		return;
	
	if(this.stage == 3 && this.stage_timer >= this.stage_timer_max * 4){
		this.laser_active = false;
		this.finished_shooting = true;
		this.player_hit = false;
		this.stage = 0;
		this.stage_timer = 0;
	}
	else if(this.stage_timer >= this.stage_timer_max && this.stage != 3){
		this.stage++;
		this.stage_timer = 0;
		if(this.stage == 3){
			this.shot();
			this.laser_active = true;
		}
	}
	else
		this.stage_timer++;
}

BossGiantLaserWeapon.prototype.draw = function(){
	switch(this.stage){
		case 0:
			break;
		case 1:
			canvas_context.fillStyle = "#FF000033";
			canvas_context.fillRect(this.laser.pos[0], this.laser.pos[1], this.laser.size[0], this.laser.size[1]);
			break;
		case 2:
			canvas_context.fillStyle = "#FF000088";
			canvas_context.fillRect(this.laser.pos[0], this.laser.pos[1], this.laser.size[0], this.laser.size[1]);
			break;
		case 3:
			canvas_context.fillStyle = "#FF0000FF";
			canvas_context.fillRect(this.laser.pos[0], this.laser.pos[1], this.laser.size[0], this.laser.size[1]);
			break;
	}
}