/* util.js */

/*
 * Visszaadja egy világ koordináta térkép mátrix koordinátáját.
 */
function mat(coord) {
	return Math.floor(coord / MAP_ELEMENT_SIZE);
}
