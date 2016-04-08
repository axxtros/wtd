/* 	init.js
	start: 27/03/2016
*/

var PROGRAM_VERISON = 'v.' + 0.1001
var IMAGE_DIRECTORY = 'img/';
var BODY_WIDTH = 1000;							//1000

var DEV_CANVAS_ENABLED = true;
var MOUSE_ENABLED = false;
var FULL_SCREEN_ENABLED = false;

var GAME_DIV_WIDTH = 1000;						//1000
var GAME_DIV_HEIGHT = 800;						//800

var GAME_CANVAS_WIDTH = GAME_DIV_WIDTH;			
var GAME_CANVAS_HEIGHT = GAME_DIV_HEIGHT;		

var GAME_SPEED_INDEX = 20;		//[20]
var MAP_ELEMENT_SIZE = 40;		//egy térkép elem mérete (minimum: 40x40)
var UNIT_DEFAULT_SPEED = 10;	//a játékos sebességének mindig a MAP_ELEMENT_SIZE egész osztójának kell lennie [default : 5, vagy 10] illeszkedni kell az scrollBorder-re
								//a UNIT_DEFAULT_SPEED oszthatónak kell lennie a MAP_ELEMENT_SIZE-al és akkor nem lesz elcsúszás

var gamediv;
var mapCanvas;
var unitCanvas;
var missileCanvas;
var mouseCanvas;
var devCanvas;
var mapCanvasContext;
var unitcanvasContext;
var missilecanvasContext;
var mousecanvasContext;
var devcanvasContenxt;

var dummyPlayerImage;
var dummyTileImage;

var fps = GAME_SPEED_INDEX;
var now;
var then;
var interval = 1000 / fps;
var delta;
var lastCalledTime;

var mousex = 0;
var mousey = 0;
var canvasMousePosX = 0;
var canvasMousePosY = 0;

var player = {
	wx : 0,			//world x coordinate
	wy : 0,			//world y coordinate
	ux : 0,			//unit canvas x coordinate
	uy : 0,			//unit canvas y coordinate	
	mx : 0,			//map matrix x coordinate
	my : 0,			//map matrix y coordinate
	sx : 0,			//starting map matrix x
	sy : 0,			//starting map matrix y
	mapOffsetx : 0,	//player map offset x axis
	mapOffsety : 0,	//player map offset y axis
	direction : 0,	//1-up, 2-down, 3-left, 4-right
	speed : 0,		//unit speed
	angle : 0,		//sprite view angle
	state : 0,		//1-move, 2-stop	
	darea : 0,		//draw area
	marea : 0,		//map area
	carea : 0,		//collision area
	cbrdr : 0		//calculated collision border
};

function init() {
	var gamediv = document.getElementById('gamediv');
	if(gamediv != null) {
		gamediv.style.width = GAME_DIV_WIDTH + 'px';
		gamediv.style.height = GAME_DIV_HEIGHT + 'px';
		gamediv.style.border = '1px solid orange';
		
		var gameDivRect = gamediv.getBoundingClientRect();
		var gamedivTop = gameDivRect.top;
		var gamedivLeft = gameDivRect.left;
		
		GAME_CANVAS_WIDTH = GAME_DIV_WIDTH;
		GAME_CANVAS_HEIGHT = GAME_DIV_HEIGHT;
		
		mapCanvas = document.getElementById('mapcanvas');		
		if(mapCanvas != null) {			
			mapCanvas.style.top = gamedivTop + 'px';
			mapCanvas.style.left = gamedivLeft + 'px';
			mapCanvas.style.width = GAME_CANVAS_WIDTH + 'px';
			mapCanvas.style.height = GAME_CANVAS_HEIGHT + 'px';
			mapCanvasContext = mapCanvas.getContext('2d');	
			mapCanvasContext.canvas.width  = GAME_CANVAS_WIDTH;
			mapCanvasContext.canvas.height = GAME_CANVAS_HEIGHT;
			mapCanvasContext.scale(1, 1);
			
		} else {
			console.log('Error: mapcanvas element is null!');
		}
		
		unitCanvas = document.getElementById('unitcanvas');		
		if(unitCanvas != null) {			
			unitCanvas.style.top = gamedivTop + 'px';
			unitCanvas.style.left = gamedivLeft + 'px';
			unitCanvas.style.width = GAME_CANVAS_WIDTH + 'px';
			unitCanvas.style.height = GAME_CANVAS_HEIGHT + 'px';
			unitcanvasContext = unitCanvas.getContext('2d');	
			unitcanvasContext.canvas.width  = GAME_CANVAS_WIDTH;
			unitcanvasContext.canvas.height = GAME_CANVAS_HEIGHT;
			unitcanvasContext.scale(1, 1);			
		} else {
			console.log('Error: unitCanvas element is null!');
		}		
		
		missileCanvas = document.getElementById('missilecanvas');		
		if(missileCanvas != null) {			
			missileCanvas.style.top = gamedivTop + 'px';
			missileCanvas.style.left = gamedivLeft + 'px';
			missileCanvas.style.width = GAME_CANVAS_WIDTH + 'px';
			missileCanvas.style.height = GAME_CANVAS_HEIGHT + 'px';
			missilecanvasContext = missileCanvas.getContext('2d');	
			missilecanvasContext.canvas.width  = GAME_CANVAS_WIDTH;
			missilecanvasContext.canvas.height = GAME_CANVAS_HEIGHT;
			missilecanvasContext.scale(1, 1);			
		} else {
			console.log('Error: missileCanvas element is null!');
		}
		
		if(DEV_CANVAS_ENABLED) {
			devCanvas = document.getElementById('devcanvas');		
			if(devCanvas != null) {			
				devCanvas.style.top = gamedivTop + 'px';
				devCanvas.style.left = gamedivLeft + 'px';
				devCanvas.style.width = GAME_CANVAS_WIDTH + 'px';
				devCanvas.style.height = GAME_CANVAS_HEIGHT + 'px';			
				devcanvasContenxt = devCanvas.getContext('2d');	
				devcanvasContenxt.canvas.width  = GAME_CANVAS_WIDTH;
				devcanvasContenxt.canvas.height = GAME_CANVAS_HEIGHT;
				devcanvasContenxt.scale(1, 1);			
			} else {
				console.log('Error: devCanvas element is null!');
			}
		}

		if(MOUSE_ENABLED) {
			mouseCanvas = document.getElementById('mousecanvas');		
			if(mouseCanvas != null) {			
				mouseCanvas.style.top = gamedivTop + 'px';
				mouseCanvas.style.left = gamedivLeft + 'px';
				mouseCanvas.style.width = GAME_CANVAS_WIDTH + 'px';
				mouseCanvas.style.height = GAME_CANVAS_HEIGHT + 'px';
				mousecanvasContext = mouseCanvas.getContext('2d');	
				mousecanvasContext.canvas.width  = GAME_CANVAS_WIDTH;
				mousecanvasContext.canvas.height = GAME_CANVAS_HEIGHT;
				mousecanvasContext.scale(1, 1);			
			} else {
				console.log('Error: mouseCanvas element is null!');
			}
		}
	}
}

