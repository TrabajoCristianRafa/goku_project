function WarriorGoku(canvas, ctx, y, live) {
  this.canvas = canvas;
  this.ctx = ctx;
  this.warriorGokuImage = new Image();
  this.warriorGokuImage.src = 'images/gokuuniformsprite.png';
  this.warriorGokuImage.isReady = false;
  this.warriorGokuImage.onload = (function() {
    this.warriorGokuImage.isReady = true;
    this.warriorGokuImage.frameIndex = 1;
    this.warriorGokuImage.scale = 2.4;
    this.warriorGokuImage.cFrames = 15;
    this.warriorGokuImage.rFrames = 15;
    this.warriorGokuImage.frameWidth = this.warriorGokuImage.width / this.warriorGokuImage.cFrames;
    this.warriorGokuImage.frameHeight = this.warriorGokuImage.height / this.warriorGokuImage.rFrames;
    this.width = this.warriorGokuImage.frameWidth * this.warriorGokuImage.scale;
    this.height = this.warriorGokuImage.frameHeight * this.warriorGokuImage.scale;
  }).bind(this);
  this.x = 140;
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
    416.5,
    448.5,
  ]
  this.currentPosition = 320
  this.live = live
  this.punchingPower = 10
  this.power = 1;
  this.hondaVitalDamage = 15;
}

