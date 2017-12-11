function LiveandPowerBoard(canvas, ctx, imageLeft, imageRight) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.boardImageRight = new Image();
  this.boardImageRight.src = imageRight;
  this.boardImageRight.isReady = false;
  this.boardImageRight.onload = (function() {
    this.boardImageRight.isReady = true;
    this.boardImageRight.frameIndex = 0;
    this.boardImageRight.scale = 3;
    this.boardImageRight.cFrames = 13;
    this.boardImageRight.rFrames = 13;
    this.boardImageRight.frameWidth = this.boardImageRight.width / this.boardImageRight.cFrames;
    this.boardImageRight.frameHeight = this.boardImageRight.height / this.boardImageRight.rFrames;
    this.width = this.boardImageRight.frameWidth * this.boardImageRight.scale;
    this.height = this.boardImageRight.frameHeight * this.boardImageRight.scale;
  }).bind(this);

  this.boardImageLeft = new Image();
  this.boardImageLeft.src = imageLeft;
  this.boardImageLeft.isReady = false;
  this.boardImageLeft.onload = (function() {
    this.boardImageLeft.isReady = true;
    this.boardImageLeft.frameIndex = 0;
    this.boardImageLeft.scale = 3;
    this.boardImageLeft.cFrames = 15;
    this.boardImageLeft.rFrames = 15;
    this.boardImageLeft.frameWidth = this.boardImageLeft.width / this.boardImageLeft.cFrames;
    this.boardImageLeft.frameHeight = this.boardImageLeft.height / this.boardImageLeft.rFrames;
    this.width = this.boardImageLeft.frameWidth * this.boardImageLeft.scale;
    this.height = this.boardImageLeft.frameHeight * this.boardImageLeft.scale;
  }).bind(this);

  this.xLeft = 0;
  this.yLeft = 50;
  this.xRight = 400;
  this.yRight = 50;
  this.width = 100;
  this.height = 100;
  this.gokuLive = 250;
  this.gokuPower = 250;
  this.vegetaLive = 250;
  this.vegetaPower = 250;
}

LiveandPowerBoard.prototype.isReady = function() {
  this.boardImageLeft.isReady = true
  this.boardImageRight.isReady = true
}

LiveandPowerBoard.prototype.draw = function() {
  this.ctx.drawImage(
    this.boardImageLeft,
    this.boardImageLeft.frameIndex * this.boardImageLeft.frameWidth,
    this.boardImageLeft.frameIndex * this.boardImageLeft.frameHeight,
    this.boardImageLeft.frameWidth,
    this.boardImageLeft.frameHeight,
    this.xLeft,
    this.yLeft,
    this.width,
    this.height
  )
  this.ctx.drawImage(
    this.boardImageRight,
    this.boardImageRight.frameIndex * this.boardImageRight.frameWidth,
    this.boardImageRight.frameIndex * this.boardImageRight.frameHeight,
    this.boardImageRight.frameWidth,
    this.boardImageRight.frameHeight,
    this.xRight,
    this.yRight,
    this.width,
    this.height
  )

  //Paint Goku Banner//
  this.ctx.fillStyle = '#FFCC99'
  this.ctx.fillRect(0, 0, 350, 45);
  this.ctx.lineWidth = "5";
  this.ctx.strokeRect(0, 0, 350, 45);

  //Draw goku Name//

  this.ctx.fillStyle = "black";
  this.ctx.font = "20pt sans-serif";
  this.ctx.fillText("GOKU", 20, 30);

  //Draw Goku Lives//
  this.ctx.fillStyle = '#00FF00'
  this.ctx.fillRect(this.xLeft + (this.boardImageLeft.frameWidth * 3) + 5, this.yRight, this.gokuLive, 45)

  //Draw Goku Power//
  this.ctx.fillStyle = '#6600CC'
  this.ctx.fillRect(this.xLeft + (this.boardImageLeft.frameWidth * 3) + 5, this.yRight + 50, this.gokuPower, 45)


  //Paint Vegeta Banner//
  this.ctx.fillStyle = '#99CCFF'
  this.ctx.fillRect(400, 0, 350, 45);
  this.ctx.lineWidth = "5";
  this.ctx.strokeRect(400, 0, 350, 45);

  //Draw vegeta Name//

  this.ctx.fillStyle = "black";
  this.ctx.font = "20pt sans-serif";
  this.ctx.fillText("VEGETA", 425, 30);

  //Draw vegeta Lives//
  this.ctx.fillStyle = '#00FF00'
  this.ctx.fillRect(this.xRight + (this.boardImageRight.frameWidth * 3) + 5, this.yRight, this.vegetaLive, 45);

  //Draw vegeta Power//
  this.ctx.fillStyle = '#6600CC'
  this.ctx.fillRect(this.xRight + (this.boardImageRight.frameWidth * 3) + 5, this.yRight + 50, this.vegetaPower, 45)

}
