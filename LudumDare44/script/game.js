function Game(){
	this.background = new Background();
	this.player = new Player();
	
	this.BoundriesEnum = Object.freeze({"left": 1, "up": 2, "right": 3, "down": 4, "none": 5});
	this.LootItemEnum = Object.freeze({"damage_up": 1});
	
	this.splash_screen = new DrawableObject("images/splash.svg", [0, 0]);
	
	this.runGame = false;
	this.points = 0;
	this.stage = 0;
	this.distance = 0;
	this.stage_length = 300;
	this.end_stage = false;
	this.start_game = false;
	this.leave_shop = false;
	this.fast_travel = false;
	this.active_shop = false;
	this.boss = false;
	this.environmentSpeed = 3;
	this.max_environmentSpeed = 20;
	this.fast_travel_time = 0;
	this.fast_travel_max_time = 180;
	
	this.shop = null;
	
	this.shots = [];
	this.enemyShips = [];
	
	this.shop_item_list = [];
	this.junkyard_item_list = [];
	
	this.fillShopItemList();
	this.fillJunkyardItemList();
}

Game.prototype.draw = function(){
	this.background.draw();
	for(var i = 0; i < this.enemyShips.length; i++)
		this.enemyShips[i].drawWithWeapons();

	if(this.stage == 0)
		this.splash_screen.draw();
	if(this.shop != null)
		this.shop.draw();
	
	this.player.drawWithWeapons();
	for(var i = 0; i < this.shots.length; i++)
		this.shots[i].draw();
}

Game.prototype.update = function(){
	this.background.update();
	if(this.fast_travel){
		this.fast_travel_time++;
		if(this.fast_travel_time > this.fast_travel_max_time){
			this.fast_travel = false;
			this.handleStage();
			return;
		}
		if(this.environmentSpeed < this.max_environmentSpeed)
			this.environmentSpeed++;
	}
	else{
		if(this.environmentSpeed > 3)
			this.environmentSpeed--;
	}
	if(this.active_shop){
	
	}
	else if(this.fast_travel){
		if(this.shop != null)
			this.shop.move(this.environmentSpeed);
	}
	else{
		this.player.updateWithWeapons();
		for(var i = 0; i < this.enemyShips.length; i++)
			this.enemyShips[i].updateWithWeapons();
		for(var i = 0; i < this.shots.length; i++)
			this.shots[i].update();
		
		this.checkShotColissions();
		this.checkDestroyedShips();
		
		//Shop
		if(this.shop != null && this.enemyShips.length == 0){
			this.shop.move(this.environmentSpeed);
			if(this.shop.background.pos[0] <= 0){
				this.active_shop = true;
				this.shop.openShopMenu();
			}
		}
		//Main gameplay
		else if(this.shop == null && this.stage != 0  && this.stage != 9)
			this.handleEnemySpawning();
	}
	
	this.handleStage();
}

Game.prototype.gameLoop = function(){
	if(this.runGame){
		this.update();
	}
	else{
		
	}
	this.draw();
}

Game.prototype.startGame = function(){
	this.runGame = true;
	this.audioLoop = new Audio("Sounds/music.wav");
	this.audioLoop.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
	}, false);
	this.audioLoop.play();
}

Game.prototype.checkColissions = function(solid_object, sided, friendly){
	for(var i = 0; i < this.enemyShips.length; i++){
		if(!sided || (sided && this.enemyShips[i].friendly != friendly)){
			if(this.enemyShips[i].colission(solid_object))
				return this.enemyShips[i];
		}
		if(!sided || (sided && !friendly)){
			if(this.player.colission(solid_object))
				return this.player;
		}
	}
}

Game.prototype.isObjectOutside = function(solid_object, fully_outside){
	if(fully_outside){
		if((solid_object.pos[0] + solid_object.size[0]) < 0)
			return this.BoundriesEnum.left;
		if(solid_object.pos[0] > canvas.width)
			return this.BoundriesEnum.right;
		if((solid_object.pos[1] + solid_object.size[1]) < 0)
			return this.BoundriesEnum.up;
		if(solid_object.pos[1] > canvas.height)
			return this.BoundriesEnum.down;
	}
	else{
		if(solid_object.pos[0] < 0)
			return this.BoundriesEnum.left;
		if((solid_object.pos[0] + solid_object.size[0]) > canvas.width)
			return this.BoundriesEnum.right;
		if(solid_object.pos[1] < 0)
			return this.BoundriesEnum.up;
		if((solid_object.pos[1] + solid_object.size[1]) > canvas.height)
			return this.BoundriesEnum.down;
	}
	return this.BoundriesEnum.none;
}

Game.prototype.degreeToRadian = function(degree){
	return degree * Math.PI / 180;
}

Game.prototype.checkShotColissions = function(){	
	for(var i = 0; i < this.shots.length; i++){
		if(this.isObjectOutside(this.shots[i], true) != this.BoundriesEnum.none){
			this.shots.splice(i, 1);
			continue;
		}
		
		var colided_objects = this.checkColissions(this.shots[i], true, this.shots[i].friendly);
		if(colided_objects != null){
			if(colided_objects instanceof Ship)
				colided_objects.damage(this.shots[i].damage);
			
			this.shots.splice(i--, 1);
			continue;
		}
	}
}

Game.prototype.checkDestroyedShips = function(){
	for(var i = 0; i < this.enemyShips.length; i++){
		if(this.enemyShips[i].outside)
			this.enemyShips.splice(i--, 1);
		else if(this.enemyShips[i].health < 0){
			this.points += this.enemyShips[i].points;
			this.enemyShips.splice(i--, 1);
		}
	}
}

Game.prototype.handleEnemySpawning = function(){
	if(Math.floor(Math.random() * 100) < 1)
		this.enemyShips.push(new BasicEnemyShip([canvas.width + 100, Math.floor(Math.random() * (canvas.height - 100))]));
}

Game.prototype.getLootItem = function(item){
	switch(item){
		case this.LootItemEnum.damage_up:
			return new LootDamageUp();
			break;
	}
}

Game.prototype.fillShopItemList = function(){
	this.shop_item_list.push(this.LootItemEnum.damage_up);
}

Game.prototype.fillJunkyardItemList = function(){
	this.junkyard_item_list.push(this.LootItemEnum.damage_up);
}

Game.prototype.handleStage = function(){
	if(this.distance >= this.stage * this.stage_length){
		this.end_stage = true;
	}
	
	if(this.end_stage){
		if(this.stage == 0){
			if(this.start_game){
				this.stage++;
				this.end_stage = false;
			}
		}

		else if(this.stage == 9){
			if(!this.boss){
				this.spawnBoss();
				this.end_stage = false;
			}
		}
		
		else{
			if(this.shop == null){
				if(this.stage % 2 == 0)
					this.shop = new Shop();
				else
					this.shop = new Junkyard();
			}
			else{
				if(this.leave_shop && this.fast_travel_time == 0){
					this.active_shop = false;
					this.shop.closeShopMenu();
					this.fast_travel = true;
				}
				if(this.leave_shop && !this.fast_travel){
					this.leave_shop = false;			
					this.shop = null;
					this.stage++;
					this.end_stage = false;
					this.fast_travel_time = 0;
				}
			}
		}
	}
	else
		this.distance++;
}

Game.prototype.spawnBoss = function(){
	this.boss = true;
}

Game.prototype.startFastTravel = function(){
	this.fast_travel = true;
}

Game.prototype.stopFastTravel = function(){
	this.fast_travel = false;
}