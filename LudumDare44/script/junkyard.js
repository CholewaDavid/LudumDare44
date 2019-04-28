function Junkyard(){
	this.start_pos = [1100, 0];
	this.background = new DrawableObject("images/junkyard_background.svg", this.start_pos);
	this.junkyardMenu = new JunkyardMenu();
}

Junkyard.prototype.draw = function(){
	this.background.draw();
	this.junkyardMenu.draw();
}

Junkyard.prototype.move = function(amount){
	this.background.moveLeft(amount);
}

Junkyard.prototype.openShopMenu = function(){
	this.junkyardMenu.visible = true;
}

Junkyard.prototype.closeShopMenu = function(){
	this.junkyardMenu.visible = false;
}

Junkyard.prototype.changeButton = function(dir){
	this.junkyardMenu.changeButton(dir);
}

Junkyard.prototype.pressButton = function(){
	this.junkyardMenu.pressButton();
}

Junkyard.prototype.leaveShop = function(){
	game.leave_shop = true;
}