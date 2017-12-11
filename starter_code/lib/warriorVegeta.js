function WarriorVegeta(canvas, ctx, y, live) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.warriorVegetaImage = new Image();
  this.warriorVegetaImage.src = 'images/vegetauniformsprite.png';
  this.warriorVegetaImage.isReady = false;
  this.warriorVegetaImage.onload = (function() {
    this.warriorVegetaImage.isReady = true;
    this.warriorVegetaImage.frameIndex = 10;
    this.warriorVegetaImage.scale = 2.6;
    this.warriorVegetaImage.cFrames = 13;
    this.warriorVegetaImage.rFrames = 13;
    this.warriorVegetaImage.frameWidth = this.warriorVegetaImage.width / this.warriorVegetaImage.cFrames;
    this.warriorVegetaImage.frameHeight = this.warriorVegetaImage.height / this.warriorVegetaImage.rFrames;
    this.width = this.warriorVegetaImage.frameWidth * this.warriorVegetaImage.scale;
    this.height = this.warriorVegetaImage.frameHeight * this.warriorVegetaImage.scale;
  }).bind(this);
  this.x = 595;
  this.y = y;
  this.isCelebrating = false;
  this.isDown = false
  this.isGoingDown = false;
  this.isWalkingRight = false;
  this.isWalkingLeft = false;
  this.isPunching = false;
  this.issendingLove = false;
  this.isCovering = false
  this.isStoped = true;
  this.isGettingReadyToSendLove = false;
  this.isWalkingLeftAhead = false;
  this.isDead = false;
  this.rowPositions = [0.5,
    32.5,
    64.5,
    96.5,
    128.5,
    160.5,
    192.5,
    224.5,
    256.5,
    290.5,
    320.5,
    352.5,
    384.5,
  ]
  this.currentPosition = 320;
  this.live = live;
  this.punchingPower = 10;
  this.power = 1;
  this.hondaVitalDamage = 15;
}

WarriorVegeta.prototype.celebrates = function() {
  this.isCelebrating = true;
  this.isDead = false;
  this.isGoingDown = false;
  this.isWalkingRight = false;
  this.isWalkingLeft = false;
  this.isPunching = false;
  this.issendingLove = false
  this.isCovering = false
  this.isStoped = false;
  this.isGettingReadyToSendLove = false;
}
WarriorVegeta.prototype.dies = function() {
  this.isDead = true
  this.isGoingDown = false;
  this.isWalkingRight = false;
  this.isWalkingLeft = false;
  this.isPunching = false;
  this.issendingLove = false
  this.isCovering = false
  this.isStoped = false;
  this.isGettingReadyToSendLove = false;
  this.y += 2
}

WarriorVegeta.prototype.goDown = function() {
  if (this.isDown === false) {
    this.y += 5
  }
}

WarriorVegeta.prototype.moveWarriorRigth = function() {
  this.isGoingDown = false;
  this.isWalkingRight = true;
  this.isWalkingLeft = false;
  this.isPunching = false;
  this.issendingLove = false
  this.isCovering = false
  this.isStoped = false;
  this.isGettingReadyToSendLove = false;
  this.x += 10;
};

WarriorVegeta.prototype.warriorCovers = function() {
  this.isGoingDown = false;
  this.isWalkingRight = false;
  this.isWalkingLeft = false;
  this.isPunching = false;
  this.issendingLove = false;
  this.isCovering = true;
  this.isStoped = false;
  this.isGettingReadyToSendLove = false;
};

WarriorVegeta.prototype.moveWarriorLeft = function() {
  this.isGoingDown = false;
  this.isWalkingRight = false;
  this.isWalkingLeft = true;
  this.isPunching = false;
  this.issendingLove = false;
  this.isCovering = false
  this.isStoped = false;
  this.isGettingReadyToSendLove = false;
  this.x -= 10;
};

WarriorVegeta.prototype.vegetaPunch = function() {
  this.isGoingDown = false;
  this.isWalkingRight = false;
  this.isWalkingLeft = false;
  this.isPunching = true;
  this.issendingLove = false;
  this.isCovering = false
  this.isStoped = false;
  this.isGettingReadyToSendLove = false;

};

WarriorVegeta.prototype.vegetaSendsLove = function() {
  this.isGoingDown = false;
  this.isWalkingRight = false;
  this.isWalkingLeft = false;
  this.isPunching = false;
  this.issendingLove = true;
  this.isCovering = false
  this.isStoped = false;
  this.isGettingReadyToSendLove = false;
  this.longBase = 450
  this.limit = (this.x - (this.longBase * this.power));
  this.long = this.longBase * this.power
  if (this.power >= 0.3) {
    this.power -= 0.3
  }

};



