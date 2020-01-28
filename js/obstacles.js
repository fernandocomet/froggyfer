class Obstacle {
    constructor(ctx, width, height, isReverse) {    
      this.ctx = ctx;
      this.posX = game.width; //setDirection
      this.obstaclesPosY = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600];

      this.posY = this.obstaclesPosY[Math.floor(Math.random()*this.obstaclesPosY.length)];
      this.width = width;
      this.height = height;
      this.isReverse = isReverse;
  
      this.velX = 5;
      
    }
  
    draw() {
      this.ctx.fillStyle = "green";
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