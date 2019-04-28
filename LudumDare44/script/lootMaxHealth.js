function LootMaxHealth(){
	LootChoice.call(this, 20, false, true, "images/loot_max_health.svg", "Increase MAX health");
	
	this.max_health_increase = 10;
}

LootMaxHealth.prototype = Object.create(LootChoice.prototype);

LootMaxHealth.prototype.activate = function(){
	game.player.max_health += this.max_health_increase;
}

