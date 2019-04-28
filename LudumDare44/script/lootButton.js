function LootButton(pos, loot_item, write_price){
	Button.call(this, pos, "images/loot_btn_inactive.svg", "images/loot_btn_active.svg", "images/loot_btn_disabled.svg");
	
	this.loot_item = loot_item;
	this.loot_image = new DrawableObject(loot_item.image_name, [pos[0] + 10, pos[1] + 5]);
	this.text = loot_item.text;
	this.price = loot_item.price;
	this.text_pos = [pos[0] + 50, pos[1] + 150];
	this.price_pos = [pos[0] + 50, pos[1] + 180];
	this.bought = false;
	this.write_price = write_price;	
}

LootButton.prototype = Object.create(Button.prototype);

LootButton.prototype.drawLootButton = function(){
	this.draw();
	if(!this.bought){
		this.loot_image.draw();
		canvas_context.font = "20px Arial";
		canvas_context.fillStyle = "black";
		canvas_context.textAlign = "center";
		canvas_context.fillText(this.text, this.text_pos[0], this.text_pos[1]);
		if(this.write_price)
			canvas_context.fillText(this.price.toString(), this.price_pos[0], this.price_pos[1]);
	}
}

LootButton.prototype.activate = function(){
	this.loot_item.activate();
	this.bought = true;
	this.enabled = false;
}