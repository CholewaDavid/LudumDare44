function LootDamageUp(){
	LootChoice.call(this, 20, true, true, "images/loot_damage_up.svg", "Damage UP");
}

LootDamageUp.prototype = Object.create(LootChoice.prototype);

LootDamageUp.prototype.activate = function(){
	game.player.damage_boosts++;
}