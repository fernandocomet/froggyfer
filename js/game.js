const game = {
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    FPS: 60,
    framesCounter: 0,
    score: 0,
    // obstacles: [],
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
    //   scoreboard.init(this.ctx);
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
            /*
            this.generateObstacles();
            this.clearObstacles();
            if (this.isCollision()) {
                this.gameOver();
            }
            this.score += 0.01;
            this.drawScore();
            */
        }, 1000 / this.FPS);
    },

    reset() {
      this.player = new Player(this.ctx, this.width, this.height, this.keys);
      this.background = new Background(this.ctx, this.width, this.height, "./images/bg3.png");
    //   this.obstacles = [];
    //   this.scoreboard = scoreboard;
    },
    
  
    drawAll() {
      this.background.draw();
      this.player.draw(this.player.posX, this.player.posY, this.player.imagePosition);
    //   this.obstacles.forEach(obs => obs.draw());
    },
  
    moveAll() {
      this.player.move();
      this.background.move();
    //   this.obstacles.forEach(obs => obs.move());
    },
  
    clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    },
    /*
    generateObstacles() {
      if (this.framesCounter % 90 == 0) {
        this.obstacles.push(new Obstacle(this.ctx, this.width, this.height, this.player.posY0, this.player.height));
        console.log(this.obstacles);
      }
    },
  
    clearObstacles() {
      this.obstacles = this.obstacles.filter(obs => obs.posX >= 0);
    },
  
    isCollision() {
      return this.obstacles.some(obs => {
        return (
          this.player.posX + this.player.width >= obs.posX &&
          this.player.posY + this.player.height >= obs.posY &&
          this.player.posX <= obs.posX + obs.width
        );
      });
    },
    
    gameOver() {
      clearInterval(this.interval);
      TODO Play Again & whatsoever
    },
  
    drawScore() {
      this.scoreboard.update(this.score);
    }*/
  };
  