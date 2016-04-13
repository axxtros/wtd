/* missile.js */

dummyMissileImage = new Image;
dummyMissileImage.onload = function(){  };
dummyMissileImage.src = IMAGE_DIRECTORY + "missile_tile_20x20_1.png";

var NORMAL_ARROW = {
	name : "Normal arrow",
	hit : 10,
	speed : 5,
	cw : 20,
	ch : 20
};

var missle = {
	wx : 0,			//world x coordinate
	wy : 0,			//world y coordinate
	ux : 0,			//missile canvas x coordinate
	uy : 0,			//missile canvas y coordinate
	mx : 0,			//map matrix x coordinate
	my : 0,			//map matrix y coordinate
	mapOffsetx : 0,	//map offset x axis
	mapOffsety : 0,	//map offset y axis
	direction : 0,	//1-up, 2-down, 3-left, 4-right
	speed : 0,		//missile speed
	state : 0,		//1-move, 2-destroy, 3-deleted
	cw : 0,			//missile collision width
	ch : 0			//missile collision height
};

var activeMissilesList = new Array();

function shotNewMissile(unit, type) {
	var newMissile = createNewMissile(unit, type);
	addNewMissileToActiveMisslesList(newMissile);
}

function createNewMissile(unit, type) {
	missile = new Object();	
	missile.wx = unit.wx;
	missile.wy = unit.wy;
	missile.ux = (unit.ux + unit.mapOffsetx) - (MAP_ELEMENT_SIZE / 4);
	missile.uy = (unit.uy + unit.mapOffsety) - (MAP_ELEMENT_SIZE / 4);	
	missile.mx = mat(missile.wx);
	missile.my = mat(missile.wy);
	missile.mapOffsetx = unit.mapOffsetx;
	missile.mapOffsety = unit.mapOffsety;
	missile.direction = unit.direction;
	missile.state = 1;
	missile.speed = type.speed;	
	missile.cw = type.cw;
	missile.ch = type.ch;	
	return missile;
}

function addNewMissileToActiveMisslesList(missile) {
	activeMissilesList.push(missile);
}

function animateMissiles(player, map) {
	if(activeMissilesList.length > 0) {
		missilecanvasContext.clearRect(0, 0, unitcanvas.width, unitCanvas.height);		//itt kell törölni, mert utána jöhet az összes kirajzolása
		for(var i = 0; i < activeMissilesList.length; i++) {		
			if(activeMissilesList[i] != null && (activeMissilesList[i].state === 1 || activeMissilesList[i].state === 2)) {	//lövedékek mozgatása
				animateMissile(player, activeMissilesList[i], map);			
			}				
			if(activeMissilesList[i] != null && activeMissilesList[i].state === 3) {	//azokat a missile-eket töröljük az aktív listából, amelyek már megsemmisültek
				removeMissileFromActiveMissilesList(i);			
			}
		}
	}	
}

function animateMissile(player, missile, map) {	
	if(missile.state === 1) {		//move
		if(missile.direction === 1) {	//up
			missile.wy -= missile.speed;
			missile.my = mat(missile.wy);
		}
		if(missile.direction === 2) {	//down
			missile.wy += missile.speed;
			missile.my = mat(missile.wy);
		}
		if(missile.direction === 3) {	//left
			missile.wx -= missile.speed;						
			missile.mx = mat(missile.wx);
		}
		if(missile.direction === 4) {	//right
			missile.wx += missile.speed;						
			missile.mx = mat(missile.wx);
		}		
		
		drawMissile(player, missile);		
		
		if(missile.direction === 1 && missile.state === 1) {	//up
			missile.uy -= missile.speed;
			missile.mapOffsetx = player.mapOffsetx;
			missile.mapOffsety = player.mapOffsety;
		}
		if(missile.direction === 2 && missile.state === 1) {	//down
			missile.uy += missile.speed;			
			missile.mapOffsetx = player.mapOffsetx;
			missile.mapOffsety = player.mapOffsety;
		}
		if(missile.direction === 3 && missile.state === 1) {	//left
			missile.ux -= missile.speed;
			missile.mapOffsetx = player.mapOffsetx;
			missile.mapOffsety = player.mapOffsety;
		}
		if(missile.direction === 4 && missile.state === 1) {	//right
			missile.ux += missile.speed;
			missile.mapOffsetx = player.mapOffsetx;
			missile.mapOffsety = player.mapOffsety;
		}				
		collisionDetectionMissile(missile, map);
	}
	if(missile.state === 2) {		//strike/destroy
		missile.mapOffsetx = player.mapOffsetx;
		missile.mapOffsety = player.mapOffsety;
		//destroy animation on...
		drawMissile(player, missile);
	}
	if(missile.state === 3) {		//delete
	
	}
}

function collisionDetectionMissile(missile, map) {
	var isCollision = false;	
	if(missile.direction === 1) {	//up
		if(missile.my === 0) {
			if(missile.wy <= 0) {
				isCollision = true;
			}
		}
	}
	if(missile.direction === 2) {	//down
		if(missile.my === map.length) {
			if(missile.wy >= (map.length * MAP_ELEMENT_SIZE)) {
				isCollision = true;
			}
		}
	}
	if(missile.direction === 3) {	//left		
		if(missile.mx === 0) {
			if(missile.wx <= 0) {
				isCollision = true;
			}
		}
	}
	if(missile.direction === 4) {	//right		
		if(missile.mx === map[0].length) {			
			if(missile.wx >= (map[0].length * MAP_ELEMENT_SIZE)) {				
				isCollision = true;
			}
		}
	}
	
	if(!isCollision && map[missile.my][missile.mx] !== 0) {	//walls, units, etc. collisions
		isCollision = true;
	}
	
	if(isCollision) {
		missile.state = 2;
	}
}

function removeMissileFromActiveMissilesList(index) {
	activeMissilesList.splice(index, 1);		
}

function drawMissile(player, missile) {		
	var drawmx = (missile.ux - missile.mapOffsetx);
	var drawmy = (missile.uy - missile.mapOffsety);
	if(missile.state === 1 || missile.state === 2) {
		missilecanvasContext.drawImage(dummyMissileImage, drawmx, drawmy, missile.ch, missile.cw);
	}
}
