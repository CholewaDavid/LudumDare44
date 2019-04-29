function LootWeaponShotgun(){
	LootChoice.call(this, 30, true, false, "images/loot_weapon_shotgun.svg", "Shotgun");
}

LootWeaponShotgun.prototype = Object.create(LootChoice.prototype);

LootWeaponShotgun.prototype.activate = function(){
	game.player.weapons[0] = new Shotgun(game.player.weapons[0].pos);
}

