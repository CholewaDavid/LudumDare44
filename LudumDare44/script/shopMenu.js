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
		}
	}
}

ShopMenu.prototype.generateChoices = function(amount){
	for(var i = 0; i < amount; i++){
		this.choices.push(game.getLootItem(game.shop_item_list[Math.floor(Math.random() * game.shop_item_list.length)]));
	}
}

ShopMenu.prototype.generateButtons = function(){
	for(var i = 0; i < this.choices.length; i++){
		this.buttons.push(new LootButton([this.first_btn_pos[0] + 5 * i + this.btn_width * i, this.first_btn_pos[0]], this.choices[i], true));
		if(game.player.health < this.buttons[i].price)
			this.buttons[i].enabled = false;
	}
	
	this.buttons[0].active = true;
}