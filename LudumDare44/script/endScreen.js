function EndScreen(){
	this.background = new DrawableObject("images/endscreen.svg", [0, 0]);
	this.points_pos = [500, 500];
}

EndScreen.prototype.draw = function(){
	this.background.draw();
	canvas_context.font = "20px Arial";
	canvas_context.fillStyle = "yellow";
	canvas_context.textAlign = "center";
	canvas_context.fillText(game.points.toString(), this.points_pos[0], this.points_pos[1]);
}