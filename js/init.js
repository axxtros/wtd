//initializations

var PROGRAM_VERISON = 'v.' + 0.1001
var IMAGE_DIRECTORY = 'img/';
var BODY_WIDTH = 1000;							//1000

var FULL_SCREEN_ENABLED = false;

var GAME_DIV_WIDTH = 1000;						//800
var GAME_DIV_HEIGHT = 400;						//400

var HALF_GAME_DIV_WIDTH = (GAME_DIV_WIDTH / 2);
var HALF_GAME_DIV_HEIGHT = (GAME_DIV_HEIGHT / 2);

var GAME_CANVAS_WIDTH = 800;					//800
var GAME_CANVAS_HEIGHT = 500;					//400

var BODY_BORDER_VISIBILITY = false;				//grey
var GAME_DIV_BORDER_VISIBILITY = true;			//orange
var MAP_CANVAS_BORDER_VISIBILITY = false;		//green
var UNIT_CANVAS_BORDER_VISIBILITY = false;		//blue
var MISSILE_CANVAS_BORDER_VISIBILITY = false;	//red

var DEV_CANVAS_ENABLED = true;

var GAME_SPEED_INDEX = 18;
var MAP_ELEMENT_SIZE = 40;		//egy térkép elem mérete (minimum: 32x32) [40]

var fps = GAME_SPEED_INDEX;
var now;
var then;
var interval = 1000 / fps;
var delta;
var lastCalledTime;

var mapCanvas;
var unitCanvas;
var missileCanvas;
var devCanvas;
var mapCanvasContext;
var unitCanvasContext;
var missileCanvasContext;
var devCanvasContext;

//var mapURL;
//var cameraOffsetX = 0;
//var cameraOffsetY = 0;

var player = {
	name : "",
	hp : 0,
	speed : 0,
	x : 0,
	y : 0,
	cx : 0,
	cy : 0,
	drawX : 0,				//ide van kirajzolva az egység a saját layer-én
	drawY : 0,				
	movecurrentframe : 0,
	firecurrentframe : 0,
	deathcurrentframe : 0,
	maxmoveframe : 0,
	maxfireframe : 0,
	maxdeathframe : 0,
	collisionarea : 0,
	direction : 0,			//0-up, 1-down, 2-right, 3-left
	state : 0,				//0-stop, 1-move, 2-fire, 3-death
	firerate : 0,
	fireratecounter : 0,
	imagetilesrc : "",
	image : "",	
	scrollingmap : 0,		//szükséges-e mozgatni a saját layere-n belül, vagy sem, amikor van map scrolling 0-nem, 1-igen
	fixedX : 0,				//x tengely szerint középre van-e igazítva a játékos
	fixedY : 0,				//y tengely szerint középre van-e igazítva a játékos
	drawtilesize : 0,
	collisiontilesize : 0,
	difftileborder : 0
};

var arrow = {
	type: "",
	hit: "",
	speed : 0,
	status : 0,				//0-deletable, 1-move, 2-destroy(impact to wall or damage unit animation), 3-clear from canvas
	x : 0,
	y : 0,
	direction : 0,
	imagetilesrc : "",
	image : "",	
	updrawtilex : 0,		//felfelé álló nyíl X kép koordinátája (ahhonét elkezdi kiolvasni a teljes tile-ból a lövedék képét)
	updrawtiley : 0,		//felfelé álló nyíl Y kép koordinátája
	downdrawtilex : 0,
	downdrawtiley : 0,		
	rightdrawtilex : 0,
	rightdrawtiley : 0,		
	leftdrawtilex : 0,
	leftdrawtiley : 0,		
	drawtilelongersize : 0,		//a egyik hosszabbik mérete (hossza)
	drawtilesmallersize : 0		//a nyíl rövidebb mérete (hossza)
};

var activeMissilesList = new Array();	//az éppen kilővés és mozgás alatt lévő lövedékek listája, amelyeket akutálisan a motor animál és kirajzol

var soundEfx = document.getElementById("soundEfx");
var song = document.getElementById("song");

