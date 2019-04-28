function Shop(){
	this.start_pos = [1100, 0];
	this.background = new DrawableObject("images/shop_background.svg", this.start_pos);
	this.shopMenu = new ShopMenu();
}

Shop.prototype.draw = function(){
	this.background.draw();
	this.shopMenu.draw();
}

Shop.prototype.move = function(amount){
	this.background.moveLeft(amount);
}

Shop.prototype.openShopMenu = function(){
	this.shopMenu.visible = true;
}

Shop.prototype.closeShopMenu = function(){
	this.shopMenu.visible = false;
}

Shop.prototype.changeButton = function(dir){
	this.shopMenu.changeButton(dir);
}

Shop.prototype.pressButton = function(){
	this.shopMenu.pressButton();
}

Shop.prototype.leaveShop = function(){
	game.leave_shop = true;
}