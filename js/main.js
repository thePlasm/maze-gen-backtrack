var canvas = document.getElementById('canvas');
var tileSize = 4;
canvas.width = Math.round(window.innerWidth / tileSize) * tileSize - tileSize;
canvas.height = Math.round(window.innerHeight / tileSize) * tileSize - tileSize;
canvas.width -= canvas.width % (2 * tileSize) == 0 ? tileSize : 0;
canvas.height -= canvas.height % (2 * tileSize) == 0 ? tileSize : 0;
var ctx = canvas.getContext('2d');
var normalProbability = 0.999;
var maps = [];
var tempMap = [];
for (var i = 0; i < canvas.height / tileSize - 2; i++) {
  tempMap.push([]);
  for (var j = 0; j < canvas.width / tileSize - 2; j++) {
    tempMap[tempMap.length - 1].push(1);
  }
}
maps.push(tempMap);
var cells = [];
for (var i = 0; i < (maps[0].length + 1) / 2; i++) {
  cells.push([]);
  for (var j = 0; j < (maps[0][i].length + 1) / 2; j++) {
    cells[cells.length - 1].push(0);
  }
}
var visited = [];
var start = [0, 0]; //[cells.length - 1, Math.round((cells[0].length - 1) / 2)]
var end = [cells.length - 1, cells[0].length - 1];
var current = start.slice();
var notFin = true;
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, canvas.width, canvas.height);
function notFinished() {
  for (var i = 0; i < cells.length; i++) {
    for (var j = 0; j < cells[i].length; j++) {
      if (cells[i][j] == 0) {
        return true;
      }
    }
  }
  return false;
}
function neighboursUnvisited(cell) {
  var neighbours = [];
  if (typeof cells[cell[0] - 1] !== 'undefined' && typeof cells[cell[0] - 1][cell[1]] !== 'undefined' && (!(cell[0] + 1 == end[0] && cell[1] == end[1]) || cells[end[0]][end[1]] == 0) && (!(cell[0] + 1 == start[0] && cell[1] == start[1]) || cells[start[0]][start[1]] == 0) && (Math.random() > normalProbability || cells[cell[0] - 1][cell[1]] == 0)) {  //topcentre
    neighbours.push([-1, 0]);
  }
  if (typeof cells[cell[0]] !== 'undefined' && typeof cells[cell[0]][cell[1] - 1] !== 'undefined' && (!(cell[0] + 1 == end[0] && cell[1] == end[1]) || cells[end[0]][end[1]] == 0) && (!(cell[0] + 1 == start[0] && cell[1] == start[1]) || cells[start[0]][start[1]] == 0) && (Math.random() > normalProbability || cells[cell[0]][cell[1] - 1] == 0)) {  //centreleft
    neighbours.push([0, -1]);
  }
  if (typeof cells[cell[0]] !== 'undefined' && typeof cells[cell[0]][cell[1] + 1] !== 'undefined' && (!(cell[0] + 1 == end[0] && cell[1] == end[1]) || cells[end[0]][end[1]] == 0) && (!(cell[0] + 1 == start[0] && cell[1] == start[1]) || cells[start[0]][start[1]] == 0) && (Math.random() > normalProbability || cells[cell[0]][cell[1] + 1] == 0)) {  //centreright
    neighbours.push([0, 1]);
  }
  if (typeof cells[cell[0] + 1] !== 'undefined' && typeof cells[cell[0] + 1][cell[1]] !== 'undefined' && (!(cell[0] + 1 == end[0] && cell[1] == end[1]) || cells[end[0]][end[1]] == 0) && (!(cell[0] + 1 == start[0] && cell[1] == start[1]) || cells[start[0]][start[1]] == 0) && (Math.random() > normalProbability || cells[cell[0] + 1][cell[1]] == 0)) {  //bottomcentre
    neighbours.push([1, 0]);
  }
  return neighbours;
}
function draw() {
	for (var i = 0; i < maps[0].length; i++) {
		for (var j = 0; j < maps[0][i].length; j++) {
			if ((notFin && i == 2 * current[0] && j == 2 * current[1]) || (!notFin && i == 2 * start[0] && j == 2 * start[1])) {
				ctx.fillStyle = '#00ff00';
				ctx.fillRect(tileSize * j + tileSize, tileSize * i + tileSize, tileSize, tileSize);
			}
			else if (i == 2 * end[0] && j == 2 * end[1]) {
				ctx.fillStyle = '#ff0000';
				ctx.fillRect(tileSize * j + tileSize, tileSize * i + tileSize, tileSize, tileSize);
			}
			else if (maps[0][i][j] == 0) {
				ctx.fillStyle = '#ffffff';
				ctx.fillRect(tileSize * j + tileSize, tileSize * i + tileSize, tileSize, tileSize);
			}
		}
	}
	if (notFin) {
		requestAnimationFrame(tick);
	}
}
function tick() {
  var neighbours = neighboursUnvisited(current);
  maps[0][2 * current[0]][2 * current[1]] = 0;
  cells[current[0]][current[1]] = 1;
  if (neighbours.length > 0 && !(current[0] == end[0] && current[1] == end[1])) {
    var randNeighbour = neighbours[Math.round(Math.random() * (neighbours.length - 1))];
    visited.push(current.slice());
    maps[0][2 * current[0] + randNeighbour[0]][2 * current[1] + randNeighbour[1]] = 0;
    current[0] += randNeighbour[0];
    current[1] += randNeighbour[1];
  }
  else if (visited.length > 0) {
    current = visited.pop();
  }
  notFin = notFinished();
  requestAnimationFrame(draw);
}
tick();