function setFullScreenCanvas(canvasElement) {	
	if(canvasElement.webkitRequestFullScreen) {
	   canvasElement.webkitRequestFullScreen();
	}
	else {
		canvasElement.mozRequestFullScreen();
	}            
}

function initGameMap(map) {	
	var worldX = 0;
	var worldY = 0;
	var mapOffsetX = 0;
	var mapOffsetY = 0;
	var isDone = false;
	for(var i = 0; i != map.length; i++) {		
		elementX = mapOffsetX * (-1);
		for(var	 j = 0; j != map[i].length; j++) {			
			if(map[i][j] == 2) {																
				var unitCanvasX = 0;
				var unitCanvasY = 0;
				var mapMatrixX = j;
				var mapMatrixY = i;
				
				worldX = (j * MAP_ELEMENT_SIZE) + (MAP_ELEMENT_SIZE / 2);
				worldY = (i * MAP_ELEMENT_SIZE) + (MAP_ELEMENT_SIZE / 2);
				
				if(worldX < leftScrollBorder) {
					unitCanvasX = worldX;
					mapOffsetX = 0;
				} else if(worldX >= leftScrollBorder && worldX <= rightScrollBorder) {
					unitCanvasX = (GAME_CANVAS_WIDTH / 2);
					mapOffsetX = worldX - leftScrollBorder;
				} else if(worldX > rightScrollBorder) {					
					unitCanvasX = GAME_CANVAS_WIDTH - ((map[0].length * MAP_ELEMENT_SIZE) - worldX);
					mapOffsetX = (rightScrollBorder - leftScrollBorder);
				}
				if(worldY < topScrollBorder) {
					unitCanvasY = worldY;
					mapOffsetY = 0;
				} else if(worldY >= topScrollBorder && worldY <= bottomScrollBorder) {
					unitCanvasY = (GAME_CANVAS_HEIGHT / 2);
					mapOffsetY = worldY - topScrollBorder;
				} else if(worldY > bottomScrollBorder) {
					unitCanvasY = GAME_CANVAS_HEIGHT - ((map.length * MAP_ELEMENT_SIZE) - worldY);
					mapOffsetY = (bottomScrollBorder - topScrollBorder);
				}
				
				initPlayer(worldX, worldY, unitCanvasX, unitCanvasY, mapMatrixX, mapMatrixY, mapOffsetX, mapOffsetY, 3);				
				unitcanvasContext.drawImage(dummyPlayerImage, player.ux - (MAP_ELEMENT_SIZE / 2), player.uy - (MAP_ELEMENT_SIZE / 2), MAP_ELEMENT_SIZE, MAP_ELEMENT_SIZE);
				drawMap(map, player.mapOffsetx, player.mapOffsety);									
				map[i][j] = 0;
				/*
				mapCanvasContext.transform(  
					1,   0.5,
				   -1,   0.5,
				  160,   0);
				*/
			}		
		}		
	}	
}