function setGameElementsLocation() {
	var versionText = document.getElementById("version");
	versionText.value = PROGRAM_VERISON;

	var bodyElement = document.getElementsByTagName("body")[0];
	if(bodyElement != null) {
		if(FULL_SCREEN_ENABLED) {
			bodyElement.style.width = '100%';
			bodyElement.style.height = '100%';
		} else {
			bodyElement.style.width = BODY_WIDTH + 'px';
			//bodyElement.style.minHeight = GAME_CANVAS_HEIGHT; //ezért szól a browser
			if(BODY_BORDER_VISIBILITY) {
				bodyElement.style.border = '1px solid grey';
			} else {
				bodyElement.style.border = 'none';
			}
		}		
	} else {
		console.log('Error: body is null!');
	}
	var gamediv = document.getElementById('gamediv');
	if(gamediv != null) {
		if(FULL_SCREEN_ENABLED) {
			gamediv.style.width = '100%';
			gamediv.style.height = '100%';
		} else {
			gamediv.style.width = GAME_DIV_WIDTH + 'px';
			gamediv.style.height = GAME_DIV_HEIGHT + 'px';
		}		
		if(GAME_DIV_BORDER_VISIBILITY && !FULL_SCREEN_ENABLED) {
			gamediv.style.border = '1px solid orange';
		} else {
			gamediv.style.border = 'none';
		}
		var gameDivRect = gamediv.getBoundingClientRect();
		var gamedivTop = gameDivRect.top;
		var gamedivLeft = gameDivRect.left;		
		GAME_CANVAS_WIDTH = GAME_DIV_WIDTH;
		GAME_CANVAS_HEIGHT = GAME_DIV_HEIGHT;
		mapCanvas = document.getElementById('mapcanvas');
		if(mapCanvas != null) {
			if(FULL_SCREEN_ENABLED) {
				setFullScreenCanvas(mapCanvas);
			} else {
				mapCanvas.style.top = gamedivTop + 'px';
				mapCanvas.style.left = gamedivLeft + 'px';
				mapCanvas.style.width = GAME_CANVAS_WIDTH + 'px';
				mapCanvas.style.height = GAME_CANVAS_HEIGHT + 'px';
			}			
			if(MAP_CANVAS_BORDER_VISIBILITY) {
				mapCanvas.style.border = '1px solid green';
			} else {
				mapCanvas.style.border = 'none';
			}
		} else {
			console.log('Error: mapcanvas element is null!');
		}
		
		unitCanvas = document.getElementById('unitcanvas');
		if(unitCanvas != null) {
			if(FULL_SCREEN_ENABLED) {
				setFullScreenCanvas(unitCanvas);
			} else {
				unitCanvas.style.top = gamedivTop + 'px';
				unitCanvas.style.left = gamedivLeft + 'px';
				unitCanvas.style.width = GAME_CANVAS_WIDTH + 'px';
				unitCanvas.style.height = GAME_CANVAS_HEIGHT + 'px';			
			}
			if(UNIT_CANVAS_BORDER_VISIBILITY) {
				unitCanvas.style.border = '1px solid blue';
			} else {
				unitCanvas.style.border = 'none';
			}
		} else {
			console.log('Error: unitcanvas element is null!');
		}
		missileCanvas = document.getElementById('missilecanvas');
		if(missileCanvas != null) {		
			if(FULL_SCREEN_ENABLED) {
				setFullScreenCanvas(missileCanvas);
			} else {
				missileCanvas.style.top = gamedivTop + 'px';
				missileCanvas.style.left = gamedivLeft + 'px';
				missileCanvas.style.width = GAME_CANVAS_WIDTH + 'px';
				missileCanvas.style.height = GAME_CANVAS_HEIGHT + 'px';	
			}
			if(MISSILE_CANVAS_BORDER_VISIBILITY) {
				missileCanvas.style.border = '1px solid red';
			} else {
				missileCanvas.style.border = 'none';
			}
		} else {
			console.log('Error: missilecanvas element is null!');
		}
		devCanvas = document.getElementById('devcanvas');
		if(DEV_CANVAS_ENABLED) {
			initDevCanvas(gamedivTop, gamedivLeft);
		} else {
			//devCanvas.style.display = 'none';
			//devCanvas.style.visibility = "hidden";
			$('devcanvas').remove();
		}		
	} else {
		console.log('Error: gamediv element is null!');
	}	
}

