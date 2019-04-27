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

$(document).ready(function(){
	canvas = $("#canvas_game")[0];
	canvas_context = canvas.getContext("2d");
	startGame();
})

window.onkeydown = function(event){
	switch(event.keyCode){
		case 87:
		case 38:
			game.player.enableMovementDirection(game.player.MovementEnum.up);
			break;
		case 83:
		case 40:
			game.player.enableMovementDirection(game.player.MovementEnum.down);
			break;
		case 65:
		case 37:
			game.player.enableMovementDirection(game.player.MovementEnum.left);
			break;
		case 68:
		case 39:
			game.player.enableMovementDirection(game.player.MovementEnum.right);
			break;
		case 32:
			game.player.shotButtonHeld = true;
			break;
	}
}

window.onkeyup = function(event){
	switch(event.keyCode){
		case 87:
		case 38:
			game.player.disableMovementDirection(game.player.MovementEnum.up);
			break;
		case 83:
		case 40:
			game.player.disableMovementDirection(game.player.MovementEnum.down);
			break;
		case 65:
		case 37:
			game.player.disableMovementDirection(game.player.MovementEnum.left);
			break;
		case 68:
		case 39:
			game.player.disableMovementDirection(game.player.MovementEnum.right);
			break;
		case 32:
			game.player.shotButtonHeld = false;
			break;
		}
}