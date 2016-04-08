//map, unit and missile animation calculations and draws

function animateMissile(missile) {
	if(missile.status === 1) {				//move
		if(missile.direction === 0) {		//up
			missile.y -= missile.speed;
		}
		if(missile.direction === 1) {		//down
			missile.y += missile.speed;
		}
		if(missile.direction === 2) {		//right
			missile.x += missile.speed;
		}
		if(missile.direction === 3) {		//left
			missile.x -= missile.speed;
		}		
		return;
	}	
}

function animateUnit(unit) {
	if(unit.state === 1) {			//move
		if(unit.direction === 0) {	//up
			unit.y -= unit.speed;			
			unit.wy -= unit.speed;			
		}
		if(unit.direction === 1) {	//down
			unit.y += unit.speed;
			unit.wy += unit.speed;
		}
		if(unit.direction === 2) {	//right
			unit.x += unit.speed;			
			unit.wx += unit.speed;			
		}
		if(unit.direction === 3) {	//left
			unit.x -= unit.speed;
			unit.wx -= unit.speed;
		}
		console.log('@axx init player start unit.x: ' + unit.x + ' start unit.y: ' + unit.y);
		console.log('@axx init player start unit.wx: ' + unit.wx + ' start unit.wy: ' + unit.wy);
		unit.movecurrentframe++;			
		if(unit.movecurrentframe === unit.maxmoveframe) {
			unit.movecurrentframe = 0;
		}		
		return;		
	}
	if(unit.state === 2) {			//fire
		unit.firecurrentframe++;				
		if(unit.firecurrentframe === unit.maxfireframe) {
			unit.firecurrentframe = 5;
			unit.state = 0;			//stop			
			var newMissile = createNewMissile();
			//attól függ, hogy merre áll az egység, úgy kell beállítani a nyíl kezdő pozicióját
			//a fix számok vizuálisan beállított viszonyszámok, amelyek segítségével "nagyjából" középen van a lövedék az egységhez képest
			if(unit.direction == 0) {	//up
				newMissile.x = unit.x + newMissile.drawtilelongersize; //30;
				newMissile.y = unit.y + newMissile.drawtilesmallersize; //5;
			}
			if(unit.direction == 1) {	//down
				newMissile.x = unit.x + newMissile.drawtilelongersize; //30;
				newMissile.y = unit.y + (newMissile.drawtilelongersize - newMissile.drawtilesmallersize); //25;
			}
			if(unit.direction == 2) {	//right
				newMissile.x = unit.x + (newMissile.drawtilelongersize - newMissile.drawtilesmallersize); //25;
				newMissile.y = unit.y + (newMissile.drawtilelongersize - newMissile.drawtilesmallersize); //30;
			}
			if(unit.direction == 3) {	//left
				newMissile.x = unit.x + newMissile.drawtilesmallersize; //5;
				newMissile.y = unit.y + newMissile.drawtilelongersize; //30;
			}
			newMissile.direction = unit.direction;
			newMissile.status = 1;
			addNewMissileToActiveMisslesList(newMissile);
		}			
		return;
	}
}

function createNewMissile() {
	var result;
	result = new Object();			
	result.type = arrow.type;			
	result.hit = arrow.hit;
	result.speed = arrow.speed;	
	result.image = arrow.image;	
	result.updrawtilex = arrow.updrawtilex;
	result.updrawtiley = arrow.updrawtiley;
	result.downdrawtilex = arrow.downdrawtilex;
	result.downdrawtiley = arrow.downdrawtiley;
	result.rightdrawtilex = arrow.rightdrawtilex;
	result.rightdrawtiley = arrow.rightdrawtiley;
	result.leftdrawtilex = arrow.leftdrawtilex;
	result.leftdrawtiley = arrow.leftdrawtiley;
	result.drawtilelongersize = arrow.drawtilelongersize;
	result.drawtilesmallersize = arrow.drawtilesmallersize;	
	return result;
}

function addNewMissileToActiveMisslesList(arrow) {
	activeMissilesList.push(arrow);
}

function removeMissileFromActiveMissilesList(index) {
	//console.log('deleted activeMissilesList length: ' + activeMissilesList.length);		
	clearMissile(activeMissilesList[index]);
	activeMissilesList.splice(index, 1);	
	//console.log('after deleted activeMissilesList length: ' + activeMissilesList.length);
}

