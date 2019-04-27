function Background(){
	this.space_color = "#000000";
}

Background.prototype.draw = function(){
	canvas_context.fillStyle = this.space_color;
	canvas_context.fillRect(0, 0, canvas.width, canvas.height);
}

Background.prototype.update = function(){
	
}