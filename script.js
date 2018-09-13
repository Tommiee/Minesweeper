const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const tileSize = 20;

var cols, rows;
var w = 20;
var grid;
var totalMines = 30;

generateGrid();

function generateGrid(){
  cols = Math.floor(canvas.width / w);
  rows = Math.floor(canvas.height / w);
  grid = make2DArray(cols,rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++){
      grid[i][j] = new Tile(i,j,w);
    }
  }

  //pick totalmine spots
  var options = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

  //spawn mines
  for (var n = 0; n < totalMines; n++) {
    var index = Math.floor(Math.random() * options.length);
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];
    options.splice(index,1);
    grid[i][j].mine = true;
  }

  //add numbers in surrounding tiles
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++){
      grid[i][j].countMines();
    }
  }
  draw();
}

addEventListener("click",(e) => {
  let mouseX = getmousePos(canvas,e).x
  let mouseY = getmousePos(canvas,e).y
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++){
      if(grid[i][j].contains(mouseX,mouseY)){
        // console.log(mouseX + " " + mouseY)
        if(grid[i][j].mine){
          gameOver();
        }
        grid[i][j].reveal();
        draw();
      }
    }
  }
});

function make2DArray(cols,rows){
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function draw(){
  context.clearRect(0,0,canvas.width,canvas.height);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++){
      grid[i][j].show();
    }
  }
}

function getmousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function gameOver(){
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++){
      grid[i][j].revealed = true;
    }
  }
}

function restart(){
  generateGrid();
}