function drawMissile(missile) {	
	if(missile.status === 1 || missile.status === 2) {		//move animation
		clearMissile(missile);
		//megsemmisilő image beállítása
		if(missile.direction === 0) {		//up
			missileCanvasContext.drawImage(missile.image, missile.updrawtilex, missile.updrawtiley, missile.drawtilesmallersize, missile.drawtilelongersize, missile.x, missile.y, missile.drawtilesmallersize, missile.drawtilelongersize);
			return;
		}
		if(missile.direction === 1) {		//down
			missileCanvasContext.drawImage(missile.image, missile.downdrawtilex, missile.downdrawtiley, missile.drawtilesmallersize, missile.drawtilelongersize, missile.xS, missile.y, missile.drawtilesmallersize, missile.drawtilelongersize);
			return;
		}
		if(missile.direction === 2) {		//right
			missileCanvasContext.drawImage(missile.image, missile.rightdrawtilex, missile.rightdrawtiley, missile.drawtilelongersize, missile.drawtilesmallersize, missile.x, missile.y, missile.drawtilelongersize, missile.drawtilesmallersize);
			return;
		}
		if(missile.direction === 3) {		//left
			missileCanvasContext.drawImage(missile.image, missile.leftdrawtilex, missile.leftdrawtiley, missile.drawtilelongersize, missile.drawtilesmallersize, missile.x, missile.y, missile.drawtilelongersize, missile.drawtilesmallersize);
			return;
		}		
	}	
}

function clearMissile(missile) {	
	if(missile.direction === 0) {		//up		
		missileCanvasContext.clearRect(missile.x, missile.y, missile.drawtilesmallersize, missile.drawtilelongersize + missile.speed);
		if(missile.status === 2) {	//hogy az igazított helyen is törölje a lövedéket
			missileCanvasContext.clearRect(missile.x, missile.y, missile.drawtilesmallersize, missile.drawtilelongersize);
		}
		return;
	}
	if(missile.direction === 1) {		//down		
		missileCanvasContext.clearRect(missile.x, missile.y- missile.speed, missile.drawtilesmallersize, missile.drawtilelongersize);				
		if(missile.status === 2) {	//hogy az igazított helyen is törölje a lövedéket
			missileCanvasContext.clearRect(missile.x, missile.y, missile.drawtilesmallersize, missile.drawtilelongersize);
		}
		return;
	}
	if(missile.direction === 2) {		//right
		missileCanvasContext.clearRect(missile.x - missile.speed, missile.y, missile.drawtilelongersize, missile.drawtilesmallersize);
		if(missile.status === 2) {	//hogy az igazított helyen is törölje a lövedéket
			missileCanvasContext.clearRect(missile.x, missile.y, missile.drawtilelongersize, missile.drawtilesmallersize);
		}
		return;
	}
	if(missile.direction === 3) {		//left
		missileCanvasContext.clearRect(missile.x, missile.y, missile.drawtilelongersize + missile.speed, missile.drawtilesmallersize);
		if(missile.status === 2) {	//hogy az igazított helyen is törölje a lövedéket
			missileCanvasContext.clearRect(missile.x, missile.y, missile.drawtilelongersize, missile.drawtilesmallersize);
		}
		return;
	}
}

function drawUnit(unit) {	
	clearUnit(unit);	
	if(unit.state == 0) {		//stop animation		
		unitCanvasContext.drawImage(unit.image, unit.drawtilesize * unit.direction, 0, unit.drawtilesize, unit.drawtilesize, unit.x, unit.y, unit.drawtilesize, unit.drawtilesize);
		return;
	}
	if(unit.state === 1) {		//move animation
		unitCanvasContext.drawImage(unit.image, unit.drawtilesize * unit.direction, unit.movecurrentframe * unit.drawtilesize, unit.drawtilesize, unit.drawtilesize, unit.x, unit.y, unit.drawtilesize, unit.drawtilesize);		
		return;
	}
	if(unit.state === 2) {		//fire animation		
		unitCanvasContext.drawImage(unit.image, unit.drawtilesize * unit.direction, unit.firecurrentframe * unit.drawtilesize, unit.drawtilesize, unit.drawtilesize, unit.x, unit.y, unit.drawtilesize, unit.drawtilesize);
		return;
	}
}

