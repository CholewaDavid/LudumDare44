function ShopMenu(){
	IngameMenu.call(this);
	
	this.choices = [];
		
	this.first_btn_pos = [200, 600];
	this.btn_width = 120;
	this.background = new DrawableObject("images/shop_menu_background.svg", [100, 50]);
	
	this.generateChoices(3);
	this.generateButtons();
}

ShopMenu.prototype = Object.create(IngameMenu.prototype);

ShopMenu.prototype.draw = function(){
	if(this.visible){
		this.background.draw();
		for(var i = 0; i < this.buttons.length; i++)
			this.buttons[i].drawLootButton();
	}
}

ShopMenu.prototype.pressButton = function(){
	if(this.visible){
		if(game.player.health > this.choices[this.cur_button].price && this.buttons[this.cur_button].enabled){
			game.player.health -= this.choices[this.cur_button].price;
			this.buttons[this.cur_button].activate();
			this.checkBuyableItems();
		}
	}
}

ShopMenu.prototype.generateChoices = function(amount){
	this.choices.push(game.getLootItem(game.weapon_item_list[Math.floor(Math.random() * game.weapon_item_list.length)]));
	for(var i = 1; i < amount; i++){
		this.choices.push(game.getLootItem(game.shop_item_list[Math.floor(Math.random() * game.shop_item_list.length)]));
	}
}

ShopMenu.prototype.generateButtons = function(){
	for(var i = 0; i < this.choices.length; i++){
		this.buttons.push(new LootButton([this.first_btn_pos[0] + 5 * i + this.btn_width * i, this.first_btn_pos[0]], this.choices[i], true));
	}
	
	this.checkBuyableItems();
	
	this.buttons[0].active = true;
}

ShopMenu.prototype.checkBuyableItems = function(){
	for(var i = 0; i < this.buttons.length; i++){
		if(game.player.health < this.buttons[i].price || this.buttons[i].bought)
			this.buttons[i].enabled = false;
		else if(game.player.weapons[0] instanceof RocketLauncher && this.buttons[i].loot_item instanceof LootWeaponRocketLauncher)
			this.buttons[i].enabled = false;
		else if(game.player.weapons[0] instanceof Shotgun && this.buttons[i].loot_item instanceof LootWeaponShotgun)
			this.buttons[i].enabled = false;
		else
			this.buttons[i].enabled = true;
	}
}