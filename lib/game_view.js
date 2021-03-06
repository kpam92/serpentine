const Game = require("./game.js");
const Sound = require("./sound.js");

function GameView() {
  this.DIM_X = 1000;
  this.DIM_Y = 700;
  this.game = new Game({game_view: this, num_asteroids: 100, asteroid_color: "pink", vel: [-4,4]});
  this.canvas = document.getElementById('game-canvas');
  // this.canvas.style.cursor = "none"; //hide the original
  this.ctx = this.canvas.getContext("2d");
  this.ship = this.game.ship;
  this.dots = this.game.dots;
  this.score = this.game.score;
  this.paused = false;
  this.frameNo = 0;
  window.gamegame = this;
  // this.levels = [[100, "pink", [-4,4]],[100, "yellow", [-5,5]],[100, "red", [-6,6]]]
  this.levels =
  [[100, "pink", [-4,4]],
  [120,"yellow", [-5,5]],
  [150, "red", [-6,6]],
  [120, "orange", [-7,7]],
  [120, "purple", [-8,8]],
  [120, "steelblue", [-9,9]],
  [120, "green", [-10,10]]]
  this.pauseDisabled = false;
  this.backgroundMusic = this.game.backgroundMusic;
  this.musicDisabled = false;
}

GameView.prototype.play = function(){
  if (this.musicDisabled === false) {this.backgroundMusic.play()};

  var musicButton = document.getElementById('music-pic');

  musicButton.addEventListener("click", function(e) {


    e.preventDefault();
    g.musicDisabled = (g.musicDisabled  ?  false : true);
    g.musicDisabled ? g.backgroundMusic.stop() : g.backgroundMusic.play();
  });



  var unpause = document.getElementById('pause');
  unpause.style.display = "none";
  let currView = this;
  this.currRound = window.setInterval(function () {
    currView.game.step();
    currView.frameNo += 1;

    currView.score += 1;
    let currScore = document.getElementById('score')
    currScore.innerHTML = `SCORE : ${currView.score}`
    let currLvl = document.getElementById('level')
    currLvl.innerHTML = `LVL : ${currView.game.level + 1}`
    window.frameNo = currView.frameNo;


    document.body.onkeyup = function(e){
        if(e.keyCode == 32){
            if (g.paused === false && g.pauseDisabled === false) {
              g.paused = true;
              currView.pause();
            } else if (g.paused === true && g.pauseDisabled === false) {
              g.paused = false;
              currView.play();
            }
        }
    }

     if (everyinterval(900)) {
         currView.game.asteroids = [];
         currView.game.level += 1;
         var currLevel = currView.levels[currView.game.level]
         currView.game.addAsteroids(currLevel[0],currLevel[1],currLevel[2])
     }


    currView.game.draw(currView.ctx);
  }, 20);
};

GameView.prototype.pause = function(){
  g.backgroundMusic.stop();
  clearInterval(this.currRound);
  var pauseScreen = document.getElementById('pause');
  pauseScreen.style.display = "block";
}

GameView.prototype.stop = function(){
  clearInterval(this.currRound);
}

GameView.prototype.game_over = function() {
  g.backgroundMusic.stop();
  var quitScreen = document.getElementById('game-over');
  quitScreen.style.display = "block";



  var redoButton = document.getElementById('redo-button');

  redoButton.addEventListener("click", function() {
    quitScreen.style.display = "none";
    g.musicDisabled ? g.backgroundMusic.stop() : g.backgroundMusic.play()
    window.g.reset();

  });
}

GameView.prototype.reset = function() {

  let dotCollection = Array.from(document.getElementsByClassName("trail"));
  dotCollection.forEach(element => { element.parentNode.removeChild(element);})
  this.score = 0;
  this.ctx.clearRect(0,0,this.game.DIM_X, this.game.DIM_Y);
  this.game = new Game({game_view: this, num_asteroids: 100, asteroid_color: "pink", vel: [-4,4]});
  this.canvas = document.getElementById('game-canvas');
  this.canvas.style.cursor = "none"; //hide the original
  this.ctx = this.canvas.getContext("2d");
  this.ship = this.game.ship;
  this.frameNo = 0;
  window.gamegame = this;
  // this.levels = [[100, "pink", [-4,4]],[100, "yellow", [-5,5]],[100, "red", [-6,6]]]
    this.levels =
    [[100, "pink", [-4,4]],
    [120,"yellow", [-5,5]],
    [150, "red", [-6,6]],
    [120, "orange", [-7,7]],
    [120, "purple", [-8,8]],
    [120, "steelblue", [-9,9]],
    [120, "green", [-10,10]],
    [300, "green", [-10,10]]]


}
function everyinterval(n) {
    if ((this.frameNo / n) % 1 == 0) {return true;}
    return false;
}

// window.game_view = GameView
module.exports = GameView;