function clearUnit(unit) {	
	if(unit.direction === 0) {	//up
		unitCanvasContext.clearRect(unit.x, unit.y, unit.drawtilesize, unit.drawtilesize + unit.speed);
		return;
	}
	if(unit.direction === 1) {	//down
		unitCanvasContext.clearRect(unit.x, unit.y - unit.speed, unit.drawtilesize, unit.drawtilesize);
		return;
	}
	if(unit.direction === 2) {	//right
		unitCanvasContext.clearRect(unit.x - unit.speed, unit.y, unit.drawtilesize, unit.drawtilesize);
		return;
	}
	if(unit.direction === 3) {	//left
		unitCanvasContext.clearRect(unit.x, unit.y, unit.drawtilesize + unit.speed, unit.drawtilesize);
		return;
	}
}

function initPlayerView(map, unit) {
	for(var i = 0; i != map.length; i++) {
		for(var	 j = 0; j != map[i].length; j++) {
			if(map[i][j] == 2) {
				mapOffsetX = (j * MAP_ELEMENT_SIZE) - (j != 0 ? unit.difftileborder : 0) + (unit.collisionarea / 2);
				mapOffsetY = (i * MAP_ELEMENT_SIZE) - (i != 0 ? unit.difftileborder : 0) + (unit.collisionarea / 2);
				initMapOffsets(map, unit);
				return;
			}
		}
	}	
}

function initMapOffsets(map, unit) {	
	if(mapOffsetX < (GAME_DIV_WIDTH / 2)) {
		mapOffsetX = 0;		
	} else if(mapOffsetX > ((map[0].length * MAP_ELEMENT_SIZE) - (GAME_DIV_WIDTH / 2))) {
		mapOffsetX = ((map[0].length * MAP_ELEMENT_SIZE) - GAME_DIV_WIDTH);
	} else {
		mapOffsetX = ((mapOffsetX - (GAME_DIV_WIDTH / 2)) + (MAP_ELEMENT_SIZE / 2));		
	}
	if(mapOffsetY < (GAME_DIV_HEIGHT / 2)) {		
		mapOffsetY = 0;
	} else if(mapOffsetY > ((map.length * MAP_ELEMENT_SIZE) - (GAME_DIV_HEIGHT / 2))) {		
		mapOffsetY = ((map.length * MAP_ELEMENT_SIZE) - GAME_DIV_HEIGHT);
	} else {
		mapOffsetY = ((mapOffsetY - (GAME_DIV_HEIGHT / 2)) + (MAP_ELEMENT_SIZE / 2));		
	}	
	console.log('@axx init mapOffsetX: ' + mapOffsetX + ' mapOffsetY: ' + mapOffsetY);
}

function scrollMap(map, unit) {
	if(unit.state === 1) {		
		if(unit.direction === 0) {	//up
			mapOffsetY -= unit.speed;
		}
		if(unit.direction === 1) {	//down
			mapOffsetY += unit.speed;
		}
		if(unit.direction === 2) {	//right
			mapOffsetX += unit.speed;
		}
		if(unit.direction === 3) {	//left
			mapOffsetX -= unit.speed;
		}		
		offsetsBorderCorrection(map, unit);
		initMapWithUnits(map, unit);
	}	
}

function isNeedScrollY() {
	
	return true;
}

//Hogy a map scroll csak a map határáig történjen, tovább ne fusson.
function offsetsBorderCorrection(map, unit) {	
	if(mapOffsetX < 0) {
		mapOffsetX = 0;
		mapIsNeedScrollX = false;
	} else if(mapOffsetX > ((map[0].length * MAP_ELEMENT_SIZE) - GAME_DIV_WIDTH)) {
		mapOffsetX = ((map[0].length * MAP_ELEMENT_SIZE) - GAME_DIV_WIDTH);		
	}	
	if(mapOffsetY < 0) {
		mapOffsetY = 0;				
	} else if(mapOffsetY > ((map.length * MAP_ELEMENT_SIZE) - GAME_DIV_HEIGHT)) {
		mapOffsetY = ((map.length * MAP_ELEMENT_SIZE) - GAME_DIV_HEIGHT);		
	}	
}