function initDevCanvas(gamedivTop, gamedivLeft) {	
	if(devCanvas != null) {
		if(FULL_SCREEN_ENABLED) {
			setFullScreenCanvas(devCanvas);
		} else {
			devCanvas.style.top = gamedivTop + 'px';
			devCanvas.style.left = gamedivLeft + 'px';
			devCanvas.style.width = GAME_CANVAS_WIDTH + 'px';
			devCanvas.style.height = GAME_CANVAS_HEIGHT + 'px';
			devCanvas.style.border = 'none';
		}
	}
	if(devCanvas == null)
		console.log('Error: devCanvas is null!');
	else {
		devCanvasContext = missileCanvas.getContext('2d');
		devCanvasContext.canvas.width  = GAME_CANVAS_WIDTH;
		devCanvasContext.canvas.height = GAME_CANVAS_HEIGHT;
		devCanvasContext.scale(1, 1);		
	}
	if(devCanvasContext == null)
		console.log('Error: devCanvasContext is null!');	
}

function initGameCanvasContexts() {	
	if(mapCanvas == null)
		console.log('Error: mapCanvas is null!');
	else {
		mapCanvasContext = mapCanvas.getContext('2d');	
		mapCanvasContext.canvas.width  = GAME_CANVAS_WIDTH;
		mapCanvasContext.canvas.height = GAME_CANVAS_HEIGHT;
		mapCanvasContext.scale(1, 1);
	}		
	if(unitCanvas == null)
		console.log('Error: unitCanvas is null!');
	else {
		unitCanvasContext = unitCanvas.getContext('2d');
		unitCanvasContext.canvas.width  = GAME_CANVAS_WIDTH;
		unitCanvasContext.canvas.height = GAME_CANVAS_HEIGHT;
		unitCanvasContext.scale(1, 1);
	}		
	if(missileCanvas == null)
		console.log('Error: missileCanvas is null!');
	else {
		missileCanvasContext = missileCanvas.getContext('2d');
		missileCanvasContext.canvas.width  = GAME_CANVAS_WIDTH;
		missileCanvasContext.canvas.height = GAME_CANVAS_HEIGHT;
		missileCanvasContext.scale(1, 1);
	}	
	if(mapCanvasContext == null)
		console.log('Error: mapCanvasContext is null!');
	if(unitCanvasContext == null)
		console.log('Error: unitCanvasContext is null!');
	if(missileCanvasContext == null)
		console.log('Error: missileCanvasContext is null!');
}

function setFullScreenCanvas(canvasElement) {	
	if(canvasElement.webkitRequestFullScreen) {
	   canvasElement.webkitRequestFullScreen();
	}
	else {
		canvasElement.mozRequestFullScreen();
	}            
}

