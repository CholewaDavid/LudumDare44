function Player(){
	SidedSolidObject.call(this, "images/player.svg", [30, 10], [70, 40], true);
	
	this.MovementEnum = Object.freeze({"left": 1, "up": 2, "right": 3, "down": 4});
	
	this.movement_directions = [false, false, false, false];
	this.movement_speeds = [0, 0];
	this.max_speed = 10;
	this.acceleration = 2;
	this.inertia = 0.5;
	this.movementEnabled = false;
}

Player.prototype = Object.create(SidedSolidObject.prototype);

Player.prototype.update = function(){
	this.move();
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
	
	this.moveRight(this.movement_speeds[0]);
	var colided = game.checkColissions(this, false);
	if(colided != null){
		if(this.movement_speeds[0] > 0)
			this.moveRight(colided.pos[0] + colided.size[0] - this.pos[0]);
		else
			this.moveLeft(this.pos[0] + this.size[0] - colided.pos[0]);
		this.movement_speeds[0] = 0;
	}
	
	this.moveDown(this.movement_speeds[1]);
	var colided = game.checkColissions(this, false);
	if(colided != null){
		if(this.movement_speeds[1] > 0)
			this.moveUp(this.pos[1] + this.size[1] - colided.pos[1]);
		else
			this.moveDown(colided.pos[1] + colided.size[1] - this.pos[1]);
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