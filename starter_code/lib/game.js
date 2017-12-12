// Variables globales con las teclas //

var RIGHT_KEY = 39;
var DOWN_KEY = 40;
var A_KEY = 65;
var SHIFT_KEY = 16;
var LEFT_KEY = 37;
var PERIOD_KEY = 190;
var COMMA_KEY = 188;
var BAR_KEY = 189;
var Q_KEY = 81;
var C_KEY = 67;
var Z_KEY = 90;
var W_KEY = 87;
var E_KEY = 69;
var R_KEY = 82;
var D_KEY = 68;
var T_KEY = 84;
var M_KEY = 77;
var P_KEY = 80;
var O_KEY = 79;
var I_KEY = 73;
var B_KEY = 66;
var V_KEY = 86;

// Variables globales para el sonido //
var soundEfxPunch; // Sound Efx
var soundPunchLoad = "punch.mp3"; //Game Over sound efx
var soundEfxBackground; // Sound Efx
var soundBackgroundLoad = "DragonBall.mp3"; //Game Over sound efx


// Constructor del Game //

function Game(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.canvas.width = 800;
  this.canvas.height = 900;
  this.ctx = this.canvas.getContext('2d');
  this.background1 = new Background("canvas", this.ctx, 0, 0);
  this.miner1 = new Miner("canvas", 'images/miner.png', this.ctx, 170, 32, 0);
  this.bar1 = new PowerBar("canvas", this.ctx, 60, 60, 250, 70, 240);
  this.background2 = new Background("canvas", this.ctx, 400, 400);
  this.miner2 = new Miner("canvas", 'images/miner.png', this.ctx, 550, 192, 128);
  this.bar2 = new PowerBar("canvas", this.ctx, 450, 650, 650, 460, 600);
  this.collision1 = false;
  this.collision2 = false;
  this.myBirds = [];
  setInterval(this.addBird.bind(this), Math.floor(Math.random() * (9000 - 5000)) + 5000);
  this.cloud = new Cloud("canvas", 'images/clouds.png', this.ctx, 350)
  this.hasMiner1Won = false;
  this.hasMiner2Won = false;
  this.buttons = [RIGHT_KEY,
    A_KEY,
    SHIFT_KEY,
    LEFT_KEY,
    PERIOD_KEY,
    COMMA_KEY,
    BAR_KEY,
    Q_KEY,
    C_KEY,
    Z_KEY,
    W_KEY,
    E_KEY,
    R_KEY
  ]
  this.keys = []
  this.liveandPowerBoard1 = new LiveandPowerBoard('canvas', this.ctx, 'images/gokuuniformsprite.png', 'images/vegetauniformsprite.png')
  this.isGokuAlive = true;
  this.isVegetaAlive = true;
  document.onkeydown = this.onKeyDown.bind(this)
  document.onkeyup = this.onkeyup.bind(this)
  this.frames = 0
}

// Prototipo contador de frames //

Game.prototype.addFrame = function() {
  this.frames += 1
  console.log(this.frames)
}

// Prototipo para añadir pajaros al array de pajaros con tiempo y espacio randomizados//

Game.prototype.addBird = function() {
  this.myBirds.push(new Bird("canvas", 'images/bird.png', this.ctx, Math.floor(Math.random() * (220 - 120)) + 120))
}

//Clear background//
Game.prototype.clearBg = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};
//Clear Todo//
Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

//Colision de las barras de los mineros manual vs automatica del minero 1 //
Game.prototype.collisionObjectsLeft = function() {
  if ((this.bar1.xline > (this.bar1.xAutomaticline - 5)) &&
    (this.bar1.xline < (this.bar1.xAutomaticline + 20))) {
    this.collision1 = true;
    this.miner1.goDown();
    this.background1.changeBackground();
  } else {
    this.collision1 = false;
  }
}

//Colision de las barras de los mineros manual vs automatica del minero 2 //
Game.prototype.collisionObjectsRight = function() {
  if ((this.bar2.xline > (this.bar2.xAutomaticline - 5)) &&
    (this.bar2.xline < (this.bar2.xAutomaticline + 20))) {
    this.collision2 = true;
    this.miner2.goDown();
    this.background2.changeBackground();
  } else {
    this.collision2 = false;
  }
}

//Prototipo comprobador de si los mineros estan vivos. En caso de que no lo esten, se celebra la victoria//
Game.prototype.checkIfWarriorsAreAlive = function() {
  if ((this.liveandPowerBoard1.vegetaLive > 0) && (this.liveandPowerBoard1.gokuLive > 0)) {
    console.log("Both Fighters are Alive")
  } else if (this.liveandPowerBoard1.vegetaLive === 0) {
    this.warrior2.dies();
    console.log("vegeta is over");
    if (this.warrior2.y > 1100) {
      this.warrior1.celebrates();
    }
  } else if (this.liveandPowerBoard1.gokuLive === 0) {
    this.warrior1.dies();
    console.log("goku is over");
    if (this.warrior1.y > 1100) {
      this.warrior2.celebrates();
    }

  }
};

//Protitipo para comprobar si hay colision en el puñetazo, si la hay, y el warrior sigue vivo, quita vida//
Game.prototype.warriorPunchesAndHits = function() {
  if ((this.warrior2.isPunching === true) && (this.warrior1.isCovering === false)) {
    this.liveandPowerBoard1.gokuLive -= this.warrior2.punchingPower
    if (this.liveandPowerBoard1.gokuLive <= 0) {
      this.liveandPowerBoard1.gokuLive = 0
    }
  } else if ((this.warrior1.isPunching === true) && (this.warrior2.isCovering === false)) {
    this.liveandPowerBoard1.vegetaLive -= this.warrior1.punchingPower
    if (this.liveandPowerBoard1.vegetaLive <= 0) {
      this.liveandPowerBoard1.vegetaLive = 0
    }
  }
  this.warrior1.x -=20
  this.warrior2.x +=20
}

//Protitipo para comprobar si hay colision en la honda vital, si la hay, y el warrior sigue vivo, quita vida//
Game.prototype.warriorIsBurning = function() {
  if ((this.warrior1.issendingLove === true) && (this.warrior2.isCovering === false)) {
    this.liveandPowerBoard1.vegetaLive -= this.warrior1.hondaVitalDamage;
    if (this.liveandPowerBoard1.vegetaLive <= 0) {
      this.liveandPowerBoard1.vegetaLive = 0
    }
  }
  if ((this.warrior2.issendingLove === true) && (this.warrior1.isCovering === false)) {
    this.liveandPowerBoard1.gokuLive -= this.warrior2.hondaVitalDamage;
    if (this.liveandPowerBoard1.gokuLive <= 0) {
      this.liveandPowerBoard1.gokuLive = 0
    }
  }
}

//Prototipo para los eventos.
Game.prototype.movements = function() {
  // EVENTOS PLAYER 1//

  if (this.keys[Q_KEY] && (this.frames % 5 === 0)) {
    this.miner1.isMining = true;
    this.bar1.isMoving = true;
    this.collisionObjectsLeft();
  }


  if (this.keys[B_KEY] && (this.frames % 10 === 0)) {
    if (this.warrior1.x < this.warrior2.x - 25) {
      this.warrior1.moveWarriorRigth();

    }
  }


  if (this.keys[C_KEY] && (this.frames % 10 === 0)) {
    this.warrior1.moveWarriorLeft();

  }


  if (this.keys[W_KEY] && (this.frames % 5 === 0)) {
    this.warrior1.gokuPunch();
    if (this.warrior1.x > this.warrior2.x - 50) {
      this.warriorPunchesAndHits();
      soundEfxPunch.play();
    }
    setTimeout((function() {
      this.warrior1.stopGoku();
    }).bind(this), 10)
  }


  if (this.keys[R_KEY] && (this.frames % 10 === 0)) {
    this.warrior1.gokuGetsReadyToSendsLove();
    if ((this.liveandPowerBoard1.gokuPower < 237.5)) {
      this.liveandPowerBoard1.gokuPower += 3
    } else {
      this.liveandPowerBoard1.gokuPower = 250
      this.warrior1.power = 1
    }
  }


  if (this.keys[V_KEY] && (this.frames % 10 === 0)) {
    this.warrior1.warriorCovers();
  }


  if (this.keys[E_KEY] && (this.frames % 10 === 0)) {
    this.warrior1.gokuSendsLove();
    if ((this.liveandPowerBoard1.gokuPower < 255) && (this.liveandPowerBoard1.gokuPower >= 75)) {
      this.liveandPowerBoard1.gokuPower -= 75
      if (this.warrior1.limit + 60 > this.warrior2.x) {
        this.warriorIsBurning()
      }
    }
  }

  // EVENTOS PLAYER 2//
  if (this.keys[SHIFT_KEY] && (this.frames % 5 === 0)) {
    this.miner2.isMining = true;
    this.bar2.isMoving = true;
    this.collisionObjectsRight();
  }

  if (this.keys[LEFT_KEY] && (this.frames % 10 === 0)) {
    if (this.warrior2.x > this.warrior1.x + 25) {
      this.warrior2.moveWarriorLeft();

    }
  }

  if (this.keys[RIGHT_KEY] && (this.frames % 10 === 0)) {
    this.warrior2.moveWarriorRigth();
  
  }

  if (this.keys[I_KEY] && (this.frames % 5 === 0)) {
    this.warrior2.vegetaPunch();
    if (this.warrior2.x < this.warrior1.x + 50) {
      this.warriorPunchesAndHits();
      soundEfxPunch.play();
    }
    setTimeout((function() {
      this.warrior2.stopVegeta();
    }).bind(this), 10)
  }

  if (this.keys[P_KEY] && (this.frames % 10 === 0)) {
    this.warrior2.vegetaGetsReadyToSendsLove();
    if (this.liveandPowerBoard1.vegetaPower < 237.5) {
      this.liveandPowerBoard1.vegetaPower += 3
    } else {
      this.liveandPowerBoard1.vegetaPower = 250;
      this.warrior2.power = 1
    }
  }

  if (this.keys[DOWN_KEY] && (this.frames % 10 === 0)) {
    this.warrior2.warriorCovers();
  }

  if (this.keys[O_KEY] && (this.frames % 10 === 0)) {
    if ((this.liveandPowerBoard1.vegetaPower < 255) && (this.liveandPowerBoard1.vegetaPower >= 75)) {
      this.warrior2.vegetaSendsLove();
      this.liveandPowerBoard1.vegetaPower -= 75
      if (this.warrior2.limit - 60 < this.warrior1.x) {
        this.warriorIsBurning()
      }
    }
  }
}

Game.prototype.onKeyDown = function(e) {
  this.keys[e.keyCode] = true;
}

Game.prototype.onkeyup = function(e) {
  this.keys[e.keyCode] = false;
}

//
// Game.prototype.onKeyDown = function(event) {
// if (event.keyCode === this.buttons[7]) {
//   this.miner1.isMining = true;
//   this.bar1.isMoving = true;
// } else if (event.keyCode === this.buttons[2]) {
//   this.miner2.isMining = true;
//   this.bar2.isMoving = true;
// } else if (event.keyCode === this.buttons[0]) {
//   this.warrior2.moveWarriorRigth();
// } else if (event.keyCode === this.buttons[3]) {
//   if (this.warrior2.x > this.warrior1.x + 25) {
//     this.warrior2.moveWarriorLeft();
//   }
// } else if (event.keyCode === this.buttons[4]) {
//   this.warrior2.vegetaPunch();
// } else if (event.keyCode === this.buttons[5]) {
//   this.warrior2.vegetaGetsReadyToSendsLove();
//   if (this.liveandPowerBoard1.vegetaPower < 237.5) {
//     this.liveandPowerBoard1.vegetaPower += 3
//   } else {
//     this.liveandPowerBoard1.vegetaPower = 250;
//     this.warrior2.power = 1
//   }
// } else if (event.keyCode === this.buttons[6]) {
//   this.warrior2.warriorCovers();
// } else if (event.keyCode === this.buttons[8]) {
//   if (this.warrior1.x < this.warrior2.x - 25) {
//     this.warrior1.moveWarriorRigth();
//   }
// } else if (event.keyCode === this.buttons[9]) {
//   this.warrior1.moveWarriorLeft();
// } else if (event.keyCode === this.buttons[10]) {
//   this.warrior1.gokuPunch();
//
// } else if (event.keyCode === this.buttons[11]) {
//   this.warrior1.gokuGetsReadyToSendsLove();
//   if ((this.liveandPowerBoard1.gokuPower < 237.5)) {
//     this.liveandPowerBoard1.gokuPower += 3
//   } else {
//     this.liveandPowerBoard1.gokuPower = 250
//     this.warrior1.power = 1
//   }
// } else if (event.keyCode === this.buttons[12]) {
//   this.warrior1.warriorCovers();
// }
// };
//
// Game.prototype.onKeyUp = function(event) {
// if (event.keyCode === this.buttons[7]) {
//   this.miner1.isMining = false;
//   this.bar1.isMoving = false;
//   this.collisionObjectsLeft();
// } else if (event.keyCode === this.buttons[2]) {
//   this.miner2.isMining = false;
//   this.bar2.isMoving = false;
//   this.collisionObjectsRight();
// } else if (event.keyCode === this.buttons[0]) {
//   this.warrior2.moveWarriorRigth();
//
// } else if (event.keyCode === this.buttons[3]) {
//   if (this.warrior2.x > this.warrior1.x + 25) {
//     this.warrior2.moveWarriorLeft();
//   }
// } else if (event.keyCode === this.buttons[4]) {
//   this.warrior2.vegetaPunch();
//   if (this.warrior2.x < this.warrior1.x + 50) {
//     this.warriorPunchesAndHits();
//     soundEfxPunch.play();
//   }
//   setTimeout((function() {
//     this.warrior2.stopVegeta();
//   }).bind(this), 500)
// } else if (event.keyCode === this.buttons[5]) {
//   this.warrior2.vegetaSendsLove();
//   if ((this.liveandPowerBoard1.vegetaPower < 255) && (this.liveandPowerBoard1.vegetaPower >= 75)) {
//     this.liveandPowerBoard1.vegetaPower -= 75
//     if (this.warrior2.limit - 60 < this.warrior1.x) {
//       this.warriorIsBurning()
//     }
//   }
// } else if (event.keyCode === this.buttons[6]) {
//   this.warrior2.stopVegeta();
// } else if (event.keyCode === this.buttons[11]) {
//   if (this.liveandPowerBoard1.gokuPower > 20)
//     this.warrior1.gokuSendsLove();
//   if ((this.liveandPowerBoard1.gokuPower < 255) && (this.liveandPowerBoard1.gokuPower >= 75)) {
//     this.liveandPowerBoard1.gokuPower -= 75
//     if (this.warrior1.limit + 60 > this.warrior2.x) {
//       this.warriorIsBurning()
//     }
//   }
// } else if (event.keyCode === this.buttons[8]) {
//   if (this.warrior1.x < this.warrior2.x - 25) {
//     this.warrior1.moveWarriorRigth();
//   }
// } else if (event.keyCode === this.buttons[9]) {
//   this.warrior1.moveWarriorLeft();
// } else if (event.keyCode === this.buttons[10]) {
//   this.warrior1.gokuPunch();
//   if (this.warrior1.x > this.warrior2.x - 50) {
//     this.warriorPunchesAndHits();
//     soundEfxPunch.play();
//   }
//   setTimeout((function() {
//     this.warrior1.stopGoku();
//   }).bind(this), 500)
// } else if (event.keyCode === this.buttons[12]) {
//   this.warrior1.stopGoku();
// }
// }

Game.prototype.draw = function() {
  soundEfxPunch = document.getElementById("soundEfxPunch");
  soundEfxBackground = document.getElementById("soundEfxBackground");
  this.addFrame()
  this.movements();
  this.clear()
  this.background1.draw();
  this.background2.draw();
  this.miner1.draw();
  this.miner2.draw();
  var lastBird = this.myBirds.length - 1;
  if (this.myBirds[lastBird] != undefined) {
    this.myBirds[lastBird].draw();
  }
  if ((this.hasMiner1Won === false) && (
      this.hasMiner2Won === false)) {
    this.bar1.draw();
    this.bar2.draw();
    var lastBird = this.myBirds.length - 1;
    if (this.myBirds[lastBird] != undefined) {
      this.myBirds[lastBird].draw();
    }
    if (this.miner1.findings === 3) {
      this.coin = new Coin("canvas", this.ctx, 145);
      this.warrior1 = new WarriorGoku('canvas', this.ctx, -5000, 130)
      this.warrior2 = new WarriorVegeta('canvas', this.ctx, -7000, 100)
      this.warrior1.draw();
      this.coin.draw();
      this.hasMiner1Won = true;
    } else if (this.miner2.findings === 3) {
      this.coin = new Coin("canvas", this.ctx, 590);
      this.warrior1 = new WarriorGoku('canvas', this.ctx, -7000, 100)
      this.warrior2 = new WarriorVegeta('canvas', this.ctx, -5000, 130)
      this.warrior1.draw();
      this.coin.draw();
      this.hasMiner2Won = true;
    }
  } else {
    if ((this.warrior1.isDown === false) && (this.warrior2.isDown === false)) {
      soundEfxBackground.play();
      this.cloud.draw();
      this.coin.draw();
      this.warrior1.draw();
      this.warrior2.draw();
    } else {
      this.cloud.draw();
      this.warrior1.draw();
      this.warrior2.draw();
      this.checkIfWarriorsAreAlive();

    }

    if ((this.warrior1.isDown === true) && (this.warrior2.isDown === true))
      this.liveandPowerBoard1.draw();
  }
}
