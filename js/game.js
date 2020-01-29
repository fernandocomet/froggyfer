Math.randomFloat = (min, max) => Math.random() * (max - min) + min;
Math.randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
Math.shuffle = (array, _) => array.sort(() => Math.random() - 0.5);

const game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  FPS: 60,
  framesCounter: 0,
  score: 0,
  obstacles: [],
  briges: [],
  keys: {
    TOP: 38,
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40
  },

  setDimensions() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  },

  init() {
    this.canvas = document.getElementById("myCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.setDimensions();
    scoreboard.init(this.ctx);
    this.start();
  },

  start() {
    this.reset();
    this.interval = setInterval(() => {
      if (this.framesCounter > 5000) {
        this.framesCounter = 0;
      }
      this.framesCounter++;
      this.clear();
      this.moveAll();
      this.drawAll();
      this.generateObstacles();
      this.clearObstacles();
      if (this.isCollisionObstacles()) {
        this.gameOver();
      }
      this.generateBridges();
      this.clearBridges();
      if (this.isCollisionWater()) {
         console.log("water");
      }
      this.score += 0.01;
      this.drawScore();
    }, 1000 / this.FPS);
  },

  reset() {
    this.player = new Player(this.ctx, this.width, this.height, this.keys);
    this.background = new Background(
      this.ctx,
      1366, //this.width,
      768,  //this.height,
      "./images/bgwater.png"
    );
    this.obstaclesArr = [];
    this.bridgesArr = [];
    this.scoreboard = scoreboard;
  },

  drawAll() {
    this.background.draw();
    this.obstaclesArr.forEach(obs => obs.draw());
    this.bridgesArr.forEach(bridge => bridge.draw());
    this.player.draw(
        this.player.posX,
        this.player.posY,
        this.player.imagePosition
      );
  },

  moveAll() {
    this.player.move();
    this.background.move();
    this.obstaclesArr.forEach(obs => obs.move());
    this.bridgesArr.forEach(bridge => bridge.move());
  },

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  generateObstacles() {
    if (this.framesCounter % 25 == 0) {
      this.obstaclesArr.push(
        new Obstacle(
          this.ctx,
          Math.randomInt(50, 500),
          30,
          Math.randomInt(0, 1),
          this.canvas.width
        )
      );
    }
  },

  clearObstacles() {
    this.obstaclesArr = this.obstaclesArr.filter(
      obs => obs.posX >= -500 || obs.posX <= this.canvas.width
    );
  },

  isCollisionObstacles() {
    return this.obstaclesArr.some(obs => {
      return (
        this.player.posX < obs.posX + obs.width &&
        this.player.posX + this.player.width > obs.posX &&
        this.player.posY < obs.posY + obs.height &&
        this.player.posY + this.player.height > obs.posY
      );
    });
  },

  generateBridges() {
    if (this.framesCounter % 25 == 0) {  //Maybe change framesCounter
      this.bridgesArr.push(
        new Bridge(
          this.ctx,
          this.width,   //Math.randomInt(100, 200),
          48,
          Math.randomInt(0, 1),
          this.canvas.width
        )
      );
    }
  },

  clearBridges() {
    this.bridgesArr = this.bridgesArr.filter(
      bridge => bridge.posX >= -500 || bridge.posX <= this.canvas.width
    );
  },

  isCollisionWater(){     //  if(this.posY < 251 && this.posY > 99)
  return this.bridgesArr.some(obs => {
    return (
      this.player.posX < obs.posX + obs.width &&
      this.player.posX + this.player.width > obs.posX &&
      this.player.posY < obs.posY + obs.height &&
      this.player.posY + this.player.height > obs.posY
    );
  });
},

  gameOver() {
    clearInterval(this.interval);
    console.log("GAME OVER");
    //TODO Play Again & whatsoever
  },

  drawScore() {
    this.scoreboard.update(this.score);
  }
};
