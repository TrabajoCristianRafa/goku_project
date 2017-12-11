function Background (canvas, ctx, x, index){
  this.canvas = canvas;
  this.ctx = ctx;
  this.BackgroundImage = new Image();
  this.BackgroundImage.src = "images/backgroundSpritecopia.png";
  this.BackgroundImage.isReady = false;
  this.BackgroundImage.onload = (function() {
    this.BackgroundImage.isReady = true;
    this.BackgroundImage.frameIndex = 0;
    this.BackgroundImage.scale = 1;
    this.BackgroundImage.cFrames = 2;
    this.BackgroundImage.rFrames = 3;
    this.BackgroundImage.frameWidth = this.BackgroundImage.width / this.BackgroundImage.cFrames;
    this.BackgroundImage.frameHeight = this.BackgroundImage.height / this.BackgroundImage.rFrames;
    this.width = this.BackgroundImage.frameWidth * this.BackgroundImage.scale;
    this.height = this.BackgroundImage.frameHeight * this.BackgroundImage.scale;
  }).bind(this);
  this.x = x;
  this.y = 0;
  this.imagePosition = index;
}

Background.prototype.changeBackground = function() {
      if(this.BackgroundImage.frameIndex < 2){
      this.BackgroundImage.frameIndex += 1
      }
}

Background.prototype.draw = function() {
    this.ctx.drawImage(
      this.BackgroundImage,
      this.imagePosition,
      this.BackgroundImage.frameIndex * this.BackgroundImage.frameHeight,
      this.BackgroundImage.frameWidth,
      this.BackgroundImage.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
