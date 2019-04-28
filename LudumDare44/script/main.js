var game;
var canvas;
var canvas_context;
var gameLoopIntervalId;
var windowDrawInterval = 1000/60;

function startGame(){
	game = new Game();
	game.draw();
	gameLoopIntervalId = window.setInterval(function () { game.gameLoop(); }, windowDrawInterval);
	game.runGame = true;
}

function endGame(){
	game.runGame = false;
	window.clearInterval(gameLoopIntervalId);
	game = null;
}

$(document).ready(function(){
	canvas = $("#canvas_game")[0];
	canvas_context = canvas.getContext("2d");
	startGame();
})

window.onkeydown = function(event){
	switch(event.keyCode){
		case 87:
		case 38:
			if(game.player_dying_time == 0)
				game.player.enableMovementDirection(game.player.MovementEnum.up);
			break;
		case 83:
		case 40:
			if(game.player_dying_time == 0)	
				game.player.enableMovementDirection(game.player.MovementEnum.down);
			break;
		case 65:
		case 37:
			if(game.active_shop)
				game.shop.changeButton(-1);
			else if(game.player_dying_time == 0)
				game.player.enableMovementDirection(game.player.MovementEnum.left);
			break;
		case 68:
		case 39:
			if(game.active_shop)
				game.shop.changeButton(1);
			else if(game.player_dying_time == 0)
				game.player.enableMovementDirection(game.player.MovementEnum.right);
			break;
		case 32:
			if(game.stage == 0)
				game.start_game = true;
			else if(game.active_shop)
				game.shop.pressButton();
			else if(game.player_dying_time == 0)
				game.player.shotButtonHeld = true;
			break;
		case 27:
			if(game.active_shop)
				game.shop.leaveShop();
			if(game.player_dying_time >= game.player_dying_max_time){
				endGame();
				startGame();
			}
			break;
	}
}

window.onkeyup = function(event){
	switch(event.keyCode){
		case 87:
		case 38:
			if(game.player_dying_time == 0)
				game.player.disableMovementDirection(game.player.MovementEnum.up);
			break;
		case 83:
		case 40:
			if(game.player_dying_time == 0)
				game.player.disableMovementDirection(game.player.MovementEnum.down);
			break;
		case 65:
		case 37:
			if(game.player_dying_time == 0)
				game.player.disableMovementDirection(game.player.MovementEnum.left);
			break;
		case 68:
		case 39:
			if(game.player_dying_time == 0)
				game.player.disableMovementDirection(game.player.MovementEnum.right);
			break;
		case 32:
			if(game.player_dying_time == 0)
				game.player.shotButtonHeld = false;
			break;
		}
}