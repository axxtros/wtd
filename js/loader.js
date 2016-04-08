// loaders

function loadJSON(callback, filename) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.overrideMimeType("application/json");
	xmlhttp.open('GET', 'json/' + filename, true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			callback(xmlhttp.responseText);
		}
	}
	xmlhttp.send();
}

//csak teszt (nincs használva)
function loadJsonFile(callback, filename) {  
    var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
    xobj.open('GET', 'json/' + filename, true);
    xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {      
			callback(xobj.responseText);
		}
    };
    xobj.send(null);  
}

//csak teszt (nincs használva)
function loadJSONArray() {	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.overrideMimeType("application/json");
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = JSON.parse(xmlhttp.responseText);
			var i;
			for(i = 0; i < myArr.length; i++) {
				console.log(myArr[i].display);
			}
		}
	};
	xmlhttp.open("GET", 'json/foes2.json', true);
	xmlhttp.send();
}

