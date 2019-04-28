function LootAttackSpeedUp(){
	LootChoice.call(this, 20, true, true, "images/loot_attack_speed_up.svg", "Attack Speed UP");
}

LootAttackSpeedUp.prototype = Object.create(LootChoice.prototype);

LootAttackSpeedUp.prototype.activate = function(){
	game.player.attack_speed_boosts++;
}