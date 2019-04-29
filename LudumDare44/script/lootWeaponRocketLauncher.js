function LootWeaponRocketLauncher(){
	LootChoice.call(this, 30, true, false, "images/loot_weapon_rocket_launcher.svg", "Rocket Launcher");
}

LootWeaponRocketLauncher.prototype = Object.create(LootChoice.prototype);

LootWeaponRocketLauncher.prototype.activate = function(){
	game.player.weapons[0] = new RocketLauncher(game.player.weapons[0].pos);
}

