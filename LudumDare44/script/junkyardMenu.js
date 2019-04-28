function JunkyardMenu(){
	IngameMenu.call(this);
	
	this.choices = [];
		
	this.first_btn_pos = [200, 600];
	this.btn_width = 120;
	this.background = new DrawableObject("images/shop_menu_background.svg", [100, 50]);
	
	this.generateChoices(2);
	this.generateButtons();
}

JunkyardMenu.prototype = Object.create(IngameMenu.prototype);

JunkyardMenu.prototype.draw = function(){
	if(this.visible){
		this.background.draw();
		for(var i = 0; i < this.buttons.length; i++)
			this.buttons[i].drawLootButton();
	}
}

JunkyardMenu.prototype.pressButton = function(){
	if(this.visible){
		this.choices[this.cur_button].activate();
		game.leave_shop = true;
	}
}

JunkyardMenu.prototype.generateChoices = function(amount){
	this.choices.push(new LootHealth());
	for(var i = 1; i < amount; i++){
		this.choices.push(game.getLootItem(game.junkyard_item_list[Math.floor(Math.random() * game.junkyard_item_list.length)]));
	}
}

JunkyardMenu.prototype.generateButtons = function(){
	for(var i = 0; i < this.choices.length; i++){
		this.buttons.push(new LootButton([this.first_btn_pos[0] + 5 * i + this.btn_width * i, this.first_btn_pos[0]], this.choices[i], false));
	}
	
	this.buttons[0].active = true;
}