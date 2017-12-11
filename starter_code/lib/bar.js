var RIGHT_KEY = 39;

function PowerBar(canvas, ctx, x, xline, limitLeft, limitRight, xAutomaticline) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.x = x;
  this.y = 400;
  this.xline = xline;
  this.manualDirection = "right";
  this.automaticDirection = "left";
  this.isMoving = false;
  this.xAutomaticline = xAutomaticline;
  this.limitRight = limitLeft;
  this.limitLeft = limitRight;
}

PowerBar.prototype.frameDraw = function() {
  this.ctx.beginPath();
  this.ctx.lineWidth = "1";
  this.ctx.strokeStyle = "black";
  this.ctx.rect(this.x, this.y, 200, 30);
  this.ctx.stroke();
}

PowerBar.prototype.lineManualDraw = function() {
  this.ctx.beginPath();
  this.ctx.lineWidth = "3";
  this.ctx.strokeStyle = "black";
  this.ctx.rect(this.xline, this.y, 3, 30);
  this.ctx.stroke();
}

PowerBar.prototype.lineAutomaticDraw = function() {
  this.ctx.beginPath();
  this.ctx.lineWidth = "1";
  this.ctx.fillStyle="#ff5050";
  this.ctx.fillRect(this.xAutomaticline, this.y, 20, 30);
}

PowerBar.prototype.changeManualDirection = function() {
  if (this.xline > this.limitRight) {
    this.manualDirection = "left";
  } else if (this.xline < this.limitLeft) {
    this.manualDirection = "right";
}
}

PowerBar.prototype.changeAutomaticDirection = function() {
if (this.xAutomaticline > this.limitRight) {
  this.automaticDirection = "left";
} else if (this.xAutomaticline < this.limitLeft) {
  this.automaticDirection = "right";
}
}

PowerBar.prototype.moveManualBar = function() {
  if (this.manualDirection === "left") {
    this.xline -= 0.5;
  } else if (this.manualDirection === "right") {
    this.xline += 0.5;
}
}

PowerBar.prototype.moveAutomaticBar = function() {
if (this.automaticDirection === "left") {
  this.xAutomaticline -= 1.5;
} else if (this.automaticDirection === "right") {
  this.xAutomaticline += 1.5;
}
}

PowerBar.prototype.drawFrame = function() {
  this.frameDraw();
}

PowerBar.prototype.drawLine = function() {
    this.changeAutomaticDirection();
    this.lineAutomaticDraw();
    this.moveAutomaticBar();
  if (this.isMoving) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.changeManualDirection();
    this.lineManualDraw();
    this.moveManualBar();
  } else {
    this.lineManualDraw();
  }
}

PowerBar.prototype.draw = function() {
  this.drawFrame();
  this.drawLine();
}
