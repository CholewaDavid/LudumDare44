function Player(){
	Ship.call(this, "images/player.svg", [30, 10], [70, 40], true, 100);
	
	this.MovementEnum = Object.freeze({"left": 1, "up": 2, "right": 3, "down": 4});
	
	this.movement_directions = [false, false, false, false];
	this.movement_speeds = [0, 0];
	this.max_speed = 10;
	this.acceleration = 2;
	this.inertia = 0.5;
	this.movementEnabled = false;
	this.shotButtonHeld = false;
	
	this.damage_boosts = 0;
}

Player.prototype = Object.create(Ship.prototype);

Player.prototype.update = function(){
	this.move();
	if(this.shotButtonHeld)
		this.shoot();
}

Player.prototype.shoot = function(){
	for(var i = 0; i < this.weapons.length; i++){
		if(this.weapons[i].automatic)
			this.weapons[i].shoot();
	}
}

Player.prototype.move = function(){
	//Left
	if(this.movement_directions[0]){
		this.movement_speeds[0] -= this.acceleration;
		if(this.movement_speeds[0] < -this.max_speed)
			this.movement_speeds[0] = -this.max_speed;
	}
	
	//Up
	if(this.movement_directions[1]){
		this.movement_speeds[1] -= this.acceleration;
		if(this.movement_speeds[1] < -this.max_speed)
			this.movement_speeds[1] = -this.max_speed;
	}
	
	//Right
	if(this.movement_directions[2]){
		this.movement_speeds[0] += this.acceleration;
		if(this.movement_speeds[0] > this.max_speed)
			this.movement_speeds[0] = this.max_speed;
	}
	
	//Down
	if(this.movement_directions[3]){
		this.movement_speeds[1] += this.acceleration;
		if(this.movement_speeds[1] > this.max_speed)
			this.movement_speeds[1] = this.max_speed;
	}
	
	if(!this.movement_directions[0] && !this.movement_directions[2]){
		if(this.movement_speeds[0] < 0){
			if(this.movement_speeds[0] > -this.inertia)
				this.movement_speeds[0] = 0;
			else
				this.movement_speeds[0] += this.inertia;
		}
		else if(this.movement_speeds[0] > 0){
			if(this.movement_speeds[0] < this.inertia)
				this.movement_speeds[0] = 0;
			else
				this.movement_speeds[0] -= this.inertia;
		}
	}
	
	if(!this.movement_directions[1] && !this.movement_directions[3]){
		if(this.movement_speeds[1] < 0){
			if(this.movement_speeds[1] > -this.inertia)
				this.movement_speeds[1] = 0;
			else
				this.movement_speeds[1] += this.inertia;
		}
		else if(this.movement_speeds[1] > 0){
			if(this.movement_speeds[1] < this.inertia)
				this.movement_speeds[1] = 0;
			else
				this.movement_speeds[1] -= this.inertia;
		}
	}
	
	//Vertical colission check
	this.moveRightWithWeapons(this.movement_speeds[0]);
	var boundries_colided = game.isObjectOutside(this, false);
	if(boundries_colided == game.BoundriesEnum.left){
		this.moveRightWithWeapons(-this.pos[0]);
		this.movement_speeds[0] = 0;
	}
	else if(boundries_colided == game.BoundriesEnum.right){
		this.moveLeftWithWeapons(this.pos[0] + this.size[0] - canvas.width);
		this.movement_speeds[0] = 0;
	}
	
	//Horizontal colission check
	this.moveDownWithWeapons(this.movement_speeds[1]);
	var boundries_colided = game.isObjectOutside(this, false);
	if(boundries_colided == game.BoundriesEnum.up){
		this.moveDownWithWeapons(-this.pos[1]);
		this.movement_speeds[1] = 0;
	}
	else if(boundries_colided == game.BoundriesEnum.down){
		this.moveUpWithWeapons(this.pos[1] + this.size[1] - canvas.height);
		this.movement_speeds[1] = 0;
	}
	
}

Player.prototype.enableMovementDirection = function(dir){
	this.movement_directions[dir-1] = true;
	if(dir > 1)
		this.disableMovementDirection(dir-2);
	else
		this.disableMovementDirection(dir+2);
}

Player.prototype.disableMovementDirection = function(dir){
	this.movement_directions[dir-1] = false;
}

Player.prototype.createWeapons = function(){
	this.weapons.push(new DefaultWeapon([this.pos[0] + 70, this.pos[1] + 5]));
}