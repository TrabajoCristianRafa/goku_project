function Miner(canvas, image, ctx, x, minerType, minerTypeInitial) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.minerImage = new Image();
  this.minerImage.src = image;
  this.minerImage.isReady = false;
  this.minerImage.onload = (function() {
    this.minerImage.isReady = true;
    this.minerImage.frameIndex = 0;
    this.minerImage.scale = 1.4;
    this.minerImage.cFrames = 12 / 2;
    this.minerImage.rFrames = 8;
    this.minerImage.frameWidth = this.minerImage.width / this.minerImage.cFrames / 2;
    this.minerImage.frameHeight = this.minerImage.height / this.minerImage.rFrames;
    this.width = this.minerImage.frameWidth * this.minerImage.scale;
    this.height = this.minerImage.frameHeight * this.minerImage.scale;
  }).bind(this);

  this.x = x;
  this.y = 600;
  this.isMining = false;
  this.findings = 0;
  this.minerType = minerType;
  this.minerTypeInitial = minerTypeInitial;
}

Miner.prototype.isReady = function() {
  return this.minerImage.isReady;
}

Miner.prototype.mine = function() {
  if (this.minerImage.frameIndex < 2) {
    this.minerImage.frameIndex = 4;
  } else {
    this.minerImage.frameIndex--;
  }
};

Miner.prototype.goDown = function(){
  if (this.findings === 0){
  this.y += 40;
  }
  else if (this.findings === 1){
  this.y += 100;
  }
  else if (this.findings === 2){
  }
  this.findings += 1;
}

Miner.prototype.disappears = function(){
  this.y += 2
}

Miner.prototype.draw = function() {
  if (this.isMining) {
    this.mine();
    this.ctx.drawImage(
      this.minerImage,
      this.minerImage.frameIndex * this.minerImage.frameWidth,
      this.minerType,
      this.minerImage.frameWidth,
      this.minerImage.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  } else {
    this.ctx.drawImage(
      this.minerImage,
      this.minerImage.frameIndex * this.minerImage.frameWidth,
      this.minerTypeInitial,
      this.minerImage.frameWidth,
      this.minerImage.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height )
  }
}
