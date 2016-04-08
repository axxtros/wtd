/* player.js */

dummyPlayerImage = new Image;
dummyPlayerImage.onload = function(){  };
dummyPlayerImage.src = IMAGE_DIRECTORY + "player_tile_40x40_1.png";

function animatePlayer(player, map) {		

	if(player.state === 1) {			//keyboard control
				
		if(player.direction === 1) {	//up			
			player.wy -= player.speed;
			player.my = mat(player.wy);
		}
		if(player.direction === 2) {	//down					
			player.wy += player.speed;									
			player.my = mat(player.wy);
		}		
		if(player.direction === 3) {	//left						
			player.wx -= player.speed;			
			player.mx = mat(player.wx);
		}
		if(player.direction === 4) {	//right						
			player.wx += player.speed;			
			player.mx = mat(player.wx);
		}		
				
		//collisionDetectionPlayer(player, map);
		
		if(player.direction === 1 && player.state === 1) {	//up			
			scrollY(player);			
		}
		if(player.direction === 2 && player.state === 1) {	//down			
			scrollY(player);			
		}
		if(player.direction === 3 && player.state === 1) {	//left			
			scrollX(player);			
		}
		if(player.direction === 4 && player.state === 1) {	//right			
			scrollX(player);			
		}
		
		drawPlayer(player);
		drawMap(map, player.mapOffsetx, player.mapOffsety);
	}	
	
	if(player.state === 3) {			//mouse control
		//var wmx = player.mapOffsetx + canvasMousePosX;
		//var wmy = player.mapOffsety + canvasMousePosY;
	
		var distanceX = player.ux - canvasMousePosX;
		var distanceY = player.uy - canvasMousePosY;		
		
		if(distanceX !== 0 && distanceY !== 0) {			
			player.ux -= Math.round( ((player.ux - canvasMousePosX) / player.speed) );  
			player.uy -= Math.round( ((player.uy - canvasMousePosY) / player.speed) );  
		}
		drawPlayer(player);
		drawMap(map, player.mapOffsetx, player.mapOffsety);
	}
	
	//player.state = 2;
}

function collisionDetectionPlayer(player, map) {
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
		player.my = mat(player.wy);
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
		player.my = mat(player.wy);
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
		player.mx = mat(player.wx);
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
		player.mx = mat(player.wx);
	}
	if(isCollision) {
		player.state = 2;
	}
}

function scrollX(player) {
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

function scrollY(player) {	
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

function drawPlayer(player) {	
	unitcanvasContext.clearRect(0, 0, unitcanvas.width, unitCanvas.height);		//clear unit canvas
	if(player.state === 1 || player.state === 2 || player.state === 3) {		//move and stop animation ???
		unitcanvasContext.drawImage(dummyPlayerImage, player.ux - (MAP_ELEMENT_SIZE / 2), player.uy - (MAP_ELEMENT_SIZE / 2), MAP_ELEMENT_SIZE, MAP_ELEMENT_SIZE);
		return;
	}
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