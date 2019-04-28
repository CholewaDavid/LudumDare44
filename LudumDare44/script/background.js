function Background(){
	this.space_color = "#000000";
	this.stars = [];
	
	this.createRandomStars();
}

Background.prototype.draw = function(){
	canvas_context.fillStyle = this.space_color;
	canvas_context.fillRect(0, 0, canvas.width, canvas.height);
	for(var i = 0; i < this.stars.length; i++)
		this.stars[i].draw();
}

Background.prototype.update = function(){
	var mov_speed = game.environmentSpeed/3;
	for(var i = 0; i < this.stars.length; i++){
		if(this.stars[i].isOutside()){
			this.stars.splice(i--, 1);
			continue;
		}
		this.stars[i].moveLeft(mov_speed);
	}
	
	if(Math.random() * 100 < 2 * mov_speed)
		this.stars.push(new Star([1200, Math.floor(Math.random() * canvas.height)]));
}

Background.prototype.createRandomStars = function(){
	for(var i = 0; i < 1200; i++){
		if(Math.random() * 100 < 2)
			this.stars.push(new Star([i, Math.floor(Math.random() * canvas.height)]));
	}
}