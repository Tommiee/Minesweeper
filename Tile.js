function Tile(i,j,w){
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;
  this.neighborCount = 0;
  this.mine = false;
  this.revealed = false;
}

Tile.prototype.show = function(){
  context.rect(this.x,this.y,this.w,this.w);
  if(this.revealed){
    context.fillStyle = "#cccccc";
    context.fillRect(this.x,this.y,this.w,this.w);
    if(this.mine){
      context.beginPath();
      // context.moveTo(this.x+this.w/2,this.y+this.w/2)
      context.arc(this.x+this.w/2,this.y+this.w/2,this.w/3,0,2*Math.PI);
      context.closePath();
      context.fillStyle = "black";
      context.fill();
    } else {
      if(this.neighborCount > 0){
        context.fillStyle = "black";
        context.textAlign = "center";
        context.font = "20px Arial";
        context.fillText(this.neighborCount,this.x+this.w/2,this.y+this.w-2);
      }
    }
  }
  context.stroke();
}

Tile.prototype.countMines = function(){
  if(this.mine) {
    this.neighborCount = -1;
    return;
  }

  var total = 0;

  for (var xOff = -1; xOff <= 1; xOff++){
    for (var yOff = -1; yOff <= 1; yOff++){
      var i = this.i + xOff;
      var j = this.j + yOff;
      if(i > -1 && i < cols && j > -1 && j < rows){
        var neighbor = grid[i][j];
        if(neighbor.mine){
          total++;
        }
      }
    }
  }
  this.neighborCount = total;
}

Tile.prototype.contains = function(x,y){
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w)
}

Tile.prototype.reveal = function(){
  this.revealed = true;
  if(this.neighborCount == 0){
    this.floodFill();
  }
}

Tile.prototype.floodFill = function(){
  for (var xOff = -1; xOff <= 1; xOff++){
    for (var yOff = -1; yOff <= 1; yOff++){
      var i = this.i + xOff;
      var j = this.j + yOff;
      if(i > -1 && i < cols && j > -1 && j < rows){
        var neighbor = grid[i][j]
        if(!neighbor.mine && !neighbor.revealed){
          neighbor.reveal();
        }
      }
    }
  }
}
