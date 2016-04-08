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
			if((map[player.my - 1][player.mx] != 0)) {
				var ewx = ((player.mx * MAP_ELEMENT_SIZE) + (MAP_ELEMENT_SIZE / 2)); 
				var ewy = ( ((player.my - 1) * MAP_ELEMENT_SIZE) + (MAP_ELEMENT_SIZE / 2));
				if((player.wy - ewy) < MAP_ELEMENT_SIZE) {
					player.wy += player.speed;
					isCollision = true;
				}
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
			if(map[player.my + 1][player.mx] != 0) {
				var ewx = ((player.mx * MAP_ELEMENT_SIZE) + (MAP_ELEMENT_SIZE / 2)); 
				var ewy = ( ((player.my + 1) * MAP_ELEMENT_SIZE) +  (MAP_ELEMENT_SIZE / 2));
				if((ewy - player.wy) < MAP_ELEMENT_SIZE) {
					player.wy -= player.speed;
					isCollision = true;
				}
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
			if(map[player.my][player.mx - 1] != 0) {
				var ewx = (((player.mx - 1) * MAP_ELEMENT_SIZE) + (MAP_ELEMENT_SIZE / 2)); 
				var ewy = ((player.my * MAP_ELEMENT_SIZE) +  (MAP_ELEMENT_SIZE / 2));
				if((player.wx - ewx) < MAP_ELEMENT_SIZE) {
					player.wx += player.speed;
					isCollision = true;
				}
			}
		}
	}
	if(player.direction === 4) {	//right
		if(player.mx === (map[0].length - 1)) {
			if(player.wx >= ((map[0].length * MAP_ELEMENT_SIZE) - (MAP_ELEMENT_SIZE / 2)) ) {
				player.wx = ((map[0].length * MAP_ELEMENT_SIZE) - (MAP_ELEMENT_SIZE / 2));
				player.ux = (GAME_DIV_WIDTH - (MAP_ELEMENT_SIZE / 2));
				isCollision = true;
			}
		} else {
			if(map[player.my][player.mx + 1] != 0) {
				var ewx = (((player.mx + 1) * MAP_ELEMENT_SIZE) + (MAP_ELEMENT_SIZE / 2)); 
				var ewy = ((player.my * MAP_ELEMENT_SIZE) +  (MAP_ELEMENT_SIZE / 2));
				if((ewx - player.wx) < MAP_ELEMENT_SIZE) {
					player.wx -= player.speed;
					isCollision = true;
				}
			}
		}
	}
	if(isCollision) {
		player.state = 2;
	}
}