function IngameMenu(){
	this.buttons = [];
	this.cur_button = 0;
	this.visible = false;
}

IngameMenu.prototype.changeButton = function(dir){
	if(this.visible){
		this.buttons[this.cur_button].active = false;
		this.cur_button += dir;
		if(this.cur_button < 0)
			this.cur_button = this.buttons.length - 1;
		if(this.cur_button >= this.buttons.length)
			this.cur_button = 0;
		this.buttons[this.cur_button].active = true;
	}
}