function loadJSONs() {	
	player = new Object();
	
	player.name = "Player";
	player.hp = 100;
	player.speed = 5; //[5]
	player.x = 0;
	player.y = 0;	
	player.wx = 0;
	player.wy = 0;	
	player.direction = 1;
	player.state = 0;
	player.firerate = 10;
	player.fireratecounter = 0;
	player.maxmoveframe = 4;
	player.maxfireframe = 7;
	player.maxdeathframe = 5;
	player.movecurrentframe = 0;
	player.firecurrentframe = 5;
	player.deathcurrentframe = 0;
	player.drawtilesize = 64;	
	player.collisionarea = 32;			
	player.collisiontilesize = 32;	
	player.imagetilesrc = "archer_tile_64x64.png";
	player.difftileborder = ((player.drawtilesize - player.collisiontilesize) / 2);
	player.halfUnitDrawTilesize = (player.drawtilesize / 2);
	
	/*
	loadJSON(
		function(response) {			
			var archer = JSON.parse(response);
			player.name = archer.name;
			player.hp = archer.hp;
			player.speed = archer.speed;
			player.x = archer.x;
			player.y = archer.y;
			player.direction = archer.direction;
			player.state = archer.state;
			player.firerate = archer.firerate;
			player.fireratecounter = archer.fireratecounter;
			player.maxmoveframe = archer.maxmoveframe;
			player.maxfireframe = archer.maxfireframe;
			player.maxdeathframe = archer.maxdeathframe;
			player.movecurrentframe = archer.movecurrentframe;
			player.firecurrentframe = archer.firecurrentframe;
			player.deathcurrentframe = archer.deathcurrentframe;			
			player.collisionarea = archer.collisionarea;			
			player.imagetilesrc = archer.imagetilesrc;
			player.drawtilesize = archer.drawtilesize;
			player.collisiontilesize = archer.collisiontilesize;
			player.difftileborder = ((player.drawtilesize - player.collisiontilesize) / 2);			
		},
	'archer.json');	
	*/
	arrow = new Object();	
	arrow.type = "green";			
	arrow.hit = 10;
	arrow.speed = 10; //27;
	arrow.status = 0;
	arrow.x = 0;
	arrow.y = 0;
	arrow.direction = 0;
	arrow.imagetilesrc = "missiles_tile.png";			
	arrow.updrawtilex = 0;
	arrow.updrawtiley = 0;			
	arrow.downdrawtilex = 5;
	arrow.downdrawtiley = 0;			
	arrow.rightdrawtilex = 10;
	arrow.rightdrawtiley = 0;			
	arrow.leftdrawtilex = 10;
	arrow.leftdrawtiley = 5;			
	arrow.drawtilelongersize = 32;
	arrow.drawtilesmallersize = 5;
	
	
	/*
	loadJSON(
		function(response) {			
			var arrowJson = JSON.parse(response);
			arrow.type = arrowJson.type;			
			arrow.hit = arrowJson.hit;
			arrow.speed = arrowJson.speed;
			arrow.status = arrowJson.status;
			arrow.x = arrowJson.x;
			arrow.y = arrowJson.y;
			arrow.direction = arrowJson.direction;
			arrow.imagetilesrc = arrowJson.imagetilesrc;			
			arrow.updrawtilex = arrowJson.updrawtilex;
			arrow.updrawtiley = arrowJson.updrawtiley;			
			arrow.downdrawtilex = arrowJson.downdrawtilex;
			arrow.downdrawtiley = arrowJson.downdrawtiley;			
			arrow.rightdrawtilex = arrowJson.rightdrawtilex;
			arrow.rightdrawtiley = arrowJson.rightdrawtiley;			
			arrow.leftdrawtilex = arrowJson.leftdrawtilex;
			arrow.leftdrawtiley = arrowJson.leftdrawtiley;			
			arrow.drawtilelongersize = arrowJson.drawtilelongersize;
			arrow.drawtilesmallersize = arrowJson.drawtilesmallersize;
		},
	'arrow.json');	
	*/
	if(player !== "null" && player !== "undefined") {
		//console.log('Player is not null!');		
		//console.log(player.name + ' ... ' + player.hp);
	} else {
		console.log('Error: player is null!');
	}
	
	loadJSON(
		function(response) {
			var foes = JSON.parse(response);
			var enemy;
			var i;
			for(i = 0; i < foes.length; i++) {
				enemy = new Object();				
				enemy.name = foes[i].name;
				enemy.hp = foes[i].hp;				
				//console.log(enemy.name + ' - ' + enemy.hp);
			}
		},
	'foes.json');
}

function loadUnitTiles() {
	if(player != null) {
		var image = new Image;
		image.src = IMAGE_DIRECTORY + "archer_tile_64x64.png";
		player.image = image;
	}
	if(arrow != null) {
		var image = new Image;
		image.src = IMAGE_DIRECTORY + "missiles_tile.png";
		arrow.image = image;
	}
	dummyTileImage = new Image;
	dummyTileImage.src = IMAGE_DIRECTORY + "map_tile_40x40_1.png";
}

function test() {
	var array = [1, 2, 3, 5, 6, 7, 8, 9];
	for(i = 0; i != array.length; i++) {
		console.log(array[i] + ", ");
	}
	console.log("splice 0");
	var index = array.indexOf(0);
	if (index > -1) {
		array.splice(index, 1);
	}
	for(i = 0; i != array.length; i++) {
		console.log(array[i] + ", ");
	}
}

window.onload = function() {
	//console.log('init...');
	setGameElementsLocation();	
	initGameCanvasContexts();
	loadJSONs();	
	//console.log(player.name + ' +++ ' + player.hp);
	loadUnitTiles();	
	//console.log(player.image.src);	
	//setInterval(draw, 0);
	//song.play();	
	//requestAnimationFrame(animation);	
	//test();
	gameStart();
};

window.onresize = function(event) {
	//console.log('resize event...');
	setGameElementsLocation();	
};


