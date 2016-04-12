/* missile.js */

dummyMissileImage = new Image;
dummyMissileImage.onload = function(){  };
dummyMissileImage.src = IMAGE_DIRECTORY + "missile_tile_40x5.png";

var NORMAL_ARROW = {
	name : "Normal arrow",
	hit : 10,
	speed : 5,
	cw : 4,
	ch : 20
};

var missle = {			
	id : 0,
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
	missile.id = Math.floor(Math.random() * 10) + 1;
	missile.wx = unit.wx;
	missile.wy = unit.wy;
	missile.ux = (unit.ux + unit.mapOffsetx);	//ez kell az eltolás miatt
	missile.uy = (unit.uy + unit.mapOffsety); 	//ez kell az eltolás miatt
	missile.mx = unit.mx;
	missile.my = unit.my;
	missile.mapOffsetx = unit.mapOffsetx;
	missile.mapOffsety = unit.mapOffsety;
	missile.direction = unit.direction;
	missile.state = 1;
	missile.speed = type.speed;	
	missile.cw = type.cw;
	missile.ch = type.ch;
	return missile;
}

function addNewMissileToActiveMisslesList(missle) {
	activeMissilesList.push(missle);
}

function animateMissiles(player, map) {
	missilecanvasContext.clearRect(0, 0, unitcanvas.width, unitCanvas.height);		//itt kell törölni, mert utána jöhet az összes kirajzolása
	for(var i = 0; i < activeMissilesList.length; i++) {
		if(activeMissilesList[i] != null && activeMissilesList[i].state === 3) {	//azokat a missile-eket töröljük az aktív listából, amelyek már megsemmisültek
			//removeMissileFromActiveMissilesList(i);
			//continue;
		}
		if(activeMissilesList[i] != null && activeMissilesList[i].state === 1) {
			animateMissile(player, activeMissilesList[i], map);			
		}				
	}	
}

function removeMissileFromActiveMissilesList(index) {
	activeMissilesList.splice(index, 1);		
}

function animateMissile(player, missile, map) {
	
	console.log("@axx missile id: " + missile.id);
	
	if(missile.state === 1) {		//move
		if(missile.direction === 1) {	//up
			missile.wy -= missile.speed;			
			missile.uy -= missile.speed;
			missile.mapOffsetx = player.mapOffsetx;
			missile.mapOffsety = player.mapOffsety;
			missile.my = mat(missle.wy);
		}
		if(missile.direction === 2) {	//down
			missile.wy += missile.speed;
			missile.uy += missile.speed;			
			missile.mapOffsetx = player.mapOffsetx;
			missile.mapOffsety = player.mapOffsety;
			missile.my = mat(missle.wy);
		}
		if(missile.direction === 3) {	//left
			missile.wx -= missile.speed;			
			missile.ux -= missile.speed;
			missile.mapOffsetx = player.mapOffsetx;
			missile.mapOffsety = player.mapOffsety;
			missile.mx = mat(missle.wx);
		}
		if(missile.direction === 4) {	//right
			missile.wx += missile.speed;			
			missile.ux += missile.speed;
			missile.mapOffsetx = player.mapOffsetx;
			missile.mapOffsety = player.mapOffsety;
			missile.mx = mat(missle.wx);
		}		
		collisionDetectionMissile(missile, map);
		drawMissile(player, missile);
	}
	if(missile.state === 2) {		//strike/destroy
		
		drawMissile(player, missile);
	}
	if(missile.state === 3) {		//delete
	
	}
}

function collisionDetectionMissile(missile, map) {
	
}

function drawMissile(player, missile) {		
	var drawmx = (missile.ux - missile.mapOffsetx);
	var drawmy = (missile.uy - missile.mapOffsety);
		
	if(missile.state === 1 || missile.state === 2) {
		missilecanvasContext.drawImage(dummyMissileImage, drawmx, drawmy, missile.ch, missile.cw);
	}
}