function initMapWithUnits(map, unit) {
	var elementX = 0;
	var elementY = mapOffsetY * (-1);
	mapCanvasContext.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
	for(var i = 0; i != map.length; i++) {
		elementX = mapOffsetX * (-1);
		for(var	 j = 0; j != map[i].length; j++) {
			if(map[i][j] == 1) {
				mapCanvasContext.drawImage(dummyTileImage, elementX, elementY, MAP_ELEMENT_SIZE, MAP_ELEMENT_SIZE);				
			}
			if(map[i][j] == 2) {
				map[i][j] = 0;								//hogy utána már üres mező legyen, és leheesen oda lépni				
				var correctionSize = ((unit.drawtilesize - MAP_ELEMENT_SIZE) / 2);				
				unit.x = (elementX - correctionSize); //korrekció, hogy pontosan egy MAP_ELEMENT_SIZE-on belül jelenjen meg (de ez nem jó így a map scrollozás miatt)
				unit.y = (elementY - correctionSize);
				unit.wx = (j * MAP_ELEMENT_SIZE) - ((unit.drawtilesize - MAP_ELEMENT_SIZE) / 2);
				unit.wy = (i * MAP_ELEMENT_SIZE) - ((unit.drawtilesize - MAP_ELEMENT_SIZE) / 2);
				//console.log('@axx init player start unit.x: ' + unit.x + ' start unit.y: ' + unit.y + ' elementX: ' + elementX + ' elementY: ' + elementY + ' diffborder: ' + unit.difftileborder);
				console.log('@axx init player start unit.x: ' + unit.x + ' start unit.y: ' + unit.y);
				console.log('@axx init player start unit.wx: ' + unit.wx + ' start unit.wy: ' + unit.wy);
			}
			elementX += MAP_ELEMENT_SIZE;
		}
		elementY += MAP_ELEMENT_SIZE;		
	}	
}

//egység ütközésvizsgálata falakkal és a térkép szélekkel
function unitCollisionDetect(unit, map) {	
	if(unit.state === 1) {
		if(unit.direction === 0) {	//up
			var leftTopMapElementX = Math.floor((unit.x + (mapOffsetX) + unit.difftileborder) / MAP_ELEMENT_SIZE);
			var leftTopMapElementY = Math.floor((unit.y + (mapOffsetY) + unit.difftileborder) / MAP_ELEMENT_SIZE);
			var rightTopMapElementX = Math.floor((unit.x + (mapOffsetX) + (unit.drawtilesize - unit.difftileborder)) / MAP_ELEMENT_SIZE);
			var rightTopMapElementY = Math.floor((unit.y + (mapOffsetY) + unit.difftileborder) / MAP_ELEMENT_SIZE);						
			if(leftTopMapElementY < 0 || (map[leftTopMapElementY][leftTopMapElementX] != 0) || (map[rightTopMapElementY][rightTopMapElementX] != 0)) {			
				unit.state = 0;
				unit.y += unit.speed;
				unit.wy += unit.speed;
			}
			return;
		}
		if(unit.direction === 1) {	//down			
			var leftBottomMapElementX = Math.floor((unit.x + (mapOffsetX) + unit.difftileborder) / MAP_ELEMENT_SIZE);
			var leftBottomMapElementY = Math.floor((unit.y + (mapOffsetY) + (unit.drawtilesize - unit.difftileborder)) / MAP_ELEMENT_SIZE);
			var rightBottomMapElementX = Math.floor((unit.x + (mapOffsetX) + (unit.drawtilesize - unit.difftileborder)) / MAP_ELEMENT_SIZE);
			var rightBottomMapElementY = Math.floor((unit.y + (mapOffsetY) + (unit.drawtilesize - unit.difftileborder)) / MAP_ELEMENT_SIZE);			
			if(leftBottomMapElementY >= map.length || (map[leftBottomMapElementY][leftBottomMapElementX] != 0) || (map[rightBottomMapElementY][rightBottomMapElementX] != 0)) {				
				unit.state = 0;
				unit.y -= unit.speed;
				unit.wy -= unit.speed;
			}			
			return;
		}
		if(unit.direction === 2) {	//right
			var rightTopMapElementX = Math.floor((unit.x + (mapOffsetX) + (unit.drawtilesize - unit.difftileborder)) / MAP_ELEMENT_SIZE);
			var rightTopMapElementY = Math.floor((unit.y + (mapOffsetY) + unit.difftileborder) / MAP_ELEMENT_SIZE);		
			var rightBottomMapElementX = Math.floor((unit.x + (mapOffsetX) + (unit.drawtilesize - unit.difftileborder)) / MAP_ELEMENT_SIZE);
			var rightBottomMapElementY = Math.floor((unit.y + (mapOffsetY) + (unit.drawtilesize - unit.difftileborder)) / MAP_ELEMENT_SIZE);		
			if((map[rightTopMapElementY][rightTopMapElementX] != 0) || (map[rightBottomMapElementY][rightBottomMapElementX] != 0)) {
				unit.state = 0;
				unit.x -= unit.speed;
				unit.wx -= unit.speed;
			}
			return;
		}
		if(unit.direction === 3) {	//left
			var leftTopMapElementX = Math.floor((unit.x + (mapOffsetX) + unit.difftileborder) / MAP_ELEMENT_SIZE);
			var leftTopMapElementY = Math.floor((unit.y + (mapOffsetY) + unit.difftileborder) / MAP_ELEMENT_SIZE);
			var leftBottomMapElementX = Math.floor((unit.x + (mapOffsetX) + unit.difftileborder) / MAP_ELEMENT_SIZE);
			var leftBottomMapElementY = Math.floor((unit.y + (mapOffsetY) + (unit.drawtilesize - unit.difftileborder)) / MAP_ELEMENT_SIZE);			
			if((map[leftTopMapElementY][leftTopMapElementX] != 0) || (map[leftBottomMapElementY][leftBottomMapElementX] != 0)) {
				unit.state = 0;
				unit.x += unit.speed;				
				unit.wx += unit.speed;				
			}
			return;
		}	
	}	
}

