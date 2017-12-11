function Coin (canvas, ctx, x){
  this.canvas = canvas;
  this.ctx = ctx;
  this.coinImage = new Image();
  this.coinImage.src = "images/dragonballball.png";
  this.coinImage.isReady = false;
  this.coinImage.onload = (function() {
    this.coinImage.isReady = true;
  }).bind(this);
  this.x = x;
  this.y = 770;
  this.width = 30;
  this.height = 30;
}

Coin.prototype.draw = function() {
    this.ctx.drawImage(
      this.coinImage,
      this.x,
      this.y,
      this.width,
      this.height
    )
    if(this.y > 330){
    this.y -= 1
  }
}
