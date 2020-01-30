class Obstacle {
    constructor(ctx, width, height, isReverse, gameWidth) {    
      this.ctx = ctx;
      this.gameWidth = gameWidth
      //this.obstaclesPosY = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600];

      //Update ObstaclesArray only for the road
      //this.obstaclesPosY = [0, 350, 400, 450, 500, 550, 600]; borro 12
      this.obstaclesPosY = [62, 312, 362, 412, 462, 512, 562, 612, 662]


      ////////

      ////////

      this.posY = this.obstaclesPosY[Math.floor(Math.random()*this.obstaclesPosY.length)];
      this.width = width;
      this.height = height;
      this.isReverse = isReverse ? true : false;
      this.velX = 5; //easy 3
      this.posX = this.isReverse ? 0 - this.width : this.gameWidth;
    }

    draw() {
      this.ctx.fillStyle = "red";
      this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }
  
    move() {
    if(this.isReverse){
        this.posX += this.velX;
    }else{
        this.posX -= this.velX;
    }
  }
}
