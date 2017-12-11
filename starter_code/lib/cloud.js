function Cloud(canvas, image, ctx, y) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.cloudImage = new Image();
  this.cloudImage.src = image;
  this.cloudImage.isReady = false;
  this.cloudImage.onload = (function() {
    this.cloudImage.isReady = true;
  }).bind(this);

  this.x = -1600;
  this.y = y;
}

Cloud.prototype.isReady = function() {
  return this.cloudImage.isReady;
}

Cloud.prototype.draw = function() {
  if (this.x < 1){
      this.ctx.drawImage(
      this.cloudImage,
      this.x,
      this.y,
    );
    this.x += 3;
  }
  else {
    this.ctx.drawImage(
    this.cloudImage,
    this.x,
    this.y,
  );
  }

}