//lövedék ütközésvizsgálata fallal és a térkép szélekkel
function missileCollisionDetect(missile, map) {
	if(missile.status === 1) {			//move
		if(missile.direction === 0) {	//up		
			var leftTopMapElementX = Math.floor((missile.x + (mapOffsetX) + (Math.floor(missile.drawtilesmallersize / 2))) / MAP_ELEMENT_SIZE);	//pontosan a hegye van vizsgálva
			var leftTopMapElementY = Math.floor((missile.y + (mapOffsetY)) / MAP_ELEMENT_SIZE);
			if(leftTopMapElementY < 0 || map[leftTopMapElementY][leftTopMapElementX] != 0) {
				missile.y = ((leftTopMapElementY + 1) * MAP_ELEMENT_SIZE);	//+1 mert egy falnyit igazítani kell
				missile.status = 2;
			}
			return;
		}
		if(missile.direction === 1) {	//down
			var leftTopMapElementX = Math.floor((missile.x + (mapOffsetX) + (Math.floor(missile.drawtilesmallersize / 2))) / MAP_ELEMENT_SIZE);	//pontosan a hegye van vizsgálva
			var leftTopMapElementY = Math.floor((missile.y + (mapOffsetY) + (Math.floor(missile.drawtilelongersize))) / MAP_ELEMENT_SIZE);
			if(leftTopMapElementY >= map.length || map[leftTopMapElementY][leftTopMapElementX] != 0) {			
				missile.y = ((leftTopMapElementY) * MAP_ELEMENT_SIZE) -	missile.drawtilelongersize;				
				missile.status = 2;
			}		
			return;
		}
		if(missile.direction === 2) {	//right
			var leftTopMapElementX = Math.floor((missile.x + (mapOffsetX) + Math.floor(missile.drawtilelongersize)) / MAP_ELEMENT_SIZE);
			var leftTopMapElementY = Math.floor((missile.y + (mapOffsetY) + (Math.floor(missile.drawtilesmallersize / 2))) / MAP_ELEMENT_SIZE);
			if(leftTopMapElementX >= map[0].length || map[leftTopMapElementY][leftTopMapElementX] != 0) {
				missile.x = ((leftTopMapElementX) * MAP_ELEMENT_SIZE) - missile.drawtilelongersize;
				missile.status = 2;
			}
			return;
		}
		if(missile.direction === 3) {	//left
			var leftTopMapElementX = Math.floor((missile.x + (mapOffsetX)) / MAP_ELEMENT_SIZE);
			var leftTopMapElementY = Math.floor((missile.y + (mapOffsetY) + (Math.floor(missile.drawtilesmallersize / 2))) / MAP_ELEMENT_SIZE);
			if(leftTopMapElementX < 0 || map[leftTopMapElementY][leftTopMapElementX] != 0) {
				missile.x = ((leftTopMapElementX + 1) * MAP_ELEMENT_SIZE);
				missile.status = 2;
			}
			return;
		}
	}	
}