/* missile.js */

var activeMissilesList = new Array();

var arrow = {
	type : "",
	hit : 0
};

function createNewMissile(startx, starty, direction, type) {
	
}

function addNewMissileToActiveMisslesList(arrow) {
	activeMissilesList.push(arrow);
}

function removeMissileFromActiveMissilesList(index) {
	//clearMissile(activeMissilesList[index]);
	activeMissilesList.splice(index, 1);		
}