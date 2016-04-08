//map

/*
var tmap = new Array(
		[0,0,0,0,0,0,0,0,0,0],		
		[0,1,1,1,1,1,1,1,1,1],		
		[0,1,0,0,0,0,0,0,0,0],		
		[0,1,0,0,0,0,0,0,0,0],		
		[0,1,0,0,1,1,1,0,0,1],		
		[0,1,0,0,1,0,0,0,0,0],		
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,1,0,0],
		[0,1,0,0,1,0,0,0,0,0],
		[0,1,0,0,1,0,0,0,0,0],
		[0,1,0,0,1,0,0,0,0,0],
		[0,1,0,0,1,0,0,0,0,0]
);
*/

/*
var tmap = new Array(
		[1,0,1,0,1,0,1,0,1,0],		
		[0,0,1,0,1,1,1,0,0,1],		
		[1,0,0,0,2,1,0,0,0,0],		
		[0,0,1,1,0,1,0,0,0,0],		
		[1,0,0,0,2,0,0,0,1,1],		
		[0,0,0,0,0,0,0,0,0,0],		
		[1,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[1,0,1,0,0,0,0,0,0,0],
		[0,0,0,0,1,0,0,0,0,0]		
);
*/

//minx width 25!!!
//height: 30 
var tmap = new Array(
		[0,0,1,1,1,0,0,0,0,1,0,1,1,1,1,0,1,0,1,0,1,0,0,0,1],		
		[0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,1,0,0,0,0,0,1],		
		[1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1],		
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],		
		[1,1,0,1,0,0,0,0,1,1,0,0,0,0,0,1,0,0,1,0,0,1,0,1,1],		
		[0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1],		
		[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1],
		[1,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],		
		[1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,1,0,1,1],
		[1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,0,1,0,0,1,0,0,0,1],		
		[0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0,1,1,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
		[0,1,0,1,0,1,0,0,0,1,0,1,0,1,1,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,1,0,1,0,0,0,1],
		[0,0,1,1,1,0,0,0,0,1,0,1,1,1,1,0,1,0,1,0,1,0,0,0,1],		
		[0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,0,1,0,0,0,0,0,1],		
		[1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1],		
		[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],		
		[1,1,0,1,0,0,0,0,1,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1],		
		[0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1],		
		[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1],
		[1,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],				
		[0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0,1,1,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
		[0,1,0,1,0,1,0,0,0,1,0,1,0,1,1,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,0,1,0,1,1,2,1,0,0,0,0,1,0,1,0,1,0,0,0,1]
);

/*
var tmap = new Array(
		[1,0,1,1,1,0,0,0,0,0,1,0,1,1,1,0,1,0,1,0,1,0,0,1,0,1,1,1,0,0,0,0,0,1,0,1,1,1,0,1,0,1,0,1,0,0],		
		[0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0],		
		[1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0],		
		[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0],		
		[1,1,0,1,0,0,0,0,1,1,1,0,0,0,0,1,0,0,1,0,0,1,1,1,1,0,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,0,0,1,1],		
		[0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,1,1,0,1,0,0,0,0,1,1,1,0,0,0,0,1,0,0,1,0,0,1,1],		
		[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,1,1,1,0,1,0,0,0,0,1,1,1,0,0,0,0,1,0,0,1,0,0,1,1],
		[0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,0,1,0,0,0,0,1,1,1,0,0,0,0,1,0,0,1,0,0,1,1],		
		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,1,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
		[1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,0,1,0,0,1,0,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],		
		[0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0,1,1,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[1,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
		[0,1,0,1,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
		[1,1,1,1,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
		[1,0,1,1,1,0,0,0,0,0,1,0,1,1,1,0,1,0,1,0,1,0,0,1,0,1,1,1,0,0,0,0,0,1,0,1,1,1,0,1,0,1,0,1,0,0],		
		[0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1,0,0,0,0],		
		[1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0],		
		[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0],		
		[1,1,0,1,0,0,0,0,1,1,1,0,0,0,0,1,0,0,1,0,0,1,1,1,1,0,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,0,0,1,1],		
		[0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,1],		
		[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,1,1,1,0,1,0,0,0,0,1,1,1,0,0,0,0,1,0,0,1,0,0,1,1],
		[0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,0,1,0,0,0,0,1,1,1,0,0,0,0,1,0,0,1,0,0,1,1],		
		[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,1,1,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
		[1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,0,1,0,0,1,0,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0],		
		[0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,1,1,1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[1,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
		[0,1,0,1,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0],
		[1,1,1,1,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
);
*/

var mapOffsetX = 0;
var mapOffsetY = 0;
var mapIsNeedScrollX = false;
var mapIsNeedScrollY = false;

var dummyTileImage;

var mapWidth = (tmap[0].length * MAP_ELEMENT_SIZE);
var mapHeight = (tmap.length * MAP_ELEMENT_SIZE);

console.log("@axx mapWidth: " + mapWidth + " mapHeight: " + mapHeight); 

var topScrollBorder = HALF_GAME_DIV_HEIGHT;
var bottomScrollBorder = ((tmap.length * MAP_ELEMENT_SIZE) - HALF_GAME_DIV_HEIGHT);


var leftScrollBorder = HALF_GAME_DIV_WIDTH;
var rightScrollBorder = ((tmap[0].length * MAP_ELEMENT_SIZE) - HALF_GAME_DIV_WIDTH);

console.log("@axx leftScrollBorder: " + leftScrollBorder + " rightScrollBorder: " + rightScrollBorder + " topScrollBorder: " + topScrollBorder + " bottomScrollBorder: " + bottomScrollBorder); 

function isScrollMap(unit) {
	if(unit.direction === 0) {	//up
		
	}
	if(unit.direction === 1) {	//down
		
	}
	if(unit.direction === 2) {	//right
		
	}
	if(unit.direction === 3) {	//left
		
	}
}

//var gmap = [];
//gmap = createMapMatrix(100, 100, 10);

//var gmap_width;
//var map_height;

var mapDrawWidth;
var mapDrawHeight;

//writeMap(tmap);

//Create the map matrix. [height x width]
function createMapMatrix(width, height, element_size) {	
	var matrix = [];
	for(var i = 0; i < 10; i++) {
		matrix[i] = [];
		for(var j = 0; j < 10; j++) {
			matrix[i][j] = '0';
		}
	}
	return matrix;
}

function writeMap(map) {
	for(var i = 0; i != map.length; i++) {			
		console.log(map[i]);		
	}
}