WarriorGoku.prototype.celebrates = function() {
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

WarriorGoku.prototype.dies = function() {
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

WarriorGoku.prototype.goDown = function() {
  if (this.isDown === false) {
    this.y += 5
  }
}

WarriorGoku.prototype.moveWarriorRigth = function() {
  this.isGoingDown = false;
  this.isWalkingRight = true;
  this.isWalkingLeft = false;
  this.isPunching = false;
  this.issendingLove = false
  this.isCovering = false
  this.isStoped = false;
  this.isGettingReadyToSendLove = false;
  this.x += 10;
}

WarriorGoku.prototype.warriorCovers = function() {
  this.isGoingDown = false;
  this.isWalkingRight = false;
  this.isWalkingLeft = false;
  this.isPunching = false;
  this.issendingLove = false;
  this.isCovering = true;
  this.isStoped = false;
  this.isGettingReadyToSendLove = false;
};

WarriorGoku.prototype.moveWarriorLeft = function() {
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

WarriorGoku.prototype.gokuPunch = function() {
  this.isGoingDown = false;
  this.isWalkingRight = false;
  this.isWalkingLeft = false;
  this.isPunching = true;
  this.issendingLove = false;
  this.isCovering = false
  this.isStoped = false;
  this.isGettingReadyToSendLove = false;
};

WarriorGoku.prototype.gokuSendsLove = function() {
  this.isGoingDown = false;
  this.isWalkingRight = false;
  this.isWalkingLeft = false;
  this.isPunching = false;
  this.issendingLove = true;
  this.isCovering = false
  this.isStoped = false;
  this.isGettingReadyToSendLove = false;
  this.longBase = 450
  this.limit = (this.x + (this.longBase * this.power));
  this.long = this.longBase * this.power
  if (this.power >= 0.3) {
    this.power -= 0.3
  }

};

WarriorGoku.prototype.gokuGetsReadyToSendsLove = function() {
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

WarriorGoku.prototype.stopGoku = function() {
  this.isGoingDown = false;
  this.isWalkingRight = false;
  this.isWalkingLeft = false;
  this.isPunching = false;
  this.issendingLove = false;
  this.isCovering = false
  this.isStoped = true;
  this.isGettingReadyToSendLove = false;
};

WarriorGoku.prototype.draw = function() {
  if (this.y > 280) {
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
      this.warriorGokuImage.frameIndex = 9;
      this.ctx.drawImage(
        this.warriorGokuImage,
        this.warriorGokuImage.frameIndex * this.warriorGokuImage.frameWidth,
        this.currentPosition,
        this.warriorGokuImage.frameWidth,
        this.warriorGokuImage.frameHeight,
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
        this.warriorGokuImage.frameIndex = 5;
        this.currentPosition = this.rowPositions[2];
      }
      if (this.isWalkingLeftAhead) {
        this.warriorGokuImage.frameIndex = 1;
        this.currentPosition = this.rowPositions[2];
      }
      if (this.isWalkingLeftAhead === false) {
        this.isWalkingLeftAhead = true
      } else {
        this.isWalkingLeftAhead = false
      }
      this.ctx.drawImage(
        this.warriorGokuImage,
        this.warriorGokuImage.frameIndex * this.warriorGokuImage.frameWidth,
        this.currentPosition,
        this.warriorGokuImage.frameWidth,
        this.warriorGokuImage.frameHeight,
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

      this.warriorGokuImage.frameIndex = 3;
      this.currentPosition = this.rowPositions[4];

      this.ctx.drawImage(
        this.warriorGokuImage,
        this.warriorGokuImage.frameIndex * this.warriorGokuImage.frameWidth,
        this.currentPosition,
        this.warriorGokuImage.frameWidth,
        this.warriorGokuImage.frameHeight,
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

      this.warriorGokuImage.frameIndex = 9;
      this.currentPosition = this.rowPositions[10];

      this.ctx.drawImage(
        this.warriorGokuImage,
        this.warriorGokuImage.frameIndex * this.warriorGokuImage.frameWidth,
        this.currentPosition,
        this.warriorGokuImage.frameWidth,
        this.warriorGokuImage.frameHeight,
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

          this.warriorGokuImage.frameIndex = 6;
          this.currentPosition = this.rowPositions[7];

          this.ctx.drawImage(
            this.warriorGokuImage,
            this.warriorGokuImage.frameIndex * this.warriorGokuImage.frameWidth,
            this.currentPosition,
            this.warriorGokuImage.frameWidth,
            this.warriorGokuImage.frameHeight,
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

      this.warriorGokuImage.frameIndex = 2;
      this.currentPosition = this.rowPositions[7];

      this.ctx.drawImage(
        this.warriorGokuImage,
        this.warriorGokuImage.frameIndex * this.warriorGokuImage.frameWidth,
        this.currentPosition,
        this.warriorGokuImage.frameWidth,
        this.warriorGokuImage.frameHeight,
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

      if (this.isWalkingLeftAhead === false) {
        this.warriorGokuImage.frameIndex = 3;
        this.currentPosition = this.rowPositions[10];
      }
      if (this.isWalkingLeftAhead) {
        this.warriorGokuImage.frameIndex = 4;
        this.currentPosition = this.rowPositions[10];
      }
      if (this.isWalkingLeftAhead === false) {
        this.isWalkingLeftAhead = true
      } else {
        this.isWalkingLeftAhead = false
      }

      this.ctx.drawImage(
        this.warriorGokuImage,
        this.warriorGokuImage.frameIndex * this.warriorGokuImage.frameWidth,
        this.currentPosition,
        this.warriorGokuImage.frameWidth,
        this.warriorGokuImage.frameHeight,
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

      this.warriorGokuImage.frameIndex = 3;
      this.currentPosition = this.rowPositions[8];

      this.ctx.drawImage(
        this.warriorGokuImage,
        this.warriorGokuImage.frameIndex * this.warriorGokuImage.frameWidth,
        this.currentPosition,
        this.warriorGokuImage.frameWidth,
        this.warriorGokuImage.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      )

      this.ctx.fillStyle="#FFFF66";
      this.ctx.fillRect((this.x + 65), 320, this.long, 10);
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
        this.warriorGokuImage.frameIndex = 6;
        this.currentPosition = this.rowPositions[2];
      }
      if (this.isWalkingLeftAhead) {
        this.warriorGokuImage.frameIndex = 2;
        this.currentPosition = this.rowPositions[2];
      }
      if (this.isWalkingLeftAhead === false) {
        this.isWalkingLeftAhead = true
      } else {
        this.isWalkingLeftAhead = false
      }
      this.ctx.drawImage(
        this.warriorGokuImage,
        this.warriorGokuImage.frameIndex * this.warriorGokuImage.frameWidth,
        this.currentPosition,
        this.warriorGokuImage.frameWidth,
        this.warriorGokuImage.frameHeight,
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
    this.warriorGokuImage.frameIndex = 9;
    this.ctx.drawImage(
      this.warriorGokuImage,
      this.warriorGokuImage.frameIndex * this.warriorGokuImage.frameWidth,
      this.currentPosition,
      this.warriorGokuImage.frameWidth,
      this.warriorGokuImage.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}
