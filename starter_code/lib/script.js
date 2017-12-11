window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    var myGame = new Game("canvas");

    setInterval(function() {
      myGame.draw();
    }, 1);
  }

};
