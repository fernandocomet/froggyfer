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
  housesCounter: 0,
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
    this.audio = new Sound('audio/music.mp3');
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
      this.isCollisionWithHouses()
      this.score += 0.01;
      this.drawScore();
      //this.audio.play();
    }, 1000 / this.FPS);
  },

  reset() {
    this.player = new Player(this.ctx, this.width, this.height, this.keys);
    this.background = new Background(
      this.ctx,
      1366, //this.width,
      768, //this.height,
      "./images/forest.png" //trial
    );
    this.water = new Water(
      this.ctx,
      1366, //this.width,
      200, //this.height,
      "./images/water2.png"
    );
    this.houseArr= []
    this.housesArr.push(new House(this.ctx, this.width, this.height, this.width/6 * 1 + 100))
    this.housesArr.push(new House(this.ctx, this.width, this.height, this.width/6 * 2 + 100))
    this.housesArr.push(new House(this.ctx, this.width, this.height,this.width/6 * 3 + 100))
    this.housesArr.push(new House(this.ctx, this.width, this.height, this.width/6 * 4 +100))
 
    this.obstaclesArr = [];
    this.bridgesArr = [];
    this.scoreboard = scoreboard;
    this.housesCounter = 0;
    
  },

  drawAll() {
    this.background.draw();
    this.water.draw();
    this.obstaclesArr.forEach(obs => obs.draw());
    this.bridgesArr.forEach(bridge => bridge.draw());
    this.player.draw(this.player.posX, this.player.posY, this.player.imagePosition);
    this.housesArr.forEach(house => house.draw())
  },

  moveAll() {
    this.player.move();
    this.background.move();
    this.water.move();
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
    if (this.framesCounter % 25 == 0) {
      this.bridgesArr.push(
        new Bridge(
          this.ctx,
          Math.randomInt(100, 200),
          Math.randomInt(0, 1),
          this.canvas.width,
        )
      );
    }
  },

  /*
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
  */

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

  isCollisionWithHouses() {

    this.housesArr.forEach((house,idx) =>{
        if(
            this.player.posX < house.posX + house.width &&
            this.player.posX + this.player.width > house.posX &&
            this.player.posY < house.posY + house.height &&
            this.player.posY + this.player.height > house.posY
        ){
           if(this.housesArr[idx].isEmpty){
            console.log(this.housesCounter);
            // this.housesCounter === 3 ? alert("you win!") : this.housesCounter += 1;
            this.housesCounter === 3 ? this.gameWin() : this.housesCounter += 1;
            this.player.posY = 700;
            this.player.posX = 658;
            this.housesArr[idx].isEmpty = false ;
            this.housesArr[idx].imagePosition = 50;
           }
           
        }
    })
  },

  gameOver() {
    clearInterval(this.interval);
    console.log("GAME OVER");
    alert("GAME OVER");
    // this.sound.pause();
    //TODO Play Again & whatsoever
  },

  gameWin(){
    clearInterval(this.interval);
    console.log("YOU WIN");
    alert("YOU WIN!");
    // this.sound.pause();
    //TODO Play Again & whatsoever
  },

  drawScore() {
    this.scoreboard.update(this.score);
  }
};