WarriorVegeta.prototype.vegetaGetsReadyToSendsLove = function() {
  this.isGoingDown = false;
  this.isWalkingRight = false;
  this.isWalkingLeft = false;
  this.isPunching = false;
  this.issendingLove = false;
  this.isCovering = false
  this.isStoped = false;
  this.isGettingReadyToSendLove = true;
  if (this.power < 1) {
    this.power += 0.01
  }
};

WarriorVegeta.prototype.stopVegeta = function() {
  this.isGoingDown = false;
  this.isWalkingRight = false;
  this.isWalkingLeft = false;
  this.isPunching = false;
  this.issendingLove = false;
  this.isCovering = false
  this.isStoped = true;
  this.isGettingReadyToSendLove = false;
};


WarriorVegeta.prototype.draw = function() {
  if (this.y > 277 ) {
    this.isGoingDown = false;
    this.isDown = true;
    if ((this.isGoingDown === false) &&
      (this.isWalkingRight === false) &&
      (this.isWalkingLeft === false) &&
      (this.isPunching === false) &&
      (this.issendingLove === false) &&
      (this.isCovering === false) &&
      (this.isStoped === true) &&
      (this.isGettingReadyToSendLove === false)
    ) {
      this.currentPosition = this.rowPositions[0];
      this.warriorVegetaImage.frameIndex = 9;
      this.ctx.drawImage(
        this.warriorVegetaImage,
        this.warriorVegetaImage.frameIndex * this.warriorVegetaImage.frameWidth,
        this.currentPosition,
        this.warriorVegetaImage.frameWidth,
        this.warriorVegetaImage.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }

    if ((this.isGoingDown === false) &&
      (this.isWalkingRight === true) &&
      (this.isWalkingLeft === false) &&
      (this.isPunching === false) &&
      (this.issendingLove === false) &&
      (this.isCovering === false) &&
      (this.isStoped === false) &&
      (this.isGettingReadyToSendLove === false)) {
      if (this.isWalkingLeftAhead === false) {
        this.warriorVegetaImage.frameIndex = 2;
        this.currentPosition = this.rowPositions[1];
      }
      if (this.isWalkingLeftAhead) {
        this.warriorVegetaImage.frameIndex = 7;
        this.currentPosition = this.rowPositions[0];
      }
      if (this.isWalkingLeftAhead === false) {
        this.isWalkingLeftAhead = true
      } else {
        this.isWalkingLeftAhead = false
      }
      this.ctx.drawImage(
        this.warriorVegetaImage,
        this.warriorVegetaImage.frameIndex * this.warriorVegetaImage.frameWidth,
        this.currentPosition,
        this.warriorVegetaImage.frameWidth,
        this.warriorVegetaImage.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }

    if ((this.isGoingDown === false) &&
      (this.isWalkingRight === false) &&
      (this.isWalkingLeft === false) &&
      (this.isPunching === true) &&
      (this.issendingLove === false) &&
      (this.isCovering === false) &&
      (this.isStoped === false) &&
      (this.isGettingReadyToSendLove === false)) {

      this.warriorVegetaImage.frameIndex = 4;
      this.currentPosition = this.rowPositions[4];

      this.ctx.drawImage(
        this.warriorVegetaImage,
        this.warriorVegetaImage.frameIndex * this.warriorVegetaImage.frameWidth,
        this.currentPosition,
        this.warriorVegetaImage.frameWidth,
        this.warriorVegetaImage.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }


        if ((this.isCelebrating === true)&&
          (this.isGoingDown === false) &&
          (this.isWalkingRight === false) &&
          (this.isWalkingLeft === false) &&
          (this.isPunching === false) &&
          (this.issendingLove === false) &&
          (this.isCovering === false) &&
          (this.isStoped === false) &&
          (this.isGettingReadyToSendLove === false)) {

          this.warriorVegetaImage.frameIndex = 12;
          this.currentPosition = this.rowPositions[5];

          this.ctx.drawImage(
            this.warriorVegetaImage,
            this.warriorVegetaImage.frameIndex * this.warriorVegetaImage.frameWidth,
            this.currentPosition,
            this.warriorVegetaImage.frameWidth,
            this.warriorVegetaImage.frameHeight,
            this.x,
            this.y,
            this.width,
            this.height
          )
        }

    if ((this.isGoingDown === false) &&
      (this.isDead === true) &&
      (this.isWalkingRight === false) &&
      (this.isWalkingLeft === false) &&
      (this.isPunching === false) &&
      (this.issendingLove === false) &&
      (this.isCovering === false) &&
      (this.isStoped === false) &&
      (this.isGettingReadyToSendLove === false)) {

      this.warriorVegetaImage.frameIndex = 12;
      this.currentPosition = this.rowPositions[1];

      this.ctx.drawImage(
        this.warriorVegetaImage,
        this.warriorVegetaImage.frameIndex * this.warriorVegetaImage.frameWidth,
        this.currentPosition,
        this.warriorVegetaImage.frameWidth,
        this.warriorVegetaImage.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }



    if ((this.isGoingDown === false) &&
      (this.isWalkingRight === false) &&
      (this.isWalkingLeft === false) &&
      (this.isPunching === false) &&
      (this.issendingLove === false) &&
      (this.isCovering === true) &&
      (this.isStoped === false) &&
      (this.isGettingReadyToSendLove === false)) {

      this.warriorVegetaImage.frameIndex = 2;
      this.currentPosition = this.rowPositions[6];

      this.ctx.drawImage(
        this.warriorVegetaImage,
        this.warriorVegetaImage.frameIndex * this.warriorVegetaImage.frameWidth,
        this.currentPosition,
        this.warriorVegetaImage.frameWidth,
        this.warriorVegetaImage.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }
    if ((this.isGoingDown === false) &&
      (this.isWalkingRight === false) &&
      (this.isWalkingLeft === false) &&
      (this.isPunching === false) &&
      (this.issendingLove === false) &&
      (this.isCovering === false) &&
      (this.isStoped === false) &&
      (this.isGettingReadyToSendLove === true)) {

      this.warriorVegetaImage.frameIndex = 0;
      this.currentPosition = this.rowPositions[8];

      this.ctx.drawImage(
        this.warriorVegetaImage,
        this.warriorVegetaImage.frameIndex * this.warriorVegetaImage.frameWidth,
        this.currentPosition,
        this.warriorVegetaImage.frameWidth,
        this.warriorVegetaImage.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }

    if ((this.isGoingDown === false) &&
      (this.isWalkingRight === false) &&
      (this.isWalkingLeft === false) &&
      (this.isPunching === false) &&
      (this.issendingLove === true) &&
      (this.isCovering === false) &&
      (this.isStoped === false) &&
      (this.isGettingReadyToSendLove === false)) {

      this.warriorVegetaImage.frameIndex = 8;
      this.currentPosition = this.rowPositions[8];

      this.ctx.drawImage(
        this.warriorVegetaImage,
        this.warriorVegetaImage.frameIndex * this.warriorVegetaImage.frameWidth,
        this.currentPosition,
        this.warriorVegetaImage.frameWidth,
        this.warriorVegetaImage.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height)

      this.ctx.fillStyle = "#FF3333";
      this.ctx.fillRect(this.limit, 320, this.long, 10);
      this.ctx.beginPath();
      this.ctx.arc(this.limit, 325, 10, 0, 2 * Math.PI);
      this.ctx.fill();
    }

    if ((this.isGoingDown === false) &&
      (this.isWalkingRight === false) &&
      (this.isWalkingLeft === true) &&
      (this.isPunching === false) &&
      (this.issendingLove === false) &&
      (this.isCovering === false) &&
      (this.isStoped === false) &&
      (this.isGettingReadyToSendLove === false)) {
      if (this.isWalkingLeftAhead === false) {
        this.warriorVegetaImage.frameIndex = 3;
        this.currentPosition = this.rowPositions[1];
      }
      if (this.isWalkingLeftAhead) {
        this.warriorVegetaImage.frameIndex = 8;
        this.currentPosition = this.rowPositions[0];
      }
      if (this.isWalkingLeftAhead === false) {
        this.isWalkingLeftAhead = true
      } else {
        this.isWalkingLeftAhead = false
      }
      this.ctx.drawImage(
        this.warriorVegetaImage,
        this.warriorVegetaImage.frameIndex * this.warriorVegetaImage.frameWidth,
        this.currentPosition,
        this.warriorVegetaImage.frameWidth,
        this.warriorVegetaImage.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      )
    }
  } else {
    this.goDown()
    this.isGoingDown = true;
    this.currentPosition = this.rowPositions[11];
    this.warriorVegetaImage.frameIndex = 9;
    this.ctx.drawImage(
      this.warriorVegetaImage,
      this.warriorVegetaImage.frameIndex * this.warriorVegetaImage.frameWidth,
      this.currentPosition,
      this.warriorVegetaImage.frameWidth,
      this.warriorVegetaImage.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}
