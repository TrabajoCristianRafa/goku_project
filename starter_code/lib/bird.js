function Bird(canvas, image, ctx, y) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.birdImage = new Image();
  this.birdImage.src = image;
  this.birdImage.isReady = false;
  this.birdImage.onload = (function() {
    this.birdImage.isReady = true;
    this.birdImage.frameIndex = 0;
    this.birdImage.scale = 0.4;
    this.birdImage.cFrames = 4;
    this.birdImage.rFrames = 1;
    this.birdImage.frameWidth = this.birdImage.width / this.birdImage.cFrames / 2;
    this.birdImage.frameHeight = this.birdImage.height / this.birdImage.rFrames;
    this.width = this.birdImage.frameWidth * this.birdImage.scale;
    this.height = this.birdImage.frameHeight * this.birdImage.scale;
  }).bind(this);

  this.x = -5;
  this.y = y;
}

Bird.prototype.isReady = function() {
  return this.birdImage.isReady;
}

Bird.prototype.fly = function() {
  this.birdImage.frameIndex += 1;
  if (this.birdImage.frameIndex > 3) {
    this.birdImage.frameIndex = 0;
};
}

Bird.prototype.draw = function() {
    this.fly();
    this.ctx.drawImage(
      this.birdImage,
      this.birdImage.frameIndex * this.birdImage.frameWidth,
      0,
      this.birdImage.frameWidth,
      this.birdImage.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
    this.x += 1
}
