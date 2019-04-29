function Weapon(sprite_filename, pos, shot_pos, cooldown, damage, ammo, friendly, automatic){
	DrawableObject.call(this, sprite_filename, pos);
	
	this.pos = pos.slice();
	this.shot_pos = shot_pos.slice();
	this.cooldown = cooldown;
	this.curr_cooldown = 0;
	this.damage = damage;
	this.ammo = ammo;
	this.automatic = automatic;
	this.friendly = friendly;
}

Weapon.prototype = Object.create(DrawableObject.prototype);

Weapon.prototype.update = function(){
	if(this.curr_cooldown > 0)
		this.curr_cooldown--;
}

Weapon.prototype.canShoot = function(){
	return this.curr_cooldown <= 0 && (this.ammo == null || this.ammo > 0) && game.player != null;
}

Weapon.prototype.getShotPosition = function(){
	return [this.pos[0] + this.shot_pos[0], this.pos[1] + this.shot_pos[1]];
}

Weapon.prototype.shot = function(){
	if(this.friendly)
		this.curr_cooldown = this.cooldown - (this.cooldown * 0.1 * game.player.attack_speed_boosts);
	else
		this.curr_cooldown = this.cooldown;
	if(this.ammo != null)
		this.ammo--;
}

Weapon.prototype.getDamage = function(){
	if(this.friendly)
		return this.damage + this.damage * 0.3 * game.player.damage_boosts;
	else
		return this.damage
}