
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
            if (this.isCollision()) {
                this.gameOver();
            }
            this.score += 0.01;
            this.drawScore();
        }, 1000 / this.FPS);
    },

    reset() {
      this.player = new Player(this.ctx, this.width, this.height, this.keys);
      this.background = new Background(this.ctx, this.width, this.height, "./images/bg5.png");
      this.obstaclesArr = [];
      this.scoreboard = scoreboard;
    },
  
    drawAll() {
      this.background.draw();
      this.player.draw(this.player.posX, this.player.posY, this.player.imagePosition);
      this.obstaclesArr.forEach(obs => obs.draw());
    },
  
    moveAll() {
      this.player.move();
      this.background.move();
      this.obstaclesArr.forEach(obs => obs.move());
    },
  
    clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    },

    generateObstacles() {
      if (this.framesCounter % 100 == 0) {
        this.obstaclesArr.push(new Obstacle(this.ctx, Math.randomInt(50, 500), 30, Math.randomInt(0, 1), this.canvas.width));
        // this.obstaclesArr.push(new Obstacle(this.ctx, Math.randomInt(50, 500), 30, false));
        //constructor(ctx, width, height, isReverse) 
        console.log(this.obstaclesArr);
      }
    },
  
    clearObstacles() {
      //TO DO quitar obstáculos cuando se salgan del canvas x
      //this.obstaclesArr = this.obstaclesArr.filter(obs => obs.posX >= this.canvas.width + 300);
      //this.obstaclesArr = this.obstaclesArr.filter(obs => obs.posX <= 0);
    //   this.obstaclesArr = this.obstaclesArr.filter((item) => {
    //     return item.posX <= 0 
    //   })
     this.obstaclesArr = this.obstaclesArr.filter(obs => obs.posX >= -500 || obs.posX <= this.canvas.width);
     //TO DO falta la otra
    },
  
    
    isCollision() {
      return this.obstaclesArr.some(obs => {
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

