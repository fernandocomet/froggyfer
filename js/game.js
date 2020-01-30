Math.randomFloat = (min, max) => Math.random() * (max - min) + min;
Math.randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
Math.shuffle = (array, _) => array.sort(() => Math.random() - 0.5);

const game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  FPS: 60,
  framesCounter: 0,
  score: 0,
  lives: 0,
  obstaclesArr: [],
  bridgesArr: [],
  housesArr: [],
  keys: {
    TOP: 38,
    LEFT: 37,
    RIGHT: 39,
    DOWN: 40
  },

  setDimensions() {
    this.width = 1366; //window.innerWidth;
    this.height = 768; //window.innerHeight;
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
        this.gameOver();
      }
      if (this.isCollisionHouse1()) {
        this.house1.imagePosition = 50;
        console.log("collision House1!");
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
      768, //this.height,
      "./images/road.png" //trial
    );
    this.water = new Water(
      this.ctx,
      1366, //this.width,
      200, //this.height,
      "./images/water.png"
    );
    this.house1 = new House(this.ctx, this.width, this.height);
    this.house2 = new House(this.ctx, this.width, this.height);
    this.house3 = new House(this.ctx, this.width, this.height);
    this.house4 = new House(this.ctx, this.width, this.height);
    this.obstaclesArr = [];
    this.bridgesArr = [];
    this.scoreboard = scoreboard;
    //this.housesArr = []; //// ESTO FALLA
  },

  drawAll() {
    this.background.draw();
    this.water.draw();
    this.obstaclesArr.forEach(obs => obs.draw());
    this.bridgesArr.forEach(bridge => bridge.draw());
    this.house1.draw(
      this.house1.houseSeparation + 100,
      this.house1.posY,
      this.house1.imagePosition
    );
    this.house2.draw(
      this.house2.houseSeparation * 2 + 100,
      this.house2.posY,
      this.house2.imagePosition
    );
    this.house3.draw(
      this.house3.houseSeparation * 3 + 100,
      this.house3.posY,
      this.house3.imagePosition
    );
    this.house4.draw(
      this.house4.houseSeparation * 4 + 100,
      this.house4.posY,
      this.house4.imagePosition
    );
    this.player.draw(
      this.player.posX,
      this.player.posY,
      this.player.imagePosition
    );
  },

  moveAll() {
    this.player.move();
    this.background.move();
    this.water.move();
    this.obstaclesArr.forEach(obs => obs.move());
    this.bridgesArr.forEach(bridge => bridge.move());
    this.house1.move();
    this.house2.move();
    this.house3.move();
    this.house4.move();
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
    if (this.framesCounter % 25 == 0) {
      this.bridgesArr.push(
        new Bridge(
          this.ctx,
          this.width, //Math.randomInt(100, 200),
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

  isCollisionWater() {
    let waterCollision = false;
    let bridgeCollision = false;

    if (
      this.player.posX < this.water.posX + this.water.width &&
      this.player.posX + this.player.width > this.water.posX &&
      this.player.posY < this.water.posY + this.water.height &&
      this.player.posY + this.player.height > this.water.posY
    ) {
      waterCollision = true;
    } else {
      waterCollision = false;
    }

    if (
      this.bridgesArr.some(bridge => {
        return (
          this.player.posX < bridge.posX + bridge.width &&
          this.player.posX + this.player.width > bridge.posX &&
          this.player.posY < bridge.posY + bridge.height &&
          this.player.posY + this.player.height > bridge.posY
        );
      })
    ) {
      bridgeCollision = true;
    } else {
      bridgeCollision = false;
    }
    if (waterCollision === true && bridgeCollision === true) {
      //console.log("over trunk!");
      //this.player.posX = this.bridge.posX; TODO Que se monte la rana en el tronco y herede su velocidad
    }

    if (waterCollision === true && bridgeCollision === false) {
      return true;
    }
  },

  isCollisionHouse1() {
    let collisionHouse1 = false;
    if (   //Does not work!!!
      this.player.posX < this.house1.posX + this.house1.width &&
      this.player.posX + this.player.width > this.house1.posX &&
      this.player.posY < this.house1.posY + this.house1.height &&
      this.player.posY + this.player.height > this.house1.posY
    ) {
        collisionHouse1 = true;
        console.log("collision house 1");
      //return true;
    }
    if(collisionHouse1 === true){return true;}
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