function initPlayer(worldX, worldY, unitCanvasX, unitCanvasY, matrixX, matrixY, mapOffsetX, mapOffsetY, startDirection) {
	player = new Object();	
	player.wx = worldX;
	player.wy = worldY;
	player.ux = unitCanvasX;
	player.uy = unitCanvasY;
	player.mx = matrixX;
	player.my = matrixY;
	player.sx = matrixX;
	player.sy = matrixY;
	player.mapOffsetx = mapOffsetX;
	player.mapOffsety = mapOffsetY;	
	player.direction = startDirection;
	player.speed = UNIT_DEFAULT_SPEED;
	player.angle = 0;	
	player.state = 2;
	player.darea = 64;
	player.marea = 40;
	player.carea = 32;
	player.cbrdr = ((player.marea - player.carea) / 2);
}

function gameLoop() {	
	requestAnimationFrame(gameLoop);	
	
	if(DEV_CANVAS_ENABLED) {
		fpsCalculation();
	}		
	
	now = Date.now();
    delta = now - then;
		
	if (delta > interval) {		
		animatePlayer(player, gameMap);
		animateMissiles(player, gameMap);		
		then = now - (delta % interval);
	}	
}

function fpsCalculation() {
	if(!lastCalledTime) {
		lastCalledTime = Date.now();
		var _fps = 0;
		return;
	}
	var delta = (Date.now() - lastCalledTime) / 1000;
	lastCalledTime = Date.now();
	_fps = 1 / delta;
	devcanvasContenxt.clearRect(0, 0, devCanvas.width, devCanvas.height);
	devcanvasContenxt.font = "bold 12px courier";
	devcanvasContenxt.fillText('fps:' + Math.floor(_fps), 4, 20);
	devcanvasContenxt.fillText('player ux:' + player.ux, 4, 40);
	devcanvasContenxt.fillText('player uy:' + player.uy, 4, 50);
	devcanvasContenxt.fillText('player wx:' + player.wx, 4, 70);
	devcanvasContenxt.fillText('player wy:' + player.wy, 4, 80);
	devcanvasContenxt.fillText('player mx:' + player.mx, 4, 100);
	devcanvasContenxt.fillText('player my:' + player.my, 4, 110);
	devcanvasContenxt.fillText('player mapoffsetx:' + player.mapOffsetx, 4, 130);
	devcanvasContenxt.fillText('player mapoffsety:' + player.mapOffsety, 4, 140);	
	devcanvasContenxt.fillText('topScrollBorder:' + topScrollBorder, 4, 160);
	devcanvasContenxt.fillText('leftScrollBorder:' + leftScrollBorder, 4, 170);
	devcanvasContenxt.fillText('rightScrollBorder:' + rightScrollBorder, 4, 180);
	devcanvasContenxt.fillText('bottomScrollBorder:' + bottomScrollBorder, 4, 190);	
	
	if(MOUSE_ENABLED) {
		devcanvasContenxt.fillText('page mouse x:' + mousex, 4, 210);
		devcanvasContenxt.fillText('page mouse y:' + mousey, 4, 220);		
		devcanvasContenxt.fillText('canvas mouse x:' + canvasMousePosX, 4, 230);
		devcanvasContenxt.fillText('canvas mouse y:' + canvasMousePosY, 4, 240);		
		devcanvasContenxt.fillText('player angle:' + player.angle, 4, 260);		
		devcanvasContenxt.beginPath();
		devcanvasContenxt.moveTo(player.ux, player.uy);
		devcanvasContenxt.lineTo(canvasMousePosX, canvasMousePosY);
		devcanvasContenxt.stroke();	
	}
}

function keyDownHandler(event) {	
	if (event.keyCode == 38) {	//up
		player.direction = 1;
		player.state = 1;		
	}
	if (event.keyCode == 40) {	//down	
		player.direction = 2;
		player.state = 1;		
	}
	if (event.keyCode == 37) {	//left		
		player.direction = 3;
		player.state = 1;
	}
	if (event.keyCode == 39) {	//right				
		player.direction = 4;
		player.state = 1;
	}
	if (event.keyCode == 32) {	//space - fire
		player.state = 2;
		shotNewMissile(player, NORMAL_ARROW);
	}
}

function doMouseDown(event) {
	mousex = event.pageX;
	mousey = event.pageY;	
	canvasMousePosX = mousex - mouseCanvas.offsetLeft;
	canvasMousePosY = mousey - mouseCanvas.offsetTop;
	player.angle = radToDeg(Math.atan2(canvasMousePosY - player.uy, canvasMousePosX - player.ux));
	player.angle += 90;
	if (player.angle < 0) {
		player.angle = 360 + player.angle;
    }	
	player.angle = Math.round(player.angle);
	player.state = 3;	
}

function radToDeg(angle) {
    return angle * (180 / Math.PI);
}

window.onload = function() {
	init();	
	//initTileImages();
	initGameMap(gameMap);	
	then =  Date.now();
	document.addEventListener("keydown", keyDownHandler, true);	
	if(MOUSE_ENABLED) {
		mouseCanvas.addEventListener("mousedown", doMouseDown, false);		
	}	
	gameLoop();
};
