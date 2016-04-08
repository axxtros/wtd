/* test  27/03/2016 */

var PROGRAM_VERISON = 'v.' + 0.1001
var IMAGE_DIRECTORY = 'img/';
var BODY_WIDTH = 1000;							//1000

var DEV_CANVAS_ENABLED = true;
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
var mouseCanvas;
var devCanvas;
var mapCanvasContext;
var unitcanvasContext;
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
	ux : 0,			//unit canvas x coordinate
	uy : 0,			//unit canvas y coordinate
	wx : 0,			//world x coordinate
	wy : 0,			//world y coordinate
	sx : 0,			//starting map matrix x
	sy : 0,			//starting map matrix y
	mx : 0,			//map matrix x coordinate
	my : 0,			//map matrix y coordinate
	direction : 0,	//1-up, 2-down, 3-left, 4-right
	angle : 0,		//sprite view angle
	state : 0,		//1-move, 2-stop	
	darea : 0,		//draw area	
	marea : 0,		//map area
	carea : 0,		//collision area
	cbrdr : 0		//collision border
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

function setFullScreenCanvas(canvasElement) {	
	if(canvasElement.webkitRequestFullScreen) {
	   canvasElement.webkitRequestFullScreen();
	}
	else {
		canvasElement.mozRequestFullScreen();
	}            
}

/* init tile images */
dummyTileImage = new Image;
dummyTileImage.onload = function(){  };
dummyTileImage.src = IMAGE_DIRECTORY + "map_tile_40x40_1.png";

dummyPlayerImage = new Image;
dummyPlayerImage.onload = function(){  };
dummyPlayerImage.src = IMAGE_DIRECTORY + "player_tile_40x40_1.png";

/*
function initTileImages() {		
	dummyTileImage = new Image;
	dummyTileImage.src = IMAGE_DIRECTORY + "map_tile_40x40_1.png";
	dummyPlayerImage = new Image;
	dummyPlayerImage.src = IMAGE_DIRECTORY + "player_tile_40x40_1.png";	
}
*/

function initMap(map) {	
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
				var startingX = j;
				var startingY = i;
				
				worldX = (j * MAP_ELEMENT_SIZE) + (MAP_ELEMENT_SIZE / 2);
				worldY = (i * MAP_ELEMENT_SIZE) + (MAP_ELEMENT_SIZE / 2);
				
				if(worldX < leftScrollBorder) {
					unitCanvasX = worldX;
					mapOffsetX = 0;
				} else if(worldX >= leftScrollBorder && worldX <= rightScrollBorder) {
					unitCanvasX = (GAME_CANVAS_WIDTH / 2);
					mapOffsetX = worldX - leftScrollBorder;
				} else if(worldX > rightScrollBorder) {					
					unitCanvasX = GAME_CANVAS_WIDTH - ((tmap[0].length * MAP_ELEMENT_SIZE) - worldX);
					mapOffsetX = (rightScrollBorder - leftScrollBorder);
				}
				if(worldY < topScrollBorder) {
					unitCanvasY = worldY;
					mapOffsetY = 0;
				} else if(worldY >= topScrollBorder && worldY <= bottomScrollBorder) {
					unitCanvasY = (GAME_CANVAS_HEIGHT / 2);
					mapOffsetY = worldY - topScrollBorder;
				} else if(worldY > bottomScrollBorder) {
					unitCanvasY = GAME_CANVAS_HEIGHT - ((tmap.length * MAP_ELEMENT_SIZE) - worldY);
					mapOffsetY = (bottomScrollBorder - topScrollBorder);
				}
				
				initPlayer(worldX, worldY, unitCanvasX, unitCanvasY, startingX, startingY, mapOffsetX, mapOffsetY, 2);				
				unitcanvasContext.drawImage(dummyPlayerImage, player.ux - (MAP_ELEMENT_SIZE / 2), player.uy - (MAP_ELEMENT_SIZE / 2), MAP_ELEMENT_SIZE, MAP_ELEMENT_SIZE);
				drawMap(tmap, player.mapOffsetx, player.mapOffsety);				
				map[i][j] = 0;
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
	player.angle = 0;
	player.mapOffsetx = mapOffsetX;
	player.mapOffsety = mapOffsetY;
	player.speed = UNIT_DEFAULT_SPEED;
	player.direction = startDirection;
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
		movePlayer();		
		then = now - (delta % interval);
	}	
}

function movePlayer() {	

	if(player.state === 3) {
		var distanceX = player.ux - canvasMousePosX;
		var distanceY = player.uy - canvasMousePosY;		
		
		if(distanceX !== 0 && distanceY !== 0) {
			player.ux -= Math.round( ((player.ux - canvasMousePosX) / player.speed) );  
			player.uy -= Math.round( ((player.uy - canvasMousePosY) / player.speed) );  
		}		
	}	

	if(player.state === 1) {				
				
		if(player.direction === 1) {	//up			
			player.wy -= player.speed;
			player.my = Math.floor(player.wy / MAP_ELEMENT_SIZE);
		}
		if(player.direction === 2) {	//down					
			player.wy += player.speed;									
			player.my = Math.floor(player.wy / MAP_ELEMENT_SIZE);
		}		
		if(player.direction === 3) {	//left						
			player.wx -= player.speed;			
			player.mx = Math.floor(player.wx / MAP_ELEMENT_SIZE);
		}
		if(player.direction === 4) {	//right						
			player.wx += player.speed;			
			player.mx = Math.floor(player.wx / MAP_ELEMENT_SIZE);
		}		
				
		//collisionDetectionPlayer(tmap);
		
		if(player.direction === 1 && player.state === 1) {	//up			
			scrollY();			
		}
		if(player.direction === 2 && player.state === 1) {	//down			
			scrollY();			
		}
		if(player.direction === 3 && player.state === 1) {	//left			
			scrollX();			
		}
		if(player.direction === 4 && player.state === 1) {	//right			
			scrollX();			
		}
		
		drawPlayer();
		drawMap(tmap, player.mapOffsetx, player.mapOffsety);
	}
	
	drawPlayer();
	drawMap(tmap, player.mapOffsetx, player.mapOffsety);
	
	//player.state = 2;
}

function collisionDetectionPlayer(map) {
	var isCollision = false;
	if(player.direction === 1) {	//up	
		if(player.my === 0) {		
			if(player.wy <= (MAP_ELEMENT_SIZE / 2)) {
				player.wy = (MAP_ELEMENT_SIZE / 2);
				player.uy = (MAP_ELEMENT_SIZE / 2);
				isCollision = true;
			}
		} else {
			var ltx = (player.wx - (MAP_ELEMENT_SIZE / 2)) + player.cbrdr;
			var lty = (player.wy - (MAP_ELEMENT_SIZE / 2)) + player.cbrdr;
			var rtx = (player.wx + (MAP_ELEMENT_SIZE / 2)) - player.cbrdr;
			var rty = (player.wy - (MAP_ELEMENT_SIZE / 2)) + player.cbrdr;
			if( (map[mat(lty)][mat(ltx)] != 0) || (map[mat(rty)][mat(rtx)] != 0) ) {
				player.wy += player.speed;
				isCollision = true;
			}
		}		
		player.my = Math.floor(player.wy / MAP_ELEMENT_SIZE);
	}
	if(player.direction === 2) {	//down		
		if(player.my === (map.length - 1)) {		
			if(player.wy >= ((map.length * MAP_ELEMENT_SIZE) - (MAP_ELEMENT_SIZE / 2)) ) {
				player.wy = ((map.length * MAP_ELEMENT_SIZE) - (MAP_ELEMENT_SIZE / 2));
				player.uy = (GAME_DIV_HEIGHT - (MAP_ELEMENT_SIZE / 2));
				isCollision = true;
			}
		} else {
			var lbx = (player.wx - (MAP_ELEMENT_SIZE / 2)) + player.cbrdr;
			var lby = (player.wy + (MAP_ELEMENT_SIZE / 2)) - player.cbrdr;
			var rbx = (player.wx + (MAP_ELEMENT_SIZE / 2)) - player.cbrdr;
			var rby = (player.wy + (MAP_ELEMENT_SIZE / 2)) - player.cbrdr;
			if( (map[mat(lby)][mat(lbx)] != 0) || (map[mat(rby)][mat(rbx)] != 0) ) {
				player.wy -= player.speed;
				isCollision = true;
			}
		}		
		player.my = Math.floor(player.wy / MAP_ELEMENT_SIZE);
	}
	if(player.direction === 3) {	//left
		if(player.mx === 0) {
			if(player.wx <= (MAP_ELEMENT_SIZE / 2)) {
				player.wx = (MAP_ELEMENT_SIZE / 2);
				player.ux = (MAP_ELEMENT_SIZE / 2);
				isCollision = true;
			}
		} else {
			var ltx = (player.wx - (MAP_ELEMENT_SIZE / 2)) + player.cbrdr;
			var lty = (player.wy - (MAP_ELEMENT_SIZE / 2)) + player.cbrdr;
			var lbx = (player.wx - (MAP_ELEMENT_SIZE / 2)) + player.cbrdr;
			var lby = (player.wy + (MAP_ELEMENT_SIZE / 2)) - player.cbrdr;
			if( (map[mat(lty)][mat(ltx)] != 0) || (map[mat(lby)][mat(lbx)] != 0) ) {
				player.wx += player.speed;
				isCollision = true;
			}
		}
		player.mx = Math.floor(player.wx / MAP_ELEMENT_SIZE);
	}
	if(player.direction === 4) {	//right
		if(player.mx === (map[0].length - 1)) {
			if(player.wx >= ((map[0].length * MAP_ELEMENT_SIZE) - (MAP_ELEMENT_SIZE / 2)) ) {
				player.wx = ((map[0].length * MAP_ELEMENT_SIZE) - (MAP_ELEMENT_SIZE / 2));
				player.ux = (GAME_DIV_WIDTH - (MAP_ELEMENT_SIZE / 2));
				isCollision = true;
			}
		} else {
			var rtx = (player.wx + (MAP_ELEMENT_SIZE / 2)) - player.cbrdr;
			var rty = (player.wy - (MAP_ELEMENT_SIZE / 2)) + player.cbrdr;
			var rbx = (player.wx + (MAP_ELEMENT_SIZE / 2)) - player.cbrdr;
			var rby = (player.wy + (MAP_ELEMENT_SIZE / 2)) - player.cbrdr;
			if( (map[mat(rty)][mat(rtx)] != 0) || (map[mat(rby)][mat(rbx)] != 0) ) {
				player.wx -= player.speed;
				isCollision = true;
			}			
		}
		player.mx = Math.floor(player.wx / MAP_ELEMENT_SIZE);
	}
	if(isCollision) {
		player.state = 2;
	}
}

function mat(worldCoord) {
	return  Math.floor(worldCoord / MAP_ELEMENT_SIZE);
}

function scrollX() {
	//fixed or free unit canvas
	if(player.wx >= leftScrollBorder && player.wx <= rightScrollBorder) {
		player.ux = (GAME_CANVAS_WIDTH / 2);		
	} else {
		if(player.direction === 3) {		
			player.ux -= player.speed;
		}
		if(player.direction === 4) {		
			player.ux += player.speed;
		}
	}	
	//scrolling map in the scroll area
	if(player.wx > leftScrollBorder && player.wx < rightScrollBorder) {
		if(player.direction === 3) {		
			player.mapOffsetx -= player.speed;
		}
		if(player.direction === 4) {
			player.mapOffsetx += player.speed;
		}
	}
	//scrolling map on the border check
	if( (player.wx === leftScrollBorder && player.mapOffsetx === player.speed) || ((player.wx === rightScrollBorder) && ((rightScrollBorder - leftScrollBorder - player.mapOffsetx) === player.speed)) ) {
		if(player.direction === 3) {		
			player.mapOffsetx -= player.speed;
		}
		if(player.direction === 4) {
			player.mapOffsetx += player.speed;
		}
	}	
}

function scrollY() {	
	//fixed or free unit canvas
	if(player.wy >= topScrollBorder && player.wy <= bottomScrollBorder) {
		player.uy = (GAME_CANVAS_HEIGHT / 2);
	} else {
		if(player.direction === 1) {
			player.uy -= player.speed;
		}
		if(player.direction === 2) {
			player.uy += player.speed;
		}
	}
	//scrolling map in the scroll area
	if(player.wy > topScrollBorder && player.wy < bottomScrollBorder) {
		if(player.direction === 1) {
			player.mapOffsety -= player.speed;
		}
		if(player.direction === 2) {
			player.mapOffsety += player.speed;
		}
	}
	//scrolling map on the border check
	if( (player.wy === topScrollBorder && player.mapOffsety === player.speed) || ((player.wy === bottomScrollBorder) && ((bottomScrollBorder - topScrollBorder - player.mapOffsety) === player.speed)) ) {
		if(player.direction === 1) {
			player.mapOffsety -= player.speed;
		}
		if(player.direction === 2) {
			player.mapOffsety += player.speed;
		}
	}
}

function drawPlayer() {	
	clearPlayer();
	if(player.state === 1 || player.state === 2 || player.state === 3) {		//move and stop animation ???
		unitcanvasContext.drawImage(dummyPlayerImage, player.ux - (MAP_ELEMENT_SIZE / 2), player.uy - (MAP_ELEMENT_SIZE / 2), MAP_ELEMENT_SIZE, MAP_ELEMENT_SIZE);
		return;
	}
}

function clearPlayer() {
	unitcanvasContext.clearRect(0, 0, unitcanvas.width, unitCanvas.height);	
}

function drawMap(map, offsetX, offsetY) {
	var elementX = 0;
	var elementY = offsetY * (-1);
	mapCanvasContext.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
	for(var i = 0; i != map.length; i++) {
		elementX = offsetX * (-1);
		for(var	 j = 0; j != map[i].length; j++) {
			if(map[i][j] == 1) {
				mapCanvasContext.drawImage(dummyTileImage, elementX, elementY, MAP_ELEMENT_SIZE, MAP_ELEMENT_SIZE);
			}
			elementX += MAP_ELEMENT_SIZE;		
		}		
		elementY += MAP_ELEMENT_SIZE;
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
	initMap(tmap);	
	then =  Date.now();
	document.addEventListener("keydown", keyDownHandler, true);	
	mouseCanvas.addEventListener("mousedown", doMouseDown, false);		
	gameLoop();
};
