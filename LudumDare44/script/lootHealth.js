function LootHealth(){
	LootChoice.call(this, 20, false, true, "images/loot_health.svg", "Replenish health");
	
	this.health_value = 30;
}

LootHealth.prototype = Object.create(LootChoice.prototype);

LootHealth.prototype.activate = function(){
	game.player.health += this.health_value;
	if(game.player.health > game.player.max_health)
		game.player.health = game.player.max_health;
}