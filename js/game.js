//game engine

function keyDownHandler(event) {	
	if (event.keyCode == 38) {	//up
		player.direction = 0;
		player.state = 1;		
	}
	if (event.keyCode == 40) {	//down	
		player.direction = 1;
		player.state = 1;		
	}
	if (event.keyCode == 37) {	//left
		player.direction = 3;
		player.state = 1;
	}
	if (event.keyCode == 39) {	//right		
		player.direction = 2;
		player.state = 1;
	}
	if (event.keyCode == 32) {	//space - fire
		player.state = 2;
	}
}

function initMap() {
	try {	
		mapOffsetX = 0;
		mapOffsetY = 0;		
		initPlayerView(tmap, player);		
	
		mapDrawWidth = GAME_DIV_WIDTH / MAP_ELEMENT_SIZE;
		mapDrawHeight = GAME_DIV_HEIGHT / MAP_ELEMENT_SIZE;
		
		initMapWithUnits(tmap, player);	
		
	}
	catch(err) {
		console.log("ERROR : mapDrawWidth or mapDrawHeight calculation is not integral");
	}		
}

//http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
function gameLoop() {	
	requestAnimationFrame(gameLoop);
		
	if(DEV_CANVAS_ENABLED) {
		devOps();
	}	
	
	now = Date.now();
    delta = now - then;
	//game speed loop
	if (delta > interval) {
		missilesAnimateAndDraw();		
		unitsAnimateAndDraw();	
		scrollMap(tmap, player);		
		then = now - (delta % interval);
	}	
}

function missilesAnimateAndDraw() {	
	for(i = 0; i < activeMissilesList.length; i++) {
		if(activeMissilesList[i] != null && activeMissilesList[i].status === 2) {	//azokat a missile-eket töröljük az aktív listából, amelyek már megsemmisültek
			removeMissileFromActiveMissilesList(i);
			continue;
		}
		if(activeMissilesList[i] != null && activeMissilesList[i].status === 1) {
			animateMissile(activeMissilesList[i]);
			missileCollisionDetect(activeMissilesList[i], tmap);			
			drawMissile(activeMissilesList[i]);			
		}				
	}		
}

function unitsAnimateAndDraw() {		
	animateUnit(player);			
	unitCollisionDetect(player, tmap);	
	drawUnit(player);	
}

function devOps() {
	devCanvasContext.clearRect(0, 0, devCanvas.width, devCanvas.height);
	fpsCalculation();
	drawHelperLines();
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
			
	devCanvasContext.font = "bold 12px courier";
	devCanvasContext.fillText('fps:' + Math.floor(_fps), 2, 10);		
}

function drawHelperLines() {
	devCanvasContext.moveTo((GAME_DIV_WIDTH / 2), 0);
	devCanvasContext.lineTo((GAME_DIV_WIDTH / 2), (GAME_DIV_HEIGHT));	
	devCanvasContext.moveTo(0, (GAME_DIV_HEIGHT / 2));
	devCanvasContext.lineTo((GAME_DIV_WIDTH), (GAME_DIV_HEIGHT / 2));	
	devCanvasContext.stroke();
	
	devCanvasContext.moveTo(player.x, player.y);
	devCanvasContext.lineTo(player.x + player.drawtilesize, player.y);
	devCanvasContext.lineTo(player.x + player.drawtilesize, player.y + player.drawtilesize);
	devCanvasContext.lineTo(player.x, player.y + player.drawtilesize);
	devCanvasContext.lineTo(player.x, player.y);
	
}

function gameStart() {
	document.addEventListener("keydown",keyDownHandler, true);
	initMap();
	then =  Date.now();
	gameLoop();
	//requestAnimationFrame(gameLoop);
